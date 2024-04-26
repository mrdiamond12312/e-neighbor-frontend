import { useIntl, useModel, useSearchParams } from '@umijs/max';
import { notification } from 'antd/lib';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { EDIT_PROFILE_KEYS } from '@/pages/user/edit-profile/helpers/edit-form-keys';
import { MODE } from '@/pages/user/edit-profile/helpers/editor-mode';
import {
  TEditProfileFields,
  useEditFormResolver,
} from '@/pages/user/edit-profile/hooks/useEditFormResolver';
import { useUserUpdate } from '@/services/user/services';

export const useEditProfileForm = () => {
  const [searchParams, setEditMode] = useSearchParams();
  const editMode = searchParams.get('mode') === MODE.editMode ? true : false;
  const flipEditMode = () => {
    setEditMode(new URLSearchParams({ mode: editMode ? MODE.readOnly : MODE.editMode }));
  };
  const { formatMessage } = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const { FormSchema } = useEditFormResolver();
  const { control, getValues, trigger } = useForm<TEditProfileFields>({
    defaultValues: {
      [EDIT_PROFILE_KEYS.id]: currentUser?.id,
      [EDIT_PROFILE_KEYS.email]: currentUser?.email,
      [EDIT_PROFILE_KEYS.avatar]: [
        { uid: currentUser?.avatar, name: currentUser?.avatar, url: currentUser?.avatar },
      ],
      [EDIT_PROFILE_KEYS.address]: currentUser?.address,
      [EDIT_PROFILE_KEYS.dob]: currentUser?.dob,
      [EDIT_PROFILE_KEYS.phone]: currentUser?.phoneNumber,
      [EDIT_PROFILE_KEYS.fullName]: currentUser?.fullName,
      [EDIT_PROFILE_KEYS.citizenId]: currentUser?.citizenId,
      [EDIT_PROFILE_KEYS.citizenCardBack]: [
        {
          uid: currentUser?.citizenCardBack,
          name: currentUser?.citizenCardBack,
          url: currentUser?.citizenCardBack,
        },
      ],
      [EDIT_PROFILE_KEYS.citizenCardFront]: [
        {
          uid: currentUser?.citizenCardFront,
          name: currentUser?.citizenCardFront,
          url: currentUser?.citizenCardFront,
        },
      ],
    },
    mode: 'onTouched',
    resolver: FormSchema,
  });
  const checkInfoField = async () =>
    await trigger(
      Object.values(EDIT_PROFILE_KEYS).filter((value) => value !== EDIT_PROFILE_KEYS.password),
    );

  const { mutate, isLoading } = useUserUpdate();
  const handleSubmit = async (formFields: TEditProfileFields) => {
    const isGoodToForward = await trigger();
    if (isGoodToForward) {
      mutate(formFields, {
        onSuccess: () => {
          notification.success({
            message: formatMessage({
              id: 'user.profile.form.submit.success',
              defaultMessage: 'Update Successfully!',
            }),
            description: formatMessage({
              id: 'user.profile.form.submit.success.description',
              defaultMessage: 'The window will now reload to apply the update',
            }),
            duration: 0.5,
            onClose: () => {
              window.location.reload();
            },
          });
        },
        onError: (error) => {
          notification.error({
            message: [error.statusCode, error.error].join(' - '),
            description: error.message,
          });
        },
      });
    }
  };

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  return {
    flipEditMode,
    editMode,
    control,
    getValues,
    trigger,
    handleSubmit,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    checkInfoField,
    isSubmitting: isLoading,
  } as const;
};

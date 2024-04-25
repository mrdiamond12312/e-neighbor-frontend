import { useModel } from '@umijs/max';
import { useForm } from 'react-hook-form';

import { EDIT_PROFILE_KEYS } from '@/pages/user/edit-profile/helpers/edit-form-keys';
import { TEditProfileFields } from '@/pages/user/edit-profile/hooks/useEditFormResolver';

export const useEditProfileForm = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { control, getValues, trigger } = useForm<TEditProfileFields>({
    defaultValues: {
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
  });

  const handleSubmit = async (formFields: TEditProfileFields) => {
    const isGoodToForward = await trigger();
    if (isGoodToForward) {
      console.log(getValues(), formFields);
    }
  };

  return { control, getValues, trigger, handleSubmit } as const;
};

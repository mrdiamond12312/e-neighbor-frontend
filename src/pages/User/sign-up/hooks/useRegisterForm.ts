import { useIntl } from '@umijs/max';
import { notification } from 'antd';
import { useForm } from 'react-hook-form';

import { PATH_ROOT } from '@/const/path';
import { REGISTER_FORM_KEY } from '@/const/register-form';
import useRegisterResolver from '@/pages/user/sign-up/hooks/useRegisterResolver';
import { useServiceRegister } from '@/services/auth/services';

export type TRegisterFormFields = {
  [REGISTER_FORM_KEY.userName]: string;
  [REGISTER_FORM_KEY.password]: string;
  [REGISTER_FORM_KEY.passwordConfirm]: string;
  [REGISTER_FORM_KEY.fullName]: string;
  [REGISTER_FORM_KEY.email]: string;
};

export const useRegisterForm = () => {
  const { formatMessage } = useIntl();
  const { FormSchema } = useRegisterResolver();
  const {
    control,
    formState: { errors, dirtyFields, isValid, isDirty },
    getValues,
    trigger,
    handleSubmit,
  } = useForm<TRegisterFormFields>({
    defaultValues: {},
    resolver: FormSchema ?? null,
    mode: 'onTouched',
  });

  const { mutate, isLoading } = useServiceRegister();

  const onSubmit = (body: TRegisterFormFields) => {
    mutate(body, {
      onSuccess: async (data) => {
        if (data?.meta?.statusCode === 201) {
          const defaultRegisterSuccessMessage = formatMessage({
            id: 'register.submit.success',
            defaultMessage: 'Register Successfully!',
          });

          notification.success({
            message: defaultRegisterSuccessMessage,
            duration: 0.5,
            onClose: () => {
              const urlParams = new URL(window.location.href).searchParams;
              window.location.href = urlParams.get('redirect') || PATH_ROOT;
            },
          });
        }
      },

      onError: (error) => {
        if (error.statusCode === 503) {
          notification.error({
            message: formatMessage({
              id: 'server.crashed',
              defaultMessage: 'Server down!',
            }),
          });
        } else if (error.statusCode === 400)
          notification.error({
            message: formatMessage({
              id: 'register.submit.failed',
              defaultMessage: "Credentials've Already Been Taken!",
            }),
          });
      },
    });
  };

  return {
    control,
    errors,
    dirtyFields,
    isValid,
    isDirty,
    getValues,
    trigger,
    handleSubmit,
    onSubmit,
    isLoading,
  };
};

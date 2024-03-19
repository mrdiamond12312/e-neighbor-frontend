import { useIntl } from '@umijs/max';
import { notification } from 'antd';
import { useForm } from 'react-hook-form';

import { LOGIN_FORM_KEY } from '@/const/login-form';
import { PATH_ROOT } from '@/const/path';
import useLoginResolver from '@/pages/user/login/hooks/useLoginResolver';
import { useServiceLogin } from '@/services/auth/services';

export type TLoginFormFields = {
  [LOGIN_FORM_KEY.userName]: string;
  [LOGIN_FORM_KEY.password]: string;
};

export const useLoginForm = () => {
  const { formatMessage } = useIntl();
  const { FormSchema } = useLoginResolver();
  const {
    control,
    formState: { errors, dirtyFields, isValid, isDirty },
    getValues,
    trigger,
    handleSubmit,
  } = useForm<TLoginFormFields>({
    defaultValues: {},
    resolver: FormSchema ?? null,
    mode: 'onTouched',
  });

  const { mutate, isLoading } = useServiceLogin();

  const onSubmit = (body: TLoginFormFields) => {
    mutate(body, {
      onSuccess: async (data) => {
        if (data) {
          const defaultLoginSuccessMessage = formatMessage({
            id: 'login.submit.success',
            defaultMessage: 'Đăng nhập thành công!',
          });

          notification.success({
            message: defaultLoginSuccessMessage,
            duration: 0.5,
            onClose: () => {
              const urlParams = new URL(window.location.href).searchParams;
              window.location.href = urlParams.get('redirect') ?? PATH_ROOT;
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
        } else if (error.statusCode === 404 || error.statusCode === 403 || error.statusCode === 401)
          notification.error({
            message: formatMessage({
              id: 'login.submit.failed',
              defaultMessage: 'Wrong Credential!',
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

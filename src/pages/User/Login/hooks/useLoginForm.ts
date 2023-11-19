import { LOGIN_FORM_KEY } from '@/const/login-form';
import { PATH_ROOT } from '@/const/path';
import useLoginResolver from '@/pages/User/Login/hooks/useLoginResolver';
import { useSeviceLogin } from '@/services/auth/services';
import { useIntl, useModel } from '@umijs/max';
import { notification } from 'antd';
import { useForm } from 'react-hook-form';

import { flushSync } from 'react-dom';

export type TLoginFormFields = {
  [LOGIN_FORM_KEY.userName]: string;
  [LOGIN_FORM_KEY.password]: string;
};

export const useLoginForm = () => {
  const { formatMessage } = useIntl();
  const { FormSchema } = useLoginResolver();
  const { initialState, setInitialState } = useModel('@@initialState');
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

  const { mutate, isLoading } = useSeviceLogin();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchAuthInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((intState) => ({
          ...intState,
          currentUser: userInfo,
        }));
      });
    }
  };

  const onSubmit = (body: TLoginFormFields) => {
    mutate(body, {
      onSuccess: async (data) => {
        if (data?.meta?.statusCode === 200) {
          const defaultLoginSuccessMessage = formatMessage({
            id: 'login.submit.success',
            defaultMessage: 'Đăng nhập thành công!',
          });

          notification.success({
            message: defaultLoginSuccessMessage,
          });

          await fetchUserInfo();
          const urlParams = new URL(window.location.href).searchParams;
          window.location.href = urlParams.get('redirect') || PATH_ROOT;
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
        } else if (error.statusCode === 404 || error.statusCode === 403)
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

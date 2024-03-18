'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@umijs/max';
import * as yup from 'yup';

import { REGISTER_FORM_KEY } from '@/const/register-form';

const useRegisterResolver = () => {
  const { formatMessage } = useIntl();
  const LoginValidationSchema = yup.object().shape({
    [REGISTER_FORM_KEY.userName]: yup.string().required(
      formatMessage({
        id: 'register.form.userName.null',
        defaultMessage: 'Please input your username!',
      }),
    ),
    [REGISTER_FORM_KEY.fullName]: yup.string().required(
      formatMessage({
        id: 'register.form.fullName.null',
        defaultMessage: 'Please input your fullname!',
      }),
    ),
    [REGISTER_FORM_KEY.password]: yup.string().required(
      formatMessage({
        id: 'register.form.password.null',
        defaultMessage: 'Please input your password',
      }),
    ),
    [REGISTER_FORM_KEY.passwordConfirm]: yup
      .string()
      .oneOf(
        [yup.ref(REGISTER_FORM_KEY.password), undefined],
        formatMessage({
          id: 'register.form.passwordConfirm.notMatch',
          defaultMessage: 'Password not matched!',
        }),
      )
      .required(
        formatMessage({
          id: 'register.form.passwordConfirm.null',
          defaultMessage: 'Please confirm your password',
        }),
      ),
    [REGISTER_FORM_KEY.email]: yup
      .string()
      .email(
        formatMessage({
          id: 'register.form.email.invalid',
          defaultMessage: 'Not a valid email!',
        }),
      )
      .required(
        formatMessage({
          id: 'register.form.email.null',
          defaultMessage: 'Please input your email',
        }),
      ),
  });

  return {
    FormSchema: yupResolver(LoginValidationSchema),
  };
};

export default useRegisterResolver;

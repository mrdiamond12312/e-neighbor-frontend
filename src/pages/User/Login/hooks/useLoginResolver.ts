'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@umijs/max';
import * as yup from 'yup';

import { LOGIN_FORM_KEY } from '@/const/login-form';

const useLoginResolver = () => {
  const { formatMessage } = useIntl();
  const LoginValidationSchema = yup.object().shape({
    [LOGIN_FORM_KEY.userName]: yup.string().required(
      formatMessage({
        id: 'login.form.userName.null',
        defaultMessage: 'Please input your username',
      }),
    ),
    [LOGIN_FORM_KEY.password]: yup.string().required(
      formatMessage({
        id: 'login.form.password.null',
        defaultMessage: 'Please input your password',
      }),
    ),
  });

  return {
    FormSchema: yupResolver(LoginValidationSchema),
  };
};

export default useLoginResolver;

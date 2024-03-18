import { stringify } from 'querystring';

import { history, useMutation } from '@umijs/max';

import * as Path from '@/const/path';
import { TLoginFormFields } from '@/pages/User/Login/hooks/useLoginForm';
import { TRegisterFormFields } from '@/pages/User/SignUp/hooks/useRegisterForm';
import API_ENDPOINTS from '@/services/auth/api-path';
import { getCurrentAuthInfo, login, register } from '@/services/auth/api-services';
import { removeStorageItem, setStorageItem } from '@/utils/local-storage';

export const useServiceLogin = () => {
  return useMutation<TMetaWrapper<API.TAuthResponse>, TMeta, TLoginFormFields>(
    [API_ENDPOINTS.LOGIN],
    (body) => login(body),
    {
      onSuccess: (loginResult: TMetaWrapper<API.TAuthResponse>) => {
        const { meta, result } = loginResult;
        if (meta?.statusCode === 200) {
          setStorageItem('accessToken', result.data?.accessToken);
        }
      },
    },
  );
};

export const useServiceRegister = () => {
  return useMutation<TMetaWrapper<API.TAuthResponse>, TMeta, TRegisterFormFields>(
    [API_ENDPOINTS.REGISTER],
    (body) => register(body),
    {
      onSuccess: (authResult: TMetaWrapper<API.TAuthResponse>) => {
        const { meta, result } = authResult;
        if (meta?.statusCode === 201) {
          setStorageItem('accessToken', result.data?.accessToken);
        }
      },
    },
  );
};

export const handleLogout = () => {
  removeStorageItem('accessToken');

  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  const redirect = urlParams.get('redirect');

  if (window.location.pathname !== Path.PATH_LOGIN && !redirect) {
    history.replace({
      pathname: Path.PATH_LOGIN,
      search: stringify({
        redirect: pathname + search,
      }),
    });
  } else history.push(Path.PATH_LOGIN);
};

export const fetchAuthInfo = async (): Promise<API.TAuthProfile | undefined> => {
  try {
    const response = await getCurrentAuthInfo();

    if (response?.meta?.statusCode === 200) {
      return response.result.data;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

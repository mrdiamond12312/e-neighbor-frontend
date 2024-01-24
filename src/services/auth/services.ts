import { TLoginFormFields } from '@/pages/User/Login/hooks/useLoginForm';
import { getCurrentAuthInfo, login, register } from '@/services/auth/api-services';
import { setStorageItem } from '@/utils/local-storage';
import { history, useMutation } from '@umijs/max';
import * as Path from '@/const/path';
import { stringify } from 'querystring';
import API_ENDPOINTS from '@/services/auth/api-path';
import { TRegisterFormFields } from '@/pages/User/SignUp/hooks/useRegisterForm';

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

export const fetchAuthInfo = async (): Promise<API.TAuthProfile | undefined> => {
  try {
    const response = await getCurrentAuthInfo();

    if (response?.meta?.statusCode === 200) {
      return response.result.data;
    }
  } catch (error) {
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
  }
  return undefined;
};

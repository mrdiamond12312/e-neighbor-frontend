import { history, useMutation } from '@umijs/max';

import * as Path from '@/const/path';
import { TLoginFormFields } from '@/pages/user/login/hooks/useLoginForm';
import { TRegisterFormFields } from '@/pages/user/sign-up/hooks/useRegisterForm';
import API_ENDPOINTS from '@/services/auth/api-path';
import { getCurrentAuthInfo, login, register } from '@/services/auth/api-services';
import { removeStorageItem, setStorageItem } from '@/utils/local-storage';

export const useServiceLogin = () => {
  return useMutation<API.TAuthResponse, TMeta, TLoginFormFields>(
    [API_ENDPOINTS.LOGIN],
    (body) => login(body),
    {
      onSuccess: (loginResult: API.TAuthResponse) => {
        const { accessToken } = loginResult;
        setStorageItem('accessToken', accessToken);
      },
    },
  );
};

export const useServiceRegister = () => {
  return useMutation<API.TAuthResponse, TMeta, TRegisterFormFields>(
    [API_ENDPOINTS.REGISTER],
    (body) => register(body),
    {
      onSuccess: (authResult: API.TAuthResponse) => {
        const { accessToken } = authResult;
        setStorageItem('accessToken', accessToken);
      },
    },
  );
};

export const handleLogout = () => {
  removeStorageItem('accessToken');

  if (window.location.pathname !== Path.PATH_LOGIN) {
    history.replace(
      {
        pathname: Path.PATH_LOGIN,
      },
      { from: history.location.pathname },
    );
  } else history.push(Path.PATH_LOGIN);
};

export const fetchAuthInfo = async (): Promise<API.TAuthProfile | undefined> => {
  try {
    const userData = await getCurrentAuthInfo();
    return userData;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

import { TLoginFormFields } from '@/pages/user/login/hooks/useLoginForm';
import { TRegisterFormFields } from '@/pages/user/sign-up/hooks/useRegisterForm';
import API_ENDPOINTS from '@/services/auth/api-path';
import request from '@/services/interceptor';

export const login = async (body: TLoginFormFields) => {
  return request<API.TAuthResponse>(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    data: body,
  });
};

export const register = async (body: TRegisterFormFields) => {
  return request<API.TAuthResponse>(API_ENDPOINTS.REGISTER, {
    method: 'POST',
    data: body,
  });
};

export const getCurrentAuthInfo = async () => {
  return request<API.TAuthProfile>(API_ENDPOINTS.PROFILE, {
    method: 'GET',
    timeout: 15000,
    timeoutMessage: 'Connection Timeout!',
  });
};

import API_ENDPOINTS from '@/services/auth/api-path';
import { TLoginFormFields } from '@/pages/User/Login/hooks/useLoginForm';
import request from '@/services/interceptor';

export const login = async (body: TLoginFormFields) => {
  return request<TMetaWrapper<API.TLoginResponse>>(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    data: body,
  });
};

export const getCurrentAuthInfo = async () => {
  return request<TMetaWrapper<API.TAuthProfile>>(API_ENDPOINTS.PROFILE, {
    method: 'GET',
    timeout: 15000,
    timeoutMessage: 'Connection Timeout!',
  });
};

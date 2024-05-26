import { EDIT_PROFILE_KEYS } from '@/pages/user/edit-profile/helpers/edit-form-keys';
import { TEditProfileFields } from '@/pages/user/edit-profile/hooks/useEditFormResolver';
import request from '@/services/interceptor';
import API_ENDPOINTS from '@/services/user/api-path';

export const patchUser = async (body: TEditProfileFields) => {
  return request<API.TAuthResponse>(API_ENDPOINTS.USER_UPDATE, {
    method: 'PATCH',
    data: {
      ...body,
      [EDIT_PROFILE_KEYS.avatar]:
        body[EDIT_PROFILE_KEYS.avatar]?.[0]?.response?.url ??
        body[EDIT_PROFILE_KEYS.avatar]?.[0]?.url ??
        undefined,
      [EDIT_PROFILE_KEYS.citizenCardBack]:
        body[EDIT_PROFILE_KEYS.citizenCardBack]?.[0]?.response?.url ??
        body[EDIT_PROFILE_KEYS.citizenCardBack]?.[0]?.url ??
        undefined,
      [EDIT_PROFILE_KEYS.citizenCardFront]:
        body[EDIT_PROFILE_KEYS.citizenCardFront]?.[0]?.response?.url ??
        body[EDIT_PROFILE_KEYS.citizenCardFront]?.[0]?.url ??
        undefined,
      [EDIT_PROFILE_KEYS.dob]: body[EDIT_PROFILE_KEYS.dob],
    },
  });
};

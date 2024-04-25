import { EDIT_PROFILE_KEYS } from '@/pages/user/edit-profile/helpers/edit-form-keys';

export type TEditProfileFields = {
  [EDIT_PROFILE_KEYS.email]: string;
  [EDIT_PROFILE_KEYS.avatar]?: any[];
  [EDIT_PROFILE_KEYS.address]?: string;
  [EDIT_PROFILE_KEYS.dob]?: string;
  [EDIT_PROFILE_KEYS.phone]?: string;
  [EDIT_PROFILE_KEYS.fullName]: string;
  [EDIT_PROFILE_KEYS.citizenId]?: string;
  [EDIT_PROFILE_KEYS.citizenCardBack]?: any[];
  [EDIT_PROFILE_KEYS.citizenCardFront]?: any[];
};

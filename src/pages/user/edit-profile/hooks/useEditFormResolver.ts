import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@umijs/max';
import * as yup from 'yup';

import { EDIT_PROFILE_KEYS } from '@/pages/user/edit-profile/helpers/edit-form-keys';
export type TEditProfileFields = {
  [EDIT_PROFILE_KEYS.password]: string;
  [EDIT_PROFILE_KEYS.email]: string;
  [EDIT_PROFILE_KEYS.avatar]?: any[];
  [EDIT_PROFILE_KEYS.address]?: string;
  [EDIT_PROFILE_KEYS.dob]?: string;
  [EDIT_PROFILE_KEYS.phone]?: string;
  [EDIT_PROFILE_KEYS.fullName]: string;
  [EDIT_PROFILE_KEYS.citizenId]?: string;
  [EDIT_PROFILE_KEYS.citizenCardBack]?: any[];
  [EDIT_PROFILE_KEYS.citizenCardFront]?: any[];
  [EDIT_PROFILE_KEYS.id]?: number;
};

export const useEditFormResolver = () => {
  const { formatMessage } = useIntl();
  const EditProfileValidationSchema = yup.object().shape({
    [EDIT_PROFILE_KEYS.id]: yup.number().required(),
    [EDIT_PROFILE_KEYS.password]: yup.string().required(
      formatMessage({
        id: 'user.profile.form.password.null',
        defaultMessage: 'Your password is needed to doublecheck!',
      }),
    ),
    [EDIT_PROFILE_KEYS.email]: yup
      .string()
      .email(
        formatMessage({
          id: 'user.profile.form.email.not.correct',
          defaultMessage: 'Not an email!',
        }),
      )
      .required(
        formatMessage({
          id: 'user.profile.form.email.null',
          defaultMessage: 'An email is needed!',
        }),
      ),

    [EDIT_PROFILE_KEYS.avatar]: yup.array().of(yup.object().shape({})),
    [EDIT_PROFILE_KEYS.address]: yup.string().required(
      formatMessage({
        id: 'user.profile.form.address.null',
        defaultMessage: 'Please provide us your Address!',
      }),
    ),
    [EDIT_PROFILE_KEYS.dob]: yup.string().required(
      formatMessage({
        id: 'user.profile.form.dob.null',
        defaultMessage: 'Please provide us your Date of birth!',
      }),
    ),
    [EDIT_PROFILE_KEYS.phone]: yup
      .string()
      .required(
        formatMessage({
          id: 'user.profile.form.phone.null',
          defaultMessage: 'Please provide us your Phone number!',
        }),
      )
      .matches(
        /^[0-9]+$/,
        formatMessage({
          id: 'user.profile.form.phone.digits',
          defaultMessage: 'Please input only digits!',
        }),
      ),
    [EDIT_PROFILE_KEYS.fullName]: yup.string().required(
      formatMessage({
        id: 'user.profile.form.fullName.null',
        defaultMessage: 'Please provide us your name!',
      }),
    ),

    [EDIT_PROFILE_KEYS.citizenId]: yup
      .string()
      .required(
        formatMessage({
          id: 'user.profile.form.citizenId.null',
          defaultMessage: 'Please provide us your Citizen ID!',
        }),
      )
      .matches(
        /^[0-9]+$/,
        formatMessage({
          id: 'user.profile.form.citizenId.digits',
          defaultMessage: 'Please input only digits!',
        }),
      )
      .min(
        12,
        formatMessage({
          id: 'user.profile.form.citizenId.exact',
          defaultMessage: '12 digits is required!',
        }),
      )
      .max(
        12,
        formatMessage({
          id: 'user.profile.form.citizenId.exact',
          defaultMessage: '12 digits is required!',
        }),
      ),

    [EDIT_PROFILE_KEYS.citizenCardBack]: yup.array().of(yup.object().shape({})),
    [EDIT_PROFILE_KEYS.citizenCardFront]: yup.array().of(yup.object().shape({})),
  });
  return { FormSchema: yupResolver<TEditProfileFields>(EditProfileValidationSchema) } as const;
};

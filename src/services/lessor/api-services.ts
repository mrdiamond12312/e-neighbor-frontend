import { ONBOARDING_FORM_KEY } from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';
import { TOnboardingFormFields } from '@/pages/lessor/on-boarding/hooks/useOnboardingForm';
import request from '@/services/interceptor';
import { LESSOR_ONBOARD } from '@/services/lessor/api-path';
import { parseTimestampToISOString } from '@/utils/time-format';

export const lessorOnboard = (body: TOnboardingFormFields) => {
  return request<API.TAuthResponse>(LESSOR_ONBOARD, {
    method: 'POST',
    data: {
      ...body,
      [ONBOARDING_FORM_KEY['citizenCardFront']]:
        body[ONBOARDING_FORM_KEY['citizenCardFront']][0].response.url,
      [ONBOARDING_FORM_KEY['citizenCardBack']]:
        body[ONBOARDING_FORM_KEY['citizenCardBack']][0].response.url,
      [ONBOARDING_FORM_KEY['avatar']]: body[ONBOARDING_FORM_KEY['avatar']][0].response.url,
      [ONBOARDING_FORM_KEY['paymentInfo']]: body[ONBOARDING_FORM_KEY['paymentInfo']]
        ? body[ONBOARDING_FORM_KEY['paymentInfo']]
        : [],
      dob: body[ONBOARDING_FORM_KEY['dob']]
        ? parseTimestampToISOString(body[ONBOARDING_FORM_KEY['dob']])
        : null,
    },
  });
};

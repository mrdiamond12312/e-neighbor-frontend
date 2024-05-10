import urlcat from 'urlcat';

import { ONBOARDING_FORM_KEY } from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';
import { TOnboardingFormFields } from '@/pages/lessor/on-boarding/hooks/useOnboardingForm';
import request from '@/services/interceptor';
import {
  LESSOR_ONBOARD,
  LESSOR_OVERALL_STATISTIC,
  LESSOR_STATISTIC_FEEDBACK,
  LESSOR_STATISTIC_REVENUE,
} from '@/services/lessor/api-path';
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

export const getFeedbackStatistic = ({ lessorId, dayRange, productId }: API.TStatisticParams) => {
  return request<API.TFeedbackStatistic>(urlcat(LESSOR_STATISTIC_FEEDBACK, { lessorId }), {
    timeout: 15000,
    method: 'GET',
    params: { dayRange, productId },
  });
};

export const getRevenueStatistic = ({ lessorId, dayRange, productId }: API.TStatisticParams) => {
  return request<API.TRevenueStatistic>(urlcat(LESSOR_STATISTIC_REVENUE, { lessorId }), {
    timeout: 15000,
    method: 'GET',
    params: { dayRange, productId },
  });
};

export const getOverallStatistic = () => {
  return request<API.TOverallStatistic>(LESSOR_OVERALL_STATISTIC, {
    timeout: 15000,
    method: 'GET',
  });
};

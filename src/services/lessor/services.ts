import { useMutation, useQuery } from '@umijs/max';

import { TOnboardingFormFields } from '@/pages/lessor/on-boarding/hooks/useOnboardingForm';
import {
  LESSOR_ONBOARD,
  LESSOR_OVERALL_STATISTIC,
  LESSOR_STATISTIC_FEEDBACK,
  LESSOR_STATISTIC_REVENUE,
} from '@/services/lessor/api-path';
import {
  getFeedbackStatistic,
  getOverallStatistic,
  getRevenueStatistic,
  lessorOnboard,
} from '@/services/lessor/api-services';

export const useLessorOnboardMutate = () => {
  return useMutation({
    mutationKey: [LESSOR_ONBOARD],
    mutationFn: (body: TOnboardingFormFields) => lessorOnboard(body),
  });
};

export const useFeedbackStatistic = (params: API.TStatisticParams) => {
  return useQuery([LESSOR_STATISTIC_FEEDBACK, params], () => getFeedbackStatistic(params), {
    enabled: !!params.lessorId,
  });
};

export const useRevenueStatistic = (params: API.TStatisticParams) => {
  return useQuery([LESSOR_STATISTIC_REVENUE, params], () => getRevenueStatistic(params), {
    enabled: !!params.lessorId,
  });
};

export const useOverallStatistic = () => {
  return useQuery([LESSOR_OVERALL_STATISTIC], () => getOverallStatistic());
};

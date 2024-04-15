import { useMutation } from '@umijs/max';

import { TOnboardingFormFields } from '@/pages/lessor/on-boarding/hooks/useOnboardingForm';
import { LESSOR_ONBOARD } from '@/services/lessor/api-path';
import { lessorOnboard } from '@/services/lessor/api-services';

export const useLessorOnboardMutate = () => {
  return useMutation({
    mutationKey: [LESSOR_ONBOARD],
    mutationFn: (body: TOnboardingFormFields) => lessorOnboard(body),
  });
};

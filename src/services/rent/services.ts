import { useMutation } from '@umijs/max';

import { TRentingFormFields } from '@/pages/product/renting/hooks/useRentFormResolver';
import API_ENDPOINTS from '@/services/rent/api-path';
import { postCreatePaymentTransaction } from '@/services/rent/api-services';

export const useCreateTransaction = () =>
  useMutation<any, TMeta, TRentingFormFields>(
    [API_ENDPOINTS.THIRDPARTY_RENT],
    (formFields: TRentingFormFields) => postCreatePaymentTransaction(formFields),
    {},
  );

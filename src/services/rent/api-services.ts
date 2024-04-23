import dayjs from 'dayjs';

import { RENTAL_INFO_KEYS } from '@/pages/product/renting/helpers/rentFormKeys';
import { TRentingFormFields } from '@/pages/product/renting/hooks/useRentFormResolver';
import request from '@/services/interceptor';
import API_ENDPOINTS from '@/services/rent/api-path';

export const postCreatePaymentTransaction = (rentalFormFields: TRentingFormFields) => {
  const copyRentalFormFields: Partial<TRentingFormFields> = { ...rentalFormFields };
  copyRentalFormFields[RENTAL_INFO_KEYS.rentTime] = dayjs(rentalFormFields.dateRange[0])
    .add(6, 'hours')
    .format();
  copyRentalFormFields[RENTAL_INFO_KEYS.returnTime] = dayjs(rentalFormFields.dateRange[1])
    .add(6, 'hours')
    .format();
  delete copyRentalFormFields.dateRange;
  return request(API_ENDPOINTS.THIRDPARTY_RENT, {
    timeout: 15000,
    method: 'POST',
    data: { ...copyRentalFormFields },
  });
};

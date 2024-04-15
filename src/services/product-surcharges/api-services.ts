import urlcat from 'urlcat';

import request from '@/services/interceptor';
import {
  PRODUCT_SURCHARGES,
  PRODUCT_SURCHARGES_DETAILS,
} from '@/services/product-surcharges/api-path';

export const getSurcharges = async () => {
  return request<API.ISurcharge[]>(PRODUCT_SURCHARGES, {
    method: 'GET',
    timeout: 15000,
    timeoutMessage: 'Connection Timeout!',
  });
};

export const getSurchargeDetail = async (surchargeId: string) => {
  return request<API.ISurcharge>(urlcat(PRODUCT_SURCHARGES_DETAILS, { surchargeId }), {
    method: 'GET',
    timeout: 15000,
    timeoutMessage: 'Connection Timeout!',
  });
};

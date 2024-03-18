import urlcat from 'urlcat';

import request from '@/services/interceptor';
import API_ENDPOINTS from '@/services/products/api-path';

export const getProductDetails = async (productId?: number | string) => {
  return request<TMetaWrapper<API.IProductDetails>>(
    urlcat(API_ENDPOINTS.PRODUCT_DETAILS, { productId }),
    {
      method: 'GET',
      timeout: 15000,
      timeoutMessage: 'Connection Timeout!',
    },
  );
};

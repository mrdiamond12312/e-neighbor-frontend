import urlcat from 'urlcat';

import request from '@/services/interceptor';
import API_ENDPOINTS from '@/services/products/api-path';

export const getProductDetails = async (productId?: number | string) => {
  return request<API.IProductDetails>(urlcat(API_ENDPOINTS.PRODUCT_DETAILS, { productId }), {
    method: 'GET',
    timeout: 15000,
    timeoutMessage: 'Connection Timeout!',
  });
};

export const getMostViewedProducts = async (pagination: IProductsPagination) => {
  return request<IPaginationResponse<API.IProductCard>>(API_ENDPOINTS.PRODUCT_TREND_MOST_VIEWED, {
    timeout: 15000,
    params: {
      ...pagination,
    },
  });
};

export const getMostRatedProducts = async (pagination: IProductsPagination) => {
  return request<IPaginationResponse<API.IProductCard>>(API_ENDPOINTS.PRODUCT_TREND_MOST_RATED, {
    timeout: 15000,
    params: {
      ...pagination,
    },
  });
};

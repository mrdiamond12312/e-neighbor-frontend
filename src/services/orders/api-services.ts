import urlcat from 'urlcat';

import request from '@/services/interceptor';
import API_ENDPOINTS from '@/services/orders/api-path';

export const getOrders = (orderParams: API.IOrdersPaginationParams) => {
  return request<IPaginationResponse<API.IOrdersDetails>>(API_ENDPOINTS.ORDERS, {
    timeout: 15000,
    method: 'GET',
    params: { ...orderParams },
  });
};

export const getOrdersDetails = (orderId?: number) => {
  return request<API.IOrdersAllDetails>(urlcat(API_ENDPOINTS.ORDERS_DETAILS, { orderId }), {
    timeout: 15000,
    method: 'GET',
  });
};

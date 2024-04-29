import { useQuery } from '@umijs/max';

import API_ENDPOINTS from '@/services/orders/api-path';
import { getOrders, getOrdersDetails } from '@/services/orders/api-services';

export const useOrdersPage = (orderParams: API.IOrdersPaginationParams) =>
  useQuery([API_ENDPOINTS.ORDERS, orderParams], () => getOrders(orderParams), {});

export const useOrderDetails = (orderId?: number) =>
  useQuery([API_ENDPOINTS.ORDERS_DETAILS, orderId], () => getOrdersDetails(orderId), {
    enabled: !!orderId,
  });

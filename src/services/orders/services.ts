import { useMutation, useQuery, useQueryClient } from '@umijs/max';

import { TReturnFormFields } from '@/pages/lessor/order-details/return/hooks/useReturn';
import { TReceiptFormFields } from '@/pages/user/order-details/receipt/hooks/useReceipt';
import API_ENDPOINTS from '@/services/orders/api-path';
import {
  getOrders,
  getOrdersDetails,
  patchLessorApproval,
  patchLessorUpdateReceiptForInProgressOrder,
  patchUserCancelsOrder,
  patchUserUpdateReceiptForApprovedOrder,
} from '@/services/orders/api-services';

export const useOrdersPage = (orderParams: API.IOrdersPaginationParams) =>
  useQuery([API_ENDPOINTS.ORDERS, orderParams], () => getOrders(orderParams), {});

export const useOrderDetails = (orderId?: number) =>
  useQuery([API_ENDPOINTS.ORDERS, orderId], () => getOrdersDetails(orderId), {
    enabled: !!orderId,
  });

export const useLessorPendingOrderUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation<any, TMeta, API.IPendingOrderLessorUpdateInfoBody>(
    [API_ENDPOINTS.ORDERS_UPDATE_BY_LESSOR],
    (lessorUpdateBody: API.IPendingOrderLessorUpdateInfoBody) =>
      patchLessorApproval(lessorUpdateBody),
    {
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.ORDERS],
        }),
    },
  );
};
export const useUserCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<any, TMeta, API.IPendingOrderUserCancelInfoBody>(
    [API_ENDPOINTS.ORDERS_CANCELED_BY_USER],
    (userUpdateBody: API.IPendingOrderUserCancelInfoBody) => patchUserCancelsOrder(userUpdateBody),
    {
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.ORDERS],
        }),
    },
  );
};
export const useUserUpdateReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation<any, TMeta, TReceiptFormFields>(
    [API_ENDPOINTS.ORDERS_ADD_RECEIPT],
    (userUpdateBody: TReceiptFormFields) => patchUserUpdateReceiptForApprovedOrder(userUpdateBody),
    {
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.ORDERS],
        }),
    },
  );
};
export const useLessorUpdateReturnFinishing = () => {
  const queryClient = useQueryClient();
  return useMutation<any, TMeta, TReturnFormFields>(
    [API_ENDPOINTS.ORDERS_FINISH_ORDER],
    (userUpdateBody: TReturnFormFields) =>
      patchLessorUpdateReceiptForInProgressOrder(userUpdateBody),
    {
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.ORDERS],
        }),
    },
  );
};

import urlcat from 'urlcat';

import {
  RETURN_FORM_KEY,
  TReturnFormFields,
} from '@/pages/lessor/order-details/return/hooks/useReturn';
import {
  RECEIPT_FORM_KEY,
  TReceiptFormFields,
} from '@/pages/user/order-details/receipt/hooks/useReceipt';
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

export const patchLessorApproval = (lessorUpdateBody: API.IPendingOrderLessorUpdateInfoBody) =>
  request(API_ENDPOINTS.ORDERS_UPDATE_BY_LESSOR, {
    timeout: 15000,
    method: 'PATCH',
    data: lessorUpdateBody,
  });

export const patchUserCancelsOrder = (userCancelBody: API.IPendingOrderUserCancelInfoBody) =>
  request(API_ENDPOINTS.ORDERS_CANCELED_BY_USER, {
    timeout: 15000,
    method: 'PATCH',
    data: userCancelBody,
  });

export const patchUserUpdateReceiptForApprovedOrder = (userReceiptUpdateBody: TReceiptFormFields) =>
  request(API_ENDPOINTS.ORDERS_ADD_RECEIPT, {
    timeout: 15000,
    method: 'PATCH',
    data: {
      ...userReceiptUpdateBody,
      [RECEIPT_FORM_KEY.imagesUponReceipt]: userReceiptUpdateBody[
        RECEIPT_FORM_KEY.imagesUponReceipt
      ].map((image) => image.response.url),
    },
  });

export const patchLessorUpdateReceiptForInProgressOrder = (
  lessorReturnUpdateBody: TReturnFormFields,
) =>
  request(API_ENDPOINTS.ORDERS_FINISH_ORDER, {
    timeout: 15000,
    method: 'PATCH',
    data: {
      ...lessorReturnUpdateBody,
      [RETURN_FORM_KEY.imagesUponReturn]: lessorReturnUpdateBody[
        RETURN_FORM_KEY.imagesUponReturn
      ].map((image) => image.response.url),
    },
  });

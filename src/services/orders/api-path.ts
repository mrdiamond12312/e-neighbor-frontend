export const ORDERS = '/orders';
export const ORDERS_DETAILS = ORDERS + '/:orderId';

export const ORDERS_CANCELED_BY_USER = ORDERS + '/pending/user-update';
export const ORDERS_UPDATE_BY_LESSOR = ORDERS + '/pending/lessor-update';

export const ORDERS_ADD_RECEIPT = ORDERS + '/approved/user-update';
export const ORDERS_FINISH_ORDER = ORDERS + '/in-progress/lessor-update';
export default {
  ORDERS,
  ORDERS_DETAILS,
  ORDERS_CANCELED_BY_USER,
  ORDERS_UPDATE_BY_LESSOR,
  ORDERS_ADD_RECEIPT,
  ORDERS_FINISH_ORDER,
};

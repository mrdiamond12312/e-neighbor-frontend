export const ORDERS = '/orders';
export const ORDERS_DETAILS = ORDERS + '/:orderId';
export const ORDERS_CANCELED_BY_USER = ORDERS + '/pending/user-update';
export const ORDERS_REJECTED_BY_LESSOR = ORDERS + '/pending/lessor-update';

export default { ORDERS, ORDERS_DETAILS, ORDERS_CANCELED_BY_USER, ORDERS_REJECTED_BY_LESSOR };

export const PATH_LOGIN = '/user/login';
export const PATH_REGISTER = '/user/sign-up';
export const PATH_ROOT = '/home';

export const PATH_LESSOR = '/lessor';
export const PATH_LESSOR_ONBOARDING = PATH_LESSOR + '/on-boarding';

export const PATH_LESSOR_PRODUCTS = PATH_LESSOR + '/products';
export const PATH_LESSOR_PRODUCTS_MANAGE = PATH_LESSOR_PRODUCTS + '/manage';
export const PATH_LESSOR_ADD_PRODUCT = PATH_LESSOR_PRODUCTS + '/new';
export const PATH_LESSOR_PRODUCT_DETAIL = PATH_LESSOR_PRODUCTS_MANAGE + '/:productId';
export const PATH_LESSOR_PRODUCT_EDIT = PATH_LESSOR_PRODUCT_DETAIL + '/edit';
export const PATH_LESSOR_PRODUCT_DISABLE = PATH_LESSOR_PRODUCT_DETAIL + '/disable';
export const PATH_LESSOR_PRODUCT_ENABLE = PATH_LESSOR_PRODUCT_DETAIL + '/enable';

export const PATH_LESSOR_DASHBOARD = PATH_LESSOR + '/dashboard';
export const PATH_LESSOR_ORDERS = PATH_LESSOR + '/orders';
export const PATH_LESSOR_ORDERS_DETAILS = PATH_LESSOR_ORDERS + '/:orderId';

export const PATH_LESSOR_ORDERS_DELIVERY_IMAGE = PATH_LESSOR_ORDERS_DETAILS + '/deliveryImage';
export const PATH_LESSOR_ORDERS_RETURN_IMAGE = PATH_LESSOR_ORDERS_DETAILS + '/return';
export const PATH_LESSOR_ORDERS_APPROVE = PATH_LESSOR_ORDERS_DETAILS + '/approve';
export const PATH_LESSOR_ORDERS_REJECT = PATH_LESSOR_ORDERS_DETAILS + '/reject';
export const PATH_LESSOR_ORDERS_CANCELED = PATH_LESSOR_ORDERS + '/cancels';

export const PATH_PRODUCTS = '/product';
export const PATH_PRODUCTS_DETAILS = PATH_PRODUCTS + '/:productId';
export const PATH_PRODUCTS_RENT = PATH_PRODUCTS_DETAILS + '/rent';

export const PATH_USER = '/user/profile';
export const PATH_USER_PROFILE_EDIT = '/user/profile/edit';
export const PATH_USER_PROFILE_ORDERS = '/user/profile/orders';
export const PATH_USER_PROFILE_ORDER_DETAILS = '/user/profile/orders/:orderId';
export const PATH_USER_PROFILE_ORDER_CANCELING = '/user/profile/orders/:orderId/cancel';
export const PATH_USER_PROFILE_ORDER_FEEDBACK = '/user/profile/orders/:orderId/feedback';

export const PATH_USER_PROFILE_ORDER_IMAGERECEIPT = '/user/profile/orders/:orderId/receipt';

export const PATH_USER_PROFILE_WALLET = '/user/profile/wallet';
export const PATH_USER_PROFILE_WISHLIST = '/user/profile/wishlist';

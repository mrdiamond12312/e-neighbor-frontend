import { history } from '@umijs/max';
import { notification } from 'antd';
import type { ResponseError } from 'umi-request';
import { extend } from 'umi-request';

import * as Path from '@/const/path';
import { translate } from '@/utils/translator';

class HttpError extends Error {
  response: Response;
  data: any;
  constructor(response: Response, data: any) {
    super();
    this.response = response;
    this.data = data;
  }
}

const errorHandler = async (err: ResponseError) => {
  const { statusCode, error }: TMeta = await err.response.json();

  if (!err?.response) {
    return Promise.reject({
      meta: {
        statusCode: 503,
        message: 'Mạng không khả dụng!',
        error: 'Mạng không khả dụng!',
      },
      result: {
        data: null,
      },
    });
  } else {
    // Check token expired
    switch (error) {
      case 'SYS_000':
        notification.error({
          message: translate({ id: 'error.sys.00.message', defaultMessage: 'Server Crashed!' }),
          description: translate({
            id: 'error.sys.00.description',
            defaultMessage: 'We are trying to recover the system, please be patient!',
          }),
        });
        break;
      case 'SYS_002':
        notification.error({
          message: translate({
            id: 'error.sys.02.message',
            defaultMessage: 'Entity not Found!',
          }),
          description: translate({
            id: 'error.sys.02.description',
            defaultMessage: 'Something you are looking for is not found!',
          }),
        });
        break;
      case 'SYS_003':
        notification.error({
          message: translate({
            id: 'error.sys.03.message',
            defaultMessage: 'Service Unavailable',
          }),
          description: translate({
            id: 'error.sys.03.description',
            defaultMessage: 'This service is not for use!',
          }),
        });
        break;
      case 'ADMIN_001':
        break;
      case 'USER_001':
        notification.error({
          message: translate({
            id: 'error.sys.01.message',
            defaultMessage: 'User not Found!',
          }),
          description: translate({
            id: 'error.sys.01.description',
            defaultMessage: 'The whom you are looking for is not found!',
          }),
        });
        break;
      case 'USER_002':
        break;
      case 'USER_004':
        // Handle "User conflict" error (logic here)
        break;
      case 'TOKEN_001':
        notification.error({
          message: translate({
            id: 'error.token.01.message',
            defaultMessage: 'Session Expired!',
          }), // Assuming an ID exists
          description: translate({
            id: 'error.token.01.description',
            defaultMessage: 'You will be logged out every 2 hours!',
          }), // Assuming an ID exists
        });
        break;
      case 'OAUTH_001':
        notification.error({
          message: translate({ id: 'error.oauth.01.message' }), // Assuming an ID exists
          description: translate({ id: 'error.oauth.01.description' }), // Assuming an ID exists
        });
        break;
      case 'BAD_INPUT_001':
        notification.error({
          message: translate({
            id: 'error.badInput.01.message',
            defaultMessage: 'Invalid Input',
          }), // Assuming an ID exists
          description: translate({
            id: 'error.badInput.01.description',
            defaultMessage: 'Please double-check your forms/inputs',
          }), // Assuming an ID exists
        });
        break;
      case 'LOGOUT_001':
        notification.error({
          message: translate({ id: 'error.logout.01.message' }), // Assuming an ID exists
          description: translate({ id: 'error.logout.01.description' }), // Assuming an ID exists
        });
        break;
      case 'DATA_001':
        notification.error({
          message: translate({ id: 'error.data.01.message' }), // Assuming an ID exists
          description: translate({ id: 'error.data.01.description' }), // Assuming an ID exists
        });
        break;
      default:
        break;
    }
    if (statusCode === 401 && window.location.pathname !== Path.PATH_LOGIN) {
      return history.push(Path.PATH_LOGIN);
    }
    return Promise.reject({ statusCode, error });
  }
};

const request = extend({
  prefix: ENEIGHBOR_API,
  errorHandler,
});

// /** Add token in header when request */
request.interceptors.request.use(
  (url: string, options) => {
    const token = localStorage.getItem('accessToken');

    options.headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
      ...options.headers,
    };

    return {
      url,
      options,
    };
  },
  { global: false },
);

request.interceptors.response.use(
  async (response) => {
    const data = await response.clone().json();

    if (data && data?.result && (data?.result?.data || data?.result?.data !== null) && data?.meta) {
      if (data.result.meta) return data.result;
      return data.result.data;
    } else {
      throw new HttpError(response, data.meta);
    }
  },
  { global: false },
);

export default request;

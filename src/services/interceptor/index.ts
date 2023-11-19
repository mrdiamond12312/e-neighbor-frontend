import { history } from '@umijs/max';
import type { ResponseError } from 'umi-request';
import { extend } from 'umi-request';
import * as Path from '@/const/path';

class HttpError extends Error {
  response: Response;
  data: any;
  constructor(response: Response, data: any) {
    super();
    this.response = response;
    this.data = data;
  }
}

const errorHandler = (error: ResponseError) => {
  if (!error?.response) {
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
    if (error?.data?.meta?.statusCode === 401 && window.location.pathname !== Path.PATH_LOGIN) {
      return history.push(Path.PATH_LOGIN);
    }
    return Promise.reject(error?.data);
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

    if (data && data?.result && (data?.result?.data || data?.result?.data === null) && data?.meta) {
      return response;
    } else {
      throw new HttpError(response, data);
    }
  },
  { global: false },
);

export default request;

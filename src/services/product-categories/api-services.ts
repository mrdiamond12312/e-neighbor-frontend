import urlcat from 'urlcat';

import request from '@/services/interceptor';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORIES_DETAILS,
} from '@/services/product-categories/api-path';

export const getCategories = async (categoryOptions?: API.ICategoriesParams) => {
  return request<API.ICategoryDescriptions[]>(PRODUCT_CATEGORIES, {
    method: 'GET',
    params: categoryOptions,
    timeout: 15000,
    timeoutMessage: 'Connection Timeout!',
  });
};

export const getCategoriesDetails = async (categoryId?: number | string) => {
  return request<API.ICategoryDetails>(urlcat(PRODUCT_CATEGORIES_DETAILS, { categoryId }), {
    method: 'GET',
    timeout: 15000,
    timeoutMessage: 'Connection Timeout!',
  });
};

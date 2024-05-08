import urlcat from 'urlcat';

import { TProductApprovalFormFields } from '@/pages/admin/product/approve/hooks/useProductApproval';
import {
  ADD_PRODUCT_FORM_KEY,
  INSURANCE_KEY,
  PRODUCT_CHARACTERISTICS_KEY,
  TProductFormField,
} from '@/pages/lessor/products/add/helpers/addProductFormKeys';
import request from '@/services/interceptor';
import API_ENDPOINTS from '@/services/products/api-path';

export const getProductDetails = async (productId?: number | string) => {
  return request<API.IProductDetails>(urlcat(API_ENDPOINTS.PRODUCT_DETAILS, { productId }), {
    method: 'GET',
    timeout: 15000,
    timeoutMessage: 'Connection Timeout!',
  });
};

export const getMostViewedProducts = async (pagination: IProductsPagination) => {
  return request<IPaginationResponse<API.IProductCard>>(API_ENDPOINTS.PRODUCT_TREND_MOST_VIEWED, {
    timeout: 15000,
    params: {
      ...pagination,
      take: 4,
    },
  });
};

export const getMostRatedProducts = async (pagination: IProductsPagination) => {
  return request<IPaginationResponse<API.IProductCard>>(API_ENDPOINTS.PRODUCT_TREND_MOST_RATED, {
    timeout: 15000,
    params: {
      ...pagination,
      take: 4,
    },
  });
};

export const getProducts = async (pagination: API.IProductPaginationParams) => {
  return request<IPaginationResponse<API.IProductCard>>(API_ENDPOINTS.PRODUCTS, {
    timeout: 15000,
    params: {
      ...pagination,
      take: pagination.take ?? 12,
    },
  });
};

export const postNewProduct = async (formFields: TProductFormField) => {
  return request<API.IProductDetails>(API_ENDPOINTS.PRODUCTS, {
    method: 'POST',
    data: {
      ...formFields,
      [ADD_PRODUCT_FORM_KEY.price]: Number(formFields[ADD_PRODUCT_FORM_KEY.price]),
      [ADD_PRODUCT_FORM_KEY.value]: Number(formFields[ADD_PRODUCT_FORM_KEY.value]),
      [ADD_PRODUCT_FORM_KEY.category]: formFields[ADD_PRODUCT_FORM_KEY.category].at(-1),
      [ADD_PRODUCT_FORM_KEY.images]: formFields[ADD_PRODUCT_FORM_KEY.images].map(
        (image) => image.response.url,
      ),
      [ADD_PRODUCT_FORM_KEY.insurance]: formFields[ADD_PRODUCT_FORM_KEY.haveInsurance]
        ? {
            ...formFields[ADD_PRODUCT_FORM_KEY.insurance],
            [INSURANCE_KEY.images]: formFields[ADD_PRODUCT_FORM_KEY.insurance][
              INSURANCE_KEY.images
            ]?.map((image: any) => image.response.url),
          }
        : undefined,
      [ADD_PRODUCT_FORM_KEY.characteristics]: Object.keys(
        formFields[ADD_PRODUCT_FORM_KEY.characteristics],
      ).map((key) => ({
        [PRODUCT_CHARACTERISTICS_KEY.localeId]: key,
        [PRODUCT_CHARACTERISTICS_KEY.description]:
          formFields[ADD_PRODUCT_FORM_KEY.characteristics][key],
      })),
    },
  });
};

export const approveProduct = async (approvalFormFields: TProductApprovalFormFields) => {
  return request(API_ENDPOINTS.PRODUCT_ADMIN_APPROVE, {
    method: 'PATCH',
    data: approvalFormFields,
  });
};

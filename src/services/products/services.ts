import { useInfiniteQuery, useMutation, useQuery } from '@umijs/max';

import { TProductFormField } from '@/pages/lessor/products/add/helpers/addProductFormKeys';
import API_ENDPOINTS from '@/services/products/api-path';
import {
  getMostRatedProducts,
  getMostViewedProducts,
  getProductDetails,
  getProducts,
  postNewProduct,
} from '@/services/products/api-services';

export const useProductDetails = (productId?: number | string) =>
  useQuery<API.IProductDetails>(
    [API_ENDPOINTS.PRODUCT_DETAILS, productId],
    () => getProductDetails(productId),
    {
      enabled: !!productId,
    },
  );

export const useProductPage = (pagination: API.IProductPaginationParams) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_VIEWED, pagination],
    queryFn: () =>
      getProducts({
        ...pagination,
        rating: pagination.rating === 0 ? undefined : pagination.rating,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const { hasNextPage } = lastPage.meta;
      return hasNextPage ? allPages.length + 1 : undefined;
    },
  });
};

export const useMostViewedProducts = (pagination: IProductsPagination) => {
  return useInfiniteQuery({
    queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_VIEWED, pagination.isVehicle],
    queryFn: ({ pageParam = 1 }) => getMostViewedProducts({ ...pagination, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const { hasNextPage } = lastPage.meta;
      return hasNextPage ? allPages.length + 1 : undefined;
    },
  });
};

export const useMostRatedProducts = (pagination: IProductsPagination) => {
  return useInfiniteQuery({
    queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_RATED, pagination.isVehicle],
    queryFn: ({ pageParam = 1 }) => getMostRatedProducts({ ...pagination, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const { hasNextPage } = lastPage.meta;
      return hasNextPage ? allPages.length + 1 : undefined;
    },
  });
};

export const useCreateNewProducts = () =>
  useMutation(
    [API_ENDPOINTS.PRODUCTS],
    (formFields: TProductFormField) => postNewProduct(formFields),
    {},
  );

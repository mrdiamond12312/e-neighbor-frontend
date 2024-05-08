import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@umijs/max';

import { TProductApprovalFormFields } from '@/pages/admin/product/approve/hooks/useProductApproval';
import { TProductFormField } from '@/pages/lessor/products/add/helpers/addProductFormKeys';
import API_ENDPOINTS from '@/services/products/api-path';
import {
  approveProduct,
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
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

export const useProductPage = (pagination: API.IProductPaginationParams) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.PRODUCTS, pagination],
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

export const useCreateNewProducts = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [API_ENDPOINTS.PRODUCTS],
    (formFields: TProductFormField) => postNewProduct(formFields),
    {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_VIEWED],
        });
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_RATED],
        });
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.PRODUCTS],
        });
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.PRODUCT_DETAILS],
        });
      },
    },
  );
};

export const useReviewProductApproval = () => {
  const queryClient = useQueryClient();
  return useMutation<any, TMeta, TProductApprovalFormFields>(
    [API_ENDPOINTS.PRODUCT_ADMIN_APPROVE],
    (formFields: TProductApprovalFormFields) => approveProduct(formFields),
    {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_VIEWED],
        });
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.PRODUCT_TREND_MOST_RATED],
        });
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.PRODUCTS],
        });
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.PRODUCT_DETAILS],
        });
      },
    },
  );
};

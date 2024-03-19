import { useQuery } from '@umijs/max';

import API_ENDPOINTS from '@/services/products/api-path';
import { getProductDetails } from '@/services/products/api-services';

export const useProductDetails = (productId?: number | string) =>
  useQuery<API.IProductDetails>(
    [API_ENDPOINTS.PRODUCT_DETAILS],
    () => getProductDetails(productId),
    {
      enabled: !!productId,
    },
  );

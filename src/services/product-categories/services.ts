import { useQuery } from '@umijs/max';

import { IOption } from '@/pages/lessor/products/add/helpers/productCategories';
import API_ENDPOINTS from '@/services/product-categories/api-path';
import { getCategories, getCategoriesDetails } from '@/services/product-categories/api-services';

export const useCategoriesList = (isVehicle?: IOption['value']) =>
  useQuery<API.ICategoryDescriptions[]>(
    [API_ENDPOINTS.PRODUCT_CATEGORIES, isVehicle],
    () => getCategories({ isVehicle }),
    {
      enabled: !!isVehicle,
    },
  );

export const useCategoriesDetails = (categoryId?: string | number | boolean) => {
  const categoryIdParser = typeof categoryId !== 'string' ? categoryId : parseInt(categoryId);
  return useQuery<API.ICategoryDetails>(
    [API_ENDPOINTS.PRODUCT_CATEGORIES_DETAILS, categoryId],
    () => getCategoriesDetails(Number(categoryIdParser)),
    {
      enabled: !!categoryId,
    },
  );
};

import { useParams } from '@umijs/max';

import { useProductDetails } from '@/services/products/services';

export const useProductInformation = () => {
  const { productId } = useParams();

  const { data, isLoading, isError } = useProductDetails(productId);

  const breadCrumbs = !isError ? [data?.category, data?.subCategory, data?.name] : [];
  return { isLoading, breadCrumbs };
};

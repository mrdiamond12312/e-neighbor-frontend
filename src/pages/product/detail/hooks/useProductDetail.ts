import { useIntl, useParams } from '@umijs/max';

import { useProductDetails } from '@/services/products/services';

export const useProductDetail = () => {
  const { productId } = useParams();

  const { data, isLoading, isError } = useProductDetails(productId);
  const { formatMessage } = useIntl();
  const breadCrumbs = !isError ? [data?.category, data?.subCategory, data?.name] : [];
  return { data, isLoading, breadCrumbs, formatMessage };
};

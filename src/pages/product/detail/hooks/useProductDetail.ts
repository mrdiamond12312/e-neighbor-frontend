import { useIntl, useParams } from '@umijs/max';
import { useEffect } from 'react';

import { useProductDetails } from '@/services/products/services';

export const useProductDetail = () => {
  const { productId } = useParams();

  const { data, isLoading, isError } = useProductDetails(productId);
  const { formatMessage } = useIntl();
  const breadCrumbs = !isError ? [data?.category, data?.subCategory, data?.name] : [];

  // Fixing position
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return { data, isLoading, breadCrumbs, formatMessage };
};

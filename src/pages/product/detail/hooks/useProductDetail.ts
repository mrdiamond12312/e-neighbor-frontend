import { useIntl, useParams } from '@umijs/max';
import { useEffect } from 'react';

import { useProductDetails } from '@/services/products/services';

export const useProductDetail = () => {
  const { productId } = useParams();

  const { data, isLoading, isError } = useProductDetails(productId);
  const { formatMessage } = useIntl();

  const mainCategory = data?.category.isVehicle ? 'vehicles' : 'furnitures';
  const subCategory = data?.category.name;

  const breadcrumbsItems =
    !isLoading && !isError
      ? [
          {
            key: mainCategory,
            title: formatMessage({
              id: ['product.category', mainCategory].join('.'),
              defaultMessage: mainCategory,
            }),
          },
          {
            key: subCategory,
            title: formatMessage({
              id: subCategory,
              defaultMessage: subCategory,
            }),
          },
        ]
      : [];
  // Fixing position
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return { data, isLoading, breadcrumbsItems, formatMessage, productId } as const;
};

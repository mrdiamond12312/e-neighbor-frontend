import { useSearchParams } from '@umijs/max';

import { usePagination } from '@/hooks/usePagination';
import {
  ADMIN_SEGMENTS_LOCALES,
  PRODUCT_CLASSIFY_SEGMENT,
} from '@/pages/admin/product/management/helpers/productClassify';
import { useProductPage } from '@/services/products/services';

export const useAdminProductsManagement = () => {
  const {
    category,
    categoryHandler,
    sortOptions,
    sortFieldHandler,
    sortField,
    control,
    keyword,
    locationHandler,
    ratingHandler,
    searchBoxHandler,
    paginationParams,
    order,
    orderHandler,
    orderOptions,
    page,
    pageHandler,
    formatMessage,
  } = usePagination({ initialTake: 15 });

  const [searchParams, setSearchParams] = useSearchParams();
  const classify = searchParams.get('classify');
  const activeSegment = PRODUCT_CLASSIFY_SEGMENT.hasOwnProperty(classify ?? '')
    ? PRODUCT_CLASSIFY_SEGMENT[classify as keyof typeof PRODUCT_CLASSIFY_SEGMENT]
    : PRODUCT_CLASSIFY_SEGMENT.isNotApproved;

  const { data: productPage, isLoading: productPageLoading } = useProductPage({
    ...paginationParams,

    isConfirmedByAdmin: classify === PRODUCT_CLASSIFY_SEGMENT.isApproved,
    isRejected: classify === PRODUCT_CLASSIFY_SEGMENT.isRejected,
  });

  const segmentedOptions = Object.values(PRODUCT_CLASSIFY_SEGMENT).map((value) => {
    const localeId = [ADMIN_SEGMENTS_LOCALES, value].join('.');
    return {
      label: formatMessage({ id: localeId, defaultMessage: value }),
      value: value as PRODUCT_CLASSIFY_SEGMENT,
    };
  });

  const handleSegments = (value: PRODUCT_CLASSIFY_SEGMENT) => {
    setSearchParams(
      new URLSearchParams({
        classify: value,
      }),
    );
  };

  return {
    category,
    categoryHandler,
    sortOptions,
    sortFieldHandler,
    sortField,
    control,
    keyword,
    locationHandler,
    ratingHandler,
    searchBoxHandler,
    paginationParams,
    order,
    orderHandler,
    orderOptions,
    page,
    pageHandler,
    productPage,
    productPageLoading,
    formatMessage,
    segmentedOptions,
    activeSegment,
    handleSegments,
  } as const;
};

import { useIntl, useParams } from '@umijs/max';

import { useProductDetails } from '@/services/products/services';

export enum APPROVAL_STATUS {
  isApproved = 'isApproved',
  isNotApproved = 'isNotApproved',
  isRejected = 'isRejected',
}

export const useAdminProductDetail = () => {
  const { formatMessage } = useIntl();
  const { productId } = useParams();

  const {
    data: productDetail,
    isLoading: isRetrievingProduct,
    isError: isRetrievingProductError,
  } = useProductDetails(productId);

  const approvalStatus = productDetail?.isConfirmed
    ? APPROVAL_STATUS.isApproved
    : productDetail?.rejectReason
    ? APPROVAL_STATUS.isRejected
    : APPROVAL_STATUS.isNotApproved;

  return {
    formatMessage,
    productId,
    isRetrievingProductError,
    isRetrievingProduct,
    approvalStatus,
  } as const;
};

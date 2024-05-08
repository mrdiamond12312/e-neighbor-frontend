import { FormattedHTMLMessage, Link } from '@umijs/max';
import React, { Fragment } from 'react';
import urlcat from 'urlcat';

import Button from '@/components/Button';
import { PATH_ADMIN_PRODUCT_REVIEW } from '@/const/path';
import {
  APPROVAL_STATUS,
  useAdminProductDetail,
} from '@/pages/admin/product/detail/hooks/useAdminProductDetail';
import ProductDetail from '@/pages/product/detail';

const AdminProductDetails: React.FC = () => {
  const { productId, approvalStatus } = useAdminProductDetail();

  return (
    <Fragment>
      <ProductDetail
        action={
          <Link to={urlcat(PATH_ADMIN_PRODUCT_REVIEW, { productId })}>
            <Button
              type="dashed"
              btnSize="large"
              className="text-heading-5 w-full"
              disabled={approvalStatus !== APPROVAL_STATUS.isNotApproved}
            >
              <FormattedHTMLMessage
                id="admin.product.detail.review"
                defaultMessage="Review this Approval Request"
              />
            </Button>
          </Link>
        }
      />
    </Fragment>
  );
};

export default AdminProductDetails;

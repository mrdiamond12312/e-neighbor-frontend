import { MoreOutlined } from '@ant-design/icons';
import { CloudArrowUp, Eye, EyeClosed, PencilSimpleLine } from '@phosphor-icons/react';
import { FormattedHTMLMessage, Link } from '@umijs/max';
import { Dropdown, MenuProps } from 'antd/lib';
import React from 'react';
import urlcat from 'urlcat';

import {
  PATH_LESSOR_PRODUCT_DETAIL,
  PATH_LESSOR_PRODUCT_EDIT,
  PATH_LESSOR_PRODUCT_DISABLE,
} from '@/const/path';
import { AVAILABILITY } from '@/hooks/usePagination';

export type TProductActionsProps = {
  productId: number | string;
  productStatus: AVAILABILITY;
  isAdminApproved: boolean;
};

export const ProductActionsMenu: React.FC<TProductActionsProps> = ({
  productId,
  productStatus,
  isAdminApproved,
}) => {
  const dropDownItems: MenuProps['items'] = [
    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center !text-teal-5"
          to={urlcat(PATH_LESSOR_PRODUCT_DETAIL, { productId })}
        >
          <Eye className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="lessor.product.management.table.col.action.view-detail"
            defaultMessage="Product Details"
          />
        </Link>
      ),
      key: ['view-product', productId].join('-'),
    },
    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center"
          to={urlcat(PATH_LESSOR_PRODUCT_EDIT, { productId })}
        >
          <PencilSimpleLine className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="lessor.product.management.table.col.action.edit"
            defaultMessage="Edit Product"
          />
        </Link>
      ),
      key: ['edit-product', productId].join('-'),
      disabled: isAdminApproved,
      style: { color: isAdminApproved ? undefined : 'dodgerblue' },
    },
    {
      type: 'divider',
    },

    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center"
          to={urlcat(PATH_LESSOR_PRODUCT_DISABLE, { productId })}
        >
          <CloudArrowUp className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="lessor.product.management.table.col.action.enable"
            defaultMessage="Re-enable Product!"
          />
        </Link>
      ),
      key: ['enable-product', productId].join('-'),
      disabled: productStatus === AVAILABILITY.available,
      style: { color: productStatus === AVAILABILITY.available ? undefined : 'deepskyblue' },
    },
    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center"
          to={urlcat(PATH_LESSOR_PRODUCT_DISABLE, { productId })}
        >
          <EyeClosed className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="lessor.product.management.table.col.action.disable"
            defaultMessage="Disable this Product!"
          />
        </Link>
      ),
      key: ['disable-product', productId].join('-'),
      danger: true,
      disabled: productStatus === AVAILABILITY.notAvailable,
    },
  ];
  return (
    <Dropdown menu={{ items: dropDownItems }}>
      <MoreOutlined className="cursor-pointer" />
    </Dropdown>
  );
};

import { MoreOutlined } from '@ant-design/icons';
import { CheckCircle, Eye, XCircle } from '@phosphor-icons/react';
import { FormattedHTMLMessage, Link } from '@umijs/max';
import { Dropdown, MenuProps } from 'antd/lib';
import React from 'react';
import urlcat from 'urlcat';

import {
  PATH_LESSOR_ORDERS_APPROVE,
  PATH_LESSOR_ORDERS_DETAILS,
  PATH_LESSOR_ORDERS_REJECT,
} from '@/const/path';
import { ORDER_STATUS } from '@/hooks/useOrderPagination';

export type TActionsProps = {
  orderId: number;
  orderStatus: ORDER_STATUS;
};

export const OrderActionsMenu: React.FC<TActionsProps> = ({ orderId, orderStatus }) => {
  const dropDownItems: MenuProps['items'] = [
    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center !text-teal-5"
          to={urlcat(PATH_LESSOR_ORDERS_DETAILS, { orderId })}
        >
          <Eye className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="lessor.order.management.table.col.action.view-detail"
            defaultMessage="Order Details"
          />
        </Link>
      ),
      key: ['view-order', orderId].join('-'),
    },
    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center"
          to={urlcat(PATH_LESSOR_ORDERS_APPROVE, { orderId })}
        >
          <CheckCircle className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="lessor.order.management.table.col.action.approve"
            defaultMessage="Approve this Order"
          />
        </Link>
      ),
      key: ['approve-order', orderId].join('-'),
      disabled: orderStatus !== 'PENDING',
      style: { color: orderStatus !== 'PENDING' ? undefined : 'dodgerblue' },
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center"
          to={urlcat(PATH_LESSOR_ORDERS_REJECT, { orderId })}
        >
          <XCircle className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="lessor.order.management.table.col.action.reject"
            defaultMessage="Reject this Order"
          />
        </Link>
      ),
      key: ['reject-order', orderId].join('-'),
      danger: true,
      disabled: orderStatus !== 'PENDING',
    },
  ];
  return (
    <Dropdown menu={{ items: dropDownItems }}>
      <MoreOutlined className="cursor-pointer" />
    </Dropdown>
  );
};

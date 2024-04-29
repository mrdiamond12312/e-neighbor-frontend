import { MoreOutlined } from '@ant-design/icons';
import { Eye, Star, XCircle } from '@phosphor-icons/react';
import { FormattedHTMLMessage, Link } from '@umijs/max';
import { Dropdown, MenuProps } from 'antd/lib';
import React from 'react';
import urlcat from 'urlcat';

import {
  PATH_USER_PROFILE_ORDER_CANCELING,
  PATH_USER_PROFILE_ORDER_DETAILS,
  PATH_USER_PROFILE_ORDER_FEEDBACK,
} from '@/const/path';

export type TActionsProps = {
  orderId: number;
};

export const OrderActionsMenu: React.FC<TActionsProps> = ({ orderId }) => {
  const dropDownItems: MenuProps['items'] = [
    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center !text-teal-5"
          to={urlcat(PATH_USER_PROFILE_ORDER_DETAILS, { orderId })}
        >
          <Eye className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="order.management.table.col.action.view-detail"
            defaultMessage="Order Details"
          />
        </Link>
      ),
      key: ['view-order', orderId].join('-'),
    },
    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center !text-cyan-600"
          to={urlcat(PATH_USER_PROFILE_ORDER_FEEDBACK, { orderId })}
        >
          <Star className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="order.management.table.col.action.feedback"
            defaultMessage="Feedback"
          />
        </Link>
      ),
      key: ['feedback-order', orderId].join('-'),
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Link
          className="flex flex-row gap-2 text-body-2-semibold items-center"
          to={urlcat(PATH_USER_PROFILE_ORDER_CANCELING, { orderId })}
        >
          <XCircle className="text-body-1-semibold" />
          <FormattedHTMLMessage
            id="order.management.table.col.action.canceling"
            defaultMessage="Cancel this Order"
          />
        </Link>
      ),
      key: ['cancel-order', orderId].join('-'),
      danger: true,
    },
  ];
  return (
    <Dropdown menu={{ items: dropDownItems }}>
      <MoreOutlined className="cursor-pointer" />
    </Dropdown>
  );
};

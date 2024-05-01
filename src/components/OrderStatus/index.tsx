import { SyncOutlined } from '@ant-design/icons';
import { CheckCircle, Clock, FlagBannerFold, MinusCircle, XCircle } from '@phosphor-icons/react';
import { FormattedHTMLMessage } from '@umijs/max';
import { Tag } from 'antd/lib';
import React from 'react';

import { ORDER_STATUS } from '@/hooks/useOrderPagination';

import './orderStatus.css';

export type TOrderProps = {
  orderStatus: ORDER_STATUS;
};

export const ORDER_STATUS_COLOR = {
  [ORDER_STATUS.PENDING]: 'processing',
  [ORDER_STATUS.APPROVED]: 'success',
  [ORDER_STATUS.IN_PROGRESS]: 'warning',
  [ORDER_STATUS.COMPLETED]: 'cyan',

  [ORDER_STATUS.REJECTED]: 'error',
  [ORDER_STATUS.CANCELED]: 'default',
};

export const ORDER_STATUS_ICON = {
  [ORDER_STATUS.PENDING]: <Clock />,
  [ORDER_STATUS.APPROVED]: <CheckCircle />,
  [ORDER_STATUS.IN_PROGRESS]: <SyncOutlined spin />,
  [ORDER_STATUS.COMPLETED]: <FlagBannerFold />,

  [ORDER_STATUS.REJECTED]: <XCircle />,
  [ORDER_STATUS.CANCELED]: <MinusCircle />,
};

export const OrderStatus: React.FC<TOrderProps> = ({ orderStatus }) => {
  return (
    <Tag
      color={ORDER_STATUS_COLOR[orderStatus]}
      icon={ORDER_STATUS_ICON[orderStatus]}
      className="flex flex-row items-center font-sans text-body-2-semibold gap-2 py-1 custom-tag"
    >
      <FormattedHTMLMessage
        id={['order.status', orderStatus].join('.')}
        defaultMessage={orderStatus}
      />
    </Tag>
  );
};

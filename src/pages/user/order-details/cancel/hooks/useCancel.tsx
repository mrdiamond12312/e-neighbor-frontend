import { FormattedHTMLMessage, history, useParams } from '@umijs/max';
import { notification } from 'antd/lib';
import { useState } from 'react';
import urlcat from 'urlcat';

import { PATH_USER_PROFILE_ORDER_DETAILS } from '@/const/path';
import { useUserCancelOrder } from '@/services/orders/services';

export enum REJECT_REASON_KEY {
  rejectReason = 'rejectReason',
  orderId = 'orderId',
  isRejected = 'isRejected',
}

export type TRejectReason = {
  [REJECT_REASON_KEY.rejectReason]: string;
  [REJECT_REASON_KEY.orderId]: number;
  [REJECT_REASON_KEY.isRejected]: boolean;
};

export const useCancel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { orderId } = useParams();
  const { mutate, isLoading } = useUserCancelOrder();

  const body: API.IPendingOrderUserCancelInfoBody = {
    orderId: Number(orderId),
    isCanceled: true,
  };

  const handleCancel = () => {
    mutate(body, {
      onSuccess: () =>
        notification.success({
          message: (
            <FormattedHTMLMessage
              id="user.orders.cancel.submit.success"
              defaultMessage="Successfully cancel this order"
            />
          ),
        }),
      onError: (error) =>
        notification.error({
          message: [error.statusCode, error.error].join(' - '),
          description: error.message,
        }),
    });
  };

  const afterClose = () => {
    history.push(urlcat(PATH_USER_PROFILE_ORDER_DETAILS, { orderId }));
  };

  return {
    orderId,
    isOpen,
    setIsOpen,
    handleCancel,
    isLoading,
    afterClose,
  } as const;
};

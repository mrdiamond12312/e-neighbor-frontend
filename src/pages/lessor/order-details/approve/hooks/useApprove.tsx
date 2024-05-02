import { FormattedHTMLMessage, history, useParams } from '@umijs/max';
import { notification } from 'antd/lib';
import { useState } from 'react';
import urlcat from 'urlcat';

import { PATH_LESSOR_ORDERS_DETAILS } from '@/const/path';
import { useLessorPendingOrderUpdate } from '@/services/orders/services';

export const useApprove = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { orderId } = useParams();
  const { mutate, isLoading } = useLessorPendingOrderUpdate();

  const body: API.IPendingOrderLessorUpdateInfoBody = {
    orderId: Number(orderId),
    isRejected: false,
  };

  const handleApprove = () =>
    mutate(body, {
      onSuccess: () =>
        notification.success({
          message: (
            <FormattedHTMLMessage
              id="lessor.orders.approve.submit.success"
              defaultMessage="Successfully approved this order"
            />
          ),
        }),
      onError: (error) =>
        notification.error({
          message: [error.statusCode, error.error].join(' - '),
          description: error.message,
        }),
    });

  const afterClose = () => {
    history.push(urlcat(PATH_LESSOR_ORDERS_DETAILS, { orderId }));
  };
  return { orderId, isOpen, setIsOpen, handleApprove, isLoading, afterClose } as const;
};

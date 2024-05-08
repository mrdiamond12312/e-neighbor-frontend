import { yupResolver } from '@hookform/resolvers/yup';
import { history, useIntl, useParams } from '@umijs/max';
import { notification } from 'antd/lib';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import urlcat from 'urlcat';
import * as yup from 'yup';

import { PATH_LESSOR_ORDERS_DETAILS } from '@/const/path';
import { useLessorPendingOrderUpdate } from '@/services/orders/services';

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

export const useReject = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { orderId } = useParams();
  const { mutate, isLoading } = useLessorPendingOrderUpdate();

  const { formatMessage } = useIntl();
  const RejectFormValidationSchema = yup.object().shape({
    [REJECT_REASON_KEY.rejectReason]: yup.string().required(
      formatMessage({
        id: 'lessor.orders.reject.fields.rejectReason.null',
        defaultMessage: 'Please fill in your reason',
      }),
    ),
    [REJECT_REASON_KEY.orderId]: yup.number().required(),
    [REJECT_REASON_KEY.isRejected]: yup.boolean().required(),
  });

  const { control, getValues, trigger } = useForm<TRejectReason>({
    defaultValues: {
      [REJECT_REASON_KEY.orderId]: Number(orderId),
      [REJECT_REASON_KEY.isRejected]: true,
    },
    resolver: yupResolver<TRejectReason>(RejectFormValidationSchema) ?? null,
    mode: 'onTouched',
  });

  const handleReject = async (body: API.IPendingOrderLessorUpdateInfoBody) => {
    const isGoodToForward = await trigger();
    if (isGoodToForward)
      mutate(body, {
        onSuccess: () => {
          notification.success({
            message: formatMessage(
              {
                id: 'lessor.orders.reject.submit.success',
                defaultMessage: 'Successfully reject order #{orderId}',
              },
              { orderId },
            ),
            duration: 0.5,
            onClose: () => setIsOpen(false),
          });
        },
        onError: (error) => {
          notification.error({
            message: [error.statusCode, error.error].join(' - '),
            description: error.message,
            duration: 0.5,
            onClose: () => setIsOpen(false),
          });
        },
      });
  };

  const afterClose = () => {
    history.push(urlcat(PATH_LESSOR_ORDERS_DETAILS, { orderId }));
  };

  return {
    orderId,
    isOpen,
    setIsOpen,
    handleReject,
    isLoading,
    afterClose,
    control,
    getValues,
  } as const;
};

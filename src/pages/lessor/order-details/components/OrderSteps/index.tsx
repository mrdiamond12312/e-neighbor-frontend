import { HandCoins, Truck, UserCheck } from '@phosphor-icons/react';
import { useIntl } from '@umijs/max';
import { StepProps } from 'antd/lib';
import React from 'react';

import { Steps } from '@/components/Steps';
import { getDateTimeFormatNormal } from '@/utils/time-format';

export type TOrderStepsProps = {
  data: API.IOrdersAllDetails | undefined;
};

export const OrderSteps: React.FC<TOrderStepsProps> = ({ data }) => {
  const { formatMessage } = useIntl();
  const isPaid = data?.paymentStatus === 'COMPLETE';
  const lessorStatus =
    data?.orderStatus === 'PENDING'
      ? 'process'
      : data?.orderStatus === 'REJECTED'
      ? 'error'
      : 'finish';
  const deliveryStatus =
    lessorStatus !== 'finish' ? 'wait' : data?.imagesUponReceipt !== null ? 'finish' : 'process';
  const stepItems: StepProps[] = [
    {
      title: formatMessage({
        id: 'order.details.step.payment',
        defaultMessage: 'Make Payment',
      }),
      status: isPaid ? 'finish' : 'process',
      description: getDateTimeFormatNormal(data?.createdAt),
      icon: <HandCoins size={32} className="p-1" />,
    },
    {
      title: formatMessage({
        id: 'order.details.step.lessorAccept',
        defaultMessage: 'Lessor Accept',
      }),
      status: lessorStatus,
      icon: <UserCheck size={32} className="p-1" />,
    },
    {
      title: formatMessage({
        id: 'order.details.step.delivery',
        defaultMessage: 'Delivery',
      }),
      status: deliveryStatus,
      icon: <Truck size={32} className="p-1" />,
    },
    {
      title: formatMessage({
        id: 'order.details.step.complete',
        defaultMessage: 'Order Complete!',
      }),
      status: deliveryStatus,
      icon: <Truck size={32} className="p-1" />,
    },
  ];
  return <Steps stepItems={stepItems} />;
};

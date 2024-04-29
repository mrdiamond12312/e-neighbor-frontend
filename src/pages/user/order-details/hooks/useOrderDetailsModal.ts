import { history, useParams } from '@umijs/max';
import { useState } from 'react';

import { PATH_USER_PROFILE_ORDERS } from '@/const/path';
import { useOrderDetails } from '@/services/orders/services';

export const useOrderDetailsModal = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useOrderDetails(orderId ? parseInt(orderId) : undefined);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleCancel = () => {
    history.push(PATH_USER_PROFILE_ORDERS);
  };
  return { orderId, data, isLoading, isOpen, setIsOpen, handleCancel } as const;
};

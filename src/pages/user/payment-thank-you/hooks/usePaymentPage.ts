import { history, useIntl, useSearchParams } from '@umijs/max';
import { useState } from 'react';

import { PATH_USER_PROFILE_ORDERS } from '@/const/path';
import { PAYMENT_INFO_FIELD } from '@/const/payment-info';

export type TPaymentInfos = {
  [key in PAYMENT_INFO_FIELD]: string | null;
};

export const usePaymentPage = () => {
  // I18n
  const { formatMessage } = useIntl();

  // Modal settings
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleCancel = () => history.push(PATH_USER_PROFILE_ORDERS);

  // Can add setSearchParams for the following for other usage
  // Search Params ?[key]=[value] (same behaviours as React's useState)
  const [searchParams] = useSearchParams();
  const paymentInfo: TPaymentInfos = Object.fromEntries(
    searchParams.entries(),
  ) as unknown as TPaymentInfos;
  // ** Please use searchParams.getAll(key) if a value is of array type

  // Other Logic here (Checking checksum and generate information to render)

  // Return neccessary Logic Result
  return {
    formatMessage,
    isOpen,
    setIsOpen,
    handleCancel,
    searchParams,
    paymentInfo,
  } as const;
};

import { history, useIntl, useParams, useSearchParams } from '@umijs/max';
import { useState } from 'react';
import urlcat from 'urlcat';

import { PATH_PRODUCTS_DETAILS } from '@/const/path';

export const usePaymentPage = () => {
  // I18n
  const { formatMessage } = useIntl();

  // Page Params
  const { productId } = useParams();

  // Modal settings
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleCancel = () => history.push(urlcat(PATH_PRODUCTS_DETAILS, { productId }));

  // Can add setSearchParams for the following for other usage
  // Search Params ?[key]=[value] (same behaviours as React's useState)
  const [searchParams] = useSearchParams();
  const allParams = Object.fromEntries(searchParams.entries());
  console.log(allParams);
  // ** Please use searchParams.getAll(key) if a value is of array type

  // Other Logic here (Checking checksum and generate information to render)

  // Return neccessary Logic Result
  return {
    formatMessage,
    isOpen,
    setIsOpen,
    handleCancel,
    productId,
    searchParams,
    allParams,
  } as const;
};

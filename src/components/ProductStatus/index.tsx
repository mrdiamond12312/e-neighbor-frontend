import { Check, MinusCircle } from '@phosphor-icons/react';
import { FormattedHTMLMessage } from '@umijs/max';
import { Tag } from 'antd/lib';
import React from 'react';

import { AVAILABILITY } from '@/hooks/usePagination';
import './productStatus.css';

export type TProductStatusProps = {
  productStatus: AVAILABILITY;
};

export const PRODUCT_STATUS_COLOR = {
  [AVAILABILITY.available]: 'success',
  [AVAILABILITY.notAvailable]: 'default',
};

export const PRODUCT_STATUS_ICON = {
  [AVAILABILITY.available]: <Check />,
  [AVAILABILITY.notAvailable]: <MinusCircle />,
};

export const ProductStatus: React.FC<TProductStatusProps> = ({ productStatus }) => {
  return (
    <Tag
      color={PRODUCT_STATUS_COLOR[productStatus]}
      icon={PRODUCT_STATUS_ICON[productStatus]}
      className="flex flex-row items-center font-sans text-body-2-semibold gap-2 py-1 custom-tag"
    >
      <FormattedHTMLMessage id={productStatus} defaultMessage={productStatus} />
    </Tag>
  );
};

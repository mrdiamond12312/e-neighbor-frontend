import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Typography } from 'antd/lib';
import React from 'react';

export type TDeliveryInfoProps = {
  userFullname?: string;
  address?: string;
  phoneNumber?: string;
};

export const DeliveryInfo: React.FC<TDeliveryInfoProps> = ({
  userFullname,
  address,
  phoneNumber,
}) => {
  return (
    <Flex className="flex-col w-full pt-2">
      <p className="text-heading-4">
        <FormattedHTMLMessage
          id="order.detail.deliveryInfo.header"
          defaultMessage="Delivery Information"
        />
      </p>
      <Flex className="flex-row pt-2 w-full">
        <Flex className="rounded flex-col border-l-4 border-teal-7 bg-gradient-to-r from-teal-50 to-transparent pl-2 w-full">
          <Typography className="font-sans text-body-1-medium">{userFullname}</Typography>
          <Typography className="font-sans text-body-2-regular text-neutral-7">
            {phoneNumber}
          </Typography>
          <Typography className="font-sans text-body-2-regular text-neutral-7">
            {address}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};

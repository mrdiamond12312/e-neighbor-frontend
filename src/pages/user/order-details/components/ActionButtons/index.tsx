import { Chat, Eye, MagnifyingGlass } from '@phosphor-icons/react';
import { FormattedHTMLMessage, Link } from '@umijs/max';
import { Flex } from 'antd/lib';
import React from 'react';
import urlcat from 'urlcat';

import Button from '@/components/Button';
import { PATH_PRODUCTS_DETAILS } from '@/const/path';

export type TOrderActionsProps = {
  productId?: string | number;
  lessorId?: number;
  shopName?: string;
};

export const ActionButtons: React.FC<TOrderActionsProps> = ({ productId, shopName }) => {
  return (
    <Flex className="justify-end flex-row flex-wrap gap-2 p-4 bg-gradient-to-l from-teal-50 to-transparent border-t-1 border-b-1">
      <Link to={productId ? urlcat(PATH_PRODUCTS_DETAILS, { productId }) : '#'}>
        <Button
          className="flex flex-row items-center"
          type="dashed"
          icon={<MagnifyingGlass className="text-body-1-semibold" />}
        >
          <FormattedHTMLMessage id="order.detail.viewProduct" defaultMessage="View Product" />
        </Button>
      </Link>
      <Button
        className="flex flex-row items-center"
        icon={<Eye className="text-body-1-semibold" />}
        disabled
      >
        <FormattedHTMLMessage
          id="order.detail.lessorPage"
          defaultMessage="View {shopName} shop"
          values={{ shopName }}
        />
      </Button>
      <Button
        className="flex flex-row items-center"
        icon={<Chat className="text-body-1-semibold" />}
        type="primary"
        disabled
      >
        <FormattedHTMLMessage
          id="order.detail.chatAction"
          defaultMessage="Chat with {shopName}"
          values={{ shopName }}
        />
      </Button>
    </Flex>
  );
};

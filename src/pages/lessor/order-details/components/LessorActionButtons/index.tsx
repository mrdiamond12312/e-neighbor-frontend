import { Chat, MagnifyingGlass } from '@phosphor-icons/react';
import { FormattedHTMLMessage, Link } from '@umijs/max';
import { Flex } from 'antd/lib';
import React from 'react';
import urlcat from 'urlcat';

import Button from '@/components/Button';
import { PATH_LESSOR_PRODUCT_DETAIL } from '@/const/path';

export type TOrderActionsProps = {
  productId?: string | number;
  userId?: number;
  userName?: string;
};

export const LessorActionButtons: React.FC<TOrderActionsProps> = ({ productId, userName }) => {
  return (
    <Flex className="justify-end flex-row flex-wrap gap-2 p-4 bg-gradient-to-l from-teal-50 to-transparent border-t-1 border-b-1">
      <Link to={productId ? urlcat(PATH_LESSOR_PRODUCT_DETAIL, { productId }) : '#'}>
        <Button
          className="flex flex-row items-center"
          type="dashed"
          icon={<MagnifyingGlass className="text-body-1-semibold" />}
        >
          <FormattedHTMLMessage
            id="lessor.order.detail.viewProduct"
            defaultMessage="View Product"
          />
        </Button>
      </Link>
      <Button
        className="flex flex-row items-center"
        icon={<Chat className="text-body-1-semibold" />}
        type="primary"
        disabled
      >
        <FormattedHTMLMessage
          id="lessor.order.detail.chatAction"
          defaultMessage="Chat with {userName}"
          values={{ userName }}
        />
      </Button>
    </Flex>
  );
};

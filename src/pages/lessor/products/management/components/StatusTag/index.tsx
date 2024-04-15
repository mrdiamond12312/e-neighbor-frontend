import { Checks } from '@phosphor-icons/react/dist/ssr';
import { FormattedHTMLMessage } from '@umijs/max';
import { Tag } from 'antd/lib';
import React, { Fragment } from 'react';

export type TStatusProps = {
  adminApprove?: boolean;
  status: string;
};

export const StatusTag: React.FC<TStatusProps> = ({ status }) => {
  switch (status) {
    case 'product.status.available':
      return (
        <Tag
          color="success"
          bordered={false}
          className="text-body-2-semibold uppercase flex flex-row justify-center items-center"
          icon={<Checks />}
        >
          <FormattedHTMLMessage id={status} defaultMessage="Available" />
        </Tag>
      );

    case 'product.status.not.available':
      return (
        <Tag
          color="success"
          bordered={false}
          className="text-body-2-semibold uppercase flex flex-row justify-center items-center"
          icon={<Checks />}
        >
          <FormattedHTMLMessage id={status} defaultMessage="Not Available" />
        </Tag>
      );
  }
  return <Fragment />;
};

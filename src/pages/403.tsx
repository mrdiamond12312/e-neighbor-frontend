import { FormattedHTMLMessage, history } from '@umijs/max';
import { Result } from 'antd';
import React from 'react';

import Button from '@/components/Button';

export type TUnauthorizedPagePageProps = {
  subTitle?: React.ReactNode;
};
const UnauthorizedPage: React.FC<TUnauthorizedPagePageProps> = ({ subTitle }) => (
  <Result
    status="403"
    title="403"
    subTitle={subTitle}
    extra={
      <Button type="primary" onClick={() => history.back()}>
        <FormattedHTMLMessage id="common.navigate.back" defaultMessage="Go back" />
      </Button>
    }
  />
);

export default UnauthorizedPage;

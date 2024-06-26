import { FormattedHTMLMessage, history } from '@umijs/max';
import { Result } from 'antd';
import React from 'react';

import Button from '@/components/Button';

export type TNoFoundPageProps = {
  subTitle?: React.ReactNode;
};
const NoFoundPage: React.FC<TNoFoundPageProps> = ({ subTitle }) => (
  <Result
    status="404"
    title="404"
    subTitle={subTitle}
    extra={
      <Button type="primary" onClick={() => history.back()}>
        <FormattedHTMLMessage id="common.navigate.back" defaultMessage="Go back" />
      </Button>
    }
  />
);

export default NoFoundPage;

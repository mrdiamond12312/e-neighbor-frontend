import { FormattedHTMLMessage, useModel } from '@umijs/max';
import { Col, Flex, Row } from 'antd/lib';
import React from 'react';

import { COMMON_INFO_FIELDS } from '@/pages/user/profile/components/CommonInfo/helpers/common-info-fields';

export const CommonInfo = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <Flex className="flex-col gap-4">
      <section className="text-heading-3 text-neutral-8 pl-4">
        <FormattedHTMLMessage id="user.basic.info.header" defaultMessage="Basic Information" />
      </section>
      <Row className="gap-y-2 bg-neutral-1 rounded-lg p-4">
        {COMMON_INFO_FIELDS.map((key) => (
          <Col
            key={'basic-info' + key}
            className="flex-col text-body-1-semibold"
            span={24}
            md={12}
            lg={8}
          >
            <FormattedHTMLMessage
              id={['user.edit.form', key, 'label'].join('.')}
              defaultMessage={['user.edit.form', key, 'label'].join('.')}
            />
            <div className="text-body-1-regular">
              {currentUser?.[key as keyof API.TAuthProfile]}
            </div>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

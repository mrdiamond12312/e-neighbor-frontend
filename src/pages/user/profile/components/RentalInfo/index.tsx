import { FormattedHTMLMessage, useModel } from '@umijs/max';
import { Col, Flex, Row } from 'antd/lib';
import React from 'react';

import { RENTAL_INFO_FIELDS } from '@/pages/user/profile/components/RentalInfo/helpers/rental-info-fields';

export const RentalInfo: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <Flex className="flex-col gap-4">
      <section className="text-heading-3 text-neutral-8 pl-4">
        <FormattedHTMLMessage id="user.rental.info.header" defaultMessage="Rental Information" />
      </section>
      <Row className="gap-y-2 bg-neutral-1 rounded-lg p-4">
        {RENTAL_INFO_FIELDS.map((key) => (
          <Col
            key={'rental-info' + key}
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

import { FormattedHTMLMessage } from '@umijs/max';
import { Col, Row } from 'antd/lib';
import React from 'react';

import { IPaymentInfos } from '../../interfaces/paymentInfo';

export type TPaymentInfoProps = {
  data?: IPaymentInfos;
};

export const PaymentInfo: React.FC<TPaymentInfoProps> = ({ data }) => {
  return (
    <div className="w-full">
      <Row key='thankYou.billingInfo.orderId' gutter={16}>
        <Col span={12} className=" font-sans text-right text-heading-5 font-light">
          <FormattedHTMLMessage
            id='thankYou.billingInfo.orderId'
            defaultMessage='Order number:'
          />
        </Col>
        <Col span={12}>
          <p className="text-heading-5 font-normal">{data?.vnpTxnRef}</p>
        </Col>
      </Row>
      <Row key='thankYou.billingInfo.amount' gutter={16}>
        <Col span={12} className=" font-sans text-right text-heading-5 font-light">
          <FormattedHTMLMessage
            id='thankYou.billingInfo.amount'
            defaultMessage='Amount:'
          />
        </Col>
        <Col span={12}>
          <p className="text-heading-5 font-normal">{data?.vnpAmount}</p>
        </Col>
      </Row>
      <Row key='thankYou.billingInfo.bankCode' gutter={16}>
        <Col span={12} className=" font-sans text-right text-heading-5 font-light">
          <FormattedHTMLMessage
            id='thankYou.billingInfo.bankCode'
            defaultMessage='Bank code:'
          />
        </Col>
        <Col span={12}>
          <p className="text-heading-5 font-normal">{data?.vnpBankCode}</p>
        </Col>
      </Row>
      <Row key='thankYou.billingInfo.content' gutter={16}>
        <Col span={12} className=" font-sans text-right text-heading-5 font-light">
          <FormattedHTMLMessage
            id='thankYou.billingInfo.content'
            defaultMessage='Content:'
          />
        </Col>
        <Col span={12}>
          <p className="text-heading-5 font-normal">{data?.vnpOrderInfo}</p>
        </Col>
      </Row>
    </div>);
};

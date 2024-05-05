import { FormattedHTMLMessage } from '@umijs/max';
import { Col, Row } from 'antd/lib';
import React from 'react';

import { PAYMENT_INFO_FIELD } from '@/const/payment-info';
import { TPaymentInfos } from '@/pages/user/payment-thank-you/hooks/usePaymentPage';

export type TPaymentInfoProps = {
  data: TPaymentInfos;
};

export const PaymentInfo: React.FC<TPaymentInfoProps> = ({ data }) => {
  return (
    <div className="w-full">
      <Row key="thankYou.billingInfo.orderId" gutter={16}>
        <Col span={12} className=" font-sans text-right text-body-1-semibold font-light">
          <FormattedHTMLMessage id="thankYou.billingInfo.orderId" defaultMessage="Order number:" />
        </Col>
        <Col span={12}>
          <p className="text-body-1-semibold font-normal">{data[PAYMENT_INFO_FIELD.vnpTxnRef]}</p>
        </Col>
      </Row>
      <Row key="thankYou.billingInfo.amount" gutter={16}>
        <Col span={12} className=" font-sans text-right text-body-1-semibold font-light">
          <FormattedHTMLMessage id="thankYou.billingInfo.amount" defaultMessage="Amount:" />
        </Col>
        <Col span={12}>
          <p className="text-body-1-semibold font-normal">{data[PAYMENT_INFO_FIELD.vnpAmount]}</p>
        </Col>
      </Row>
      <Row key="thankYou.billingInfo.bankCode" gutter={16}>
        <Col span={12} className=" font-sans text-right text-body-1-semibold font-light">
          <FormattedHTMLMessage id="thankYou.billingInfo.bankCode" defaultMessage="Bank code:" />
        </Col>
        <Col span={12}>
          <p className="text-body-1-semibold font-normal">{data[PAYMENT_INFO_FIELD.vnpBankCode]}</p>
        </Col>
      </Row>
      <Row key="thankYou.billingInfo.content" gutter={16}>
        <Col span={12} className=" font-sans text-right text-body-1-semibold font-light">
          <FormattedHTMLMessage id="thankYou.billingInfo.content" defaultMessage="Content:" />
        </Col>
        <Col span={12}>
          <p className="text-body-1-semibold font-normal">
            {Number(data[PAYMENT_INFO_FIELD.vnpOrderInfo]) / 100}
          </p>
        </Col>
      </Row>
    </div>
  );
};

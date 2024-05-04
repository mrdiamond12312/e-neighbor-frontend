import { PageContainer } from '@ant-design/pro-components';
import { FormattedHTMLMessage, Link, useLocation } from '@umijs/max';
import React from 'react';
import urlcat from 'urlcat';

import Button from '../../components/Button';
import { PATH_USER_PROFILE_ORDER_DETAILS } from '../../const/path';
import { PAYMENT_INFO_FIELD } from '../../const/payment-info';

import { ThankYouIcon } from './components/CheckIcon';
import { PaymentInfo } from './components/PaymentInfo';
import { IPaymentInfos } from './interfaces/paymentInfo';

import ContactInfo from '@/layouts/ContactInfo';

const ThankYou: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentInfo: IPaymentInfos = {
    vnpAmount: queryParams.get(PAYMENT_INFO_FIELD.vnpAmount),
    vnpBankCode: queryParams.get(PAYMENT_INFO_FIELD.vnpBankCode),
    vnpBankTranNo: queryParams.get(PAYMENT_INFO_FIELD.vnpBankTranNo),
    vnpCardType: queryParams.get(PAYMENT_INFO_FIELD.vnpCardType),
    vnpOrderInfo: queryParams.get(PAYMENT_INFO_FIELD.vnpOrderInfo),
    vnpPayDate: queryParams.get(PAYMENT_INFO_FIELD.vnpPayDate),
    vnpResponseCode: queryParams.get(PAYMENT_INFO_FIELD.vnpResponseCode),
    vnpTmnCode: queryParams.get(PAYMENT_INFO_FIELD.vnpTmnCode),
    vnpTransactionNo: queryParams.get(PAYMENT_INFO_FIELD.vnpTransactionNo),
    vnpTransactionStatus: queryParams.get(PAYMENT_INFO_FIELD.vnpTransactionStatus),
    vnpTxnRef: queryParams.get(PAYMENT_INFO_FIELD.vnpTxnRef),
    vnpSecureHash: queryParams.get(PAYMENT_INFO_FIELD.vnpSecureHash),
  };
  return (
    <ContactInfo>
      <PageContainer
        className="max-h-[calc(100vh-56px)] xl:max-h-[calc(100vh-112px)] overflow-auto p-4 flex-col gap-4 snap-mandatory snap-y snap-page-container"
        header={{ title: '1' }}
      >
        <ThankYouIcon />
        <h2 className="text-heading-1 text-teal-5">
          <FormattedHTMLMessage
            id="thankYou.title"
            defaultMessage="Thank you!"
          />
        </h2>
        <p className="text-heading-4 neutral-1">
          <FormattedHTMLMessage
            id="thankYou.content"
            defaultMessage="You have successfully paid for your order. This is your payment information"
          />
        </p>
        <PaymentInfo data={paymentInfo}/>
        <Link to={urlcat(PATH_USER_PROFILE_ORDER_DETAILS, {orderId: paymentInfo.vnpTxnRef})}>
          <Button type="primary" btnSize="large" className="text-heading-5">
            <FormattedHTMLMessage id="thankYou.button.content" defaultMessage="View order detail" />
          </Button>{' '}
        </Link>
      </PageContainer>
    </ContactInfo>
  );
};

export default ThankYou;

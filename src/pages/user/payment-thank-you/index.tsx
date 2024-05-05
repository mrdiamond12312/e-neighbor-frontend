import { HandCoins, MagnifyingGlass } from '@phosphor-icons/react';
import { FormattedHTMLMessage, Link } from '@umijs/max';
import { Divider, Flex, Modal } from 'antd/lib';
import React from 'react';
import urlcat from 'urlcat';

import Button from '@/components/Button';
import { PATH_USER_PROFILE_ORDER_DETAILS } from '@/const/path';
import { PAYMENT_INFO_FIELD } from '@/const/payment-info';
import { PaymentInfo } from '@/pages/user/payment-thank-you/components/PaymentInfo';
import { usePaymentPage } from '@/pages/user/payment-thank-you/hooks/usePaymentPage';

/**
 * Please check other implemented Modal for more info (@/pages/lessor or @/pages/user)
 */
const ThankYouModal: React.FC = () => {
  const { isOpen, setIsOpen, handleCancel, paymentInfo } = usePaymentPage();
  return (
    <Modal
      open={isOpen}
      destroyOnClose
      onCancel={() => setIsOpen(false)}
      afterClose={handleCancel}
      footer={
        <Flex className="w-full justify-end pt-3 border-t border-teal-1">
          <Link
            to={urlcat(PATH_USER_PROFILE_ORDER_DETAILS, {
              orderId: paymentInfo[PAYMENT_INFO_FIELD.vnpTxnRef],
            })}
            className="w-fit flex"
          >
            <Button
              type="primary"
              className="flex flex-row items-center w-fit"
              icon={<MagnifyingGlass className="text-body-1-semibold" />}
            >
              <FormattedHTMLMessage
                id="thankYou.button.content"
                defaultMessage="View order detail"
              />
            </Button>{' '}
          </Link>
        </Flex>
      }
      title={
        <h1 className="font-sans text-heading-5 text-teal-5">
          <FormattedHTMLMessage id="thankYou.heading" defaultMessage="Thank you for renting!" />
        </h1>
      }
    >
      <Flex className="flex flex-col items-center">
        <HandCoins size={72} className="fill-teal-1" weight="duotone" />
        <p className="text-heading-5 text-neutral-10 text-center">
          <FormattedHTMLMessage id="thankYou.content" defaultMessage="Payment Successfully!" />
        </p>
        <Divider className="my-3 font-sans">
          <FormattedHTMLMessage id="thankYou.divider.content" defaultMessage="Payment Details" />
        </Divider>
        <PaymentInfo data={paymentInfo} />
      </Flex>
    </Modal>
  );
};

export default ThankYouModal;

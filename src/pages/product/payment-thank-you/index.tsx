import { FormattedHTMLMessage } from '@umijs/max';
import { Modal } from 'antd/lib';
import React from 'react';

import { usePaymentPage } from '@/pages/product/payment-thank-you/hooks/usePaymentPage';

/**
 * Please check other implemented Modal for more info (@/pages/lessor or @/pages/user)
 */
const ThankYouModal: React.FC = () => {
  const { isOpen, setIsOpen, handleCancel } = usePaymentPage();
  return (
    <Modal
      open={isOpen}
      destroyOnClose
      onCancel={() => setIsOpen(false)}
      afterClose={handleCancel}
      // Remove footer, or anything that needed to render
      footer={null}
      // Add Title for this Modal page
      title={
        <h1 className="font-sans text-heading-5 text-teal-5">
          <FormattedHTMLMessage
            id="product.details.paymentPage.title"
            defaultMessage="Thank you for renting!"
          />
        </h1>
      }
    >
      $$ Other contents go here
    </Modal>
  );
};

export default ThankYouModal;

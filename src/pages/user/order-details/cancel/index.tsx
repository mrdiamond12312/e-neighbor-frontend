import { CloseCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Modal } from 'antd/lib';
import React from 'react';

import Button from '@/components/Button';
import { useCancel } from '@/pages/user/order-details/cancel/hooks/useCancel';

const CancelModal: React.FC = () => {
  const { orderId, isOpen, setIsOpen, handleCancel, isLoading, afterClose } = useCancel();

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      afterClose={afterClose}
      title={
        <h1 className="text-heading-4 font-sans">
          <FormattedHTMLMessage
            id="user.orders.cancel.header"
            defaultMessage="Canceling Order #{orderId}"
            values={{ orderId }}
          />
        </h1>
      }
      footer={
        <Flex className="flex-row gap-2 border-t pt-3 border-error-4 justify-end">
          <Button
            type="primary"
            loading={isLoading}
            isDanger
            danger
            className="!text-neutral-1"
            icon={<CloseCircleOutlined />}
            onClick={handleCancel}
          >
            <FormattedHTMLMessage
              id="user.order.cancel.button.submit"
              defaultMessage="Cancel this Order"
            />
          </Button>
        </Flex>
      }
      className="font-sans text-body-2-medium"
    >
      <FormattedHTMLMessage
        id="user.orders.cancel.check.question"
        defaultMessage="Are you sure to cancel this order?"
      />
    </Modal>
  );
};

export default CancelModal;

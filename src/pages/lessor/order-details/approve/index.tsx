import { CheckCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Modal } from 'antd/lib';
import React from 'react';

import Button from '@/components/Button';
import { useApprove } from '@/pages/lessor/order-details/approve/hooks/useApprove';

const ApproveModal: React.FC = () => {
  const { orderId, isOpen, setIsOpen, handleApprove, isLoading, afterClose } = useApprove();
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      afterClose={afterClose}
      title={
        <h1 className="text-heading-4 font-sans">
          <FormattedHTMLMessage
            id="lessor.orders.approve.header"
            defaultMessage="Approving Order #{orderId}"
            values={{ orderId }}
          />
        </h1>
      }
      footer={
        <Flex className="flex-row gap-2 border-t pt-3 border-teal-7 justify-end">
          <Button
            type="primary"
            loading={isLoading}
            icon={<CheckCircleOutlined />}
            onClick={handleApprove}
          >
            <FormattedHTMLMessage
              id="lessor.order.detail.modal.button.approve"
              defaultMessage="Approve this Order"
            />
          </Button>
        </Flex>
      }
      className="font-sans text-body-2-medium"
    >
      <FormattedHTMLMessage
        id="lessor.orders.approve.check.question"
        defaultMessage="Are you sure to accept this order for delivery?"
      />
    </Modal>
  );
};

export default ApproveModal;

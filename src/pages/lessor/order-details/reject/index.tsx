import { CloseCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Form, Modal } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import Button from '@/components/Button';
import InputText from '@/components/Input';
import { REJECT_REASON_KEY, useReject } from '@/pages/lessor/order-details/reject/hooks/useReject';

const { Item } = Form;

const RejectModal: React.FC = () => {
  const { orderId, isOpen, setIsOpen, handleReject, isLoading, afterClose, control, getValues } =
    useReject();

  const size: SizeType = 'large';

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      afterClose={afterClose}
      title={
        <h1 className="text-heading-4 font-sans">
          <FormattedHTMLMessage
            id="lessor.orders.reject.header"
            defaultMessage="Rejecting Order #{orderId}"
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
            onClick={() => handleReject(getValues())}
          >
            <FormattedHTMLMessage
              id="lessor.order.reject.button.submit"
              defaultMessage="Reject this Order"
            />
          </Button>
        </Flex>
      }
      className="font-sans text-body-2-medium"
    >
      <FormattedHTMLMessage
        id="lessor.orders.reject.check.question"
        defaultMessage="Are you sure to reject this order?"
      />
      <Form
        layout="horizontal"
        rootClassName="custom-antd-form-small pt-6"
        labelCol={{ span: 24, lg: 8 }}
        wrapperCol={{ span: 24, lg: 16 }}
      >
        <Item
          label={
            <FormattedHTMLMessage
              id="lessor.orders.reject.fields.rejectReason.label"
              defaultMessage="Reject Reason"
            />
          }
          required
        >
          <InputText
            placeholder="abcxyz"
            placement="top"
            control={control}
            name={REJECT_REASON_KEY['rejectReason']}
            size={size}
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default RejectModal;

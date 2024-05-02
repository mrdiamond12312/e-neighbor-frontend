import { CheckCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Form, Modal } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import Button from '@/components/Button';
import InputText from '@/components/Input';
import { ImageDragger } from '@/components/Input/ImageDragger';
import Radio from '@/components/Input/Radio';
import { RECEIPT_FORM_KEY, useReceipt } from '@/pages/user/order-details/receipt/hooks/useReceipt';

const { Item } = Form;

const ReceiptModal: React.FC = () => {
  const {
    orderId,
    isOpen,
    setIsOpen,
    handleReceipt,
    isLoading,
    afterClose,
    punctualityOptions,
    control,
    getValues,
  } = useReceipt();
  const size: SizeType = 'large';

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      afterClose={afterClose}
      title={
        <h1 className="text-heading-4 font-sans">
          <FormattedHTMLMessage
            id="user.orders.receipt.header"
            defaultMessage="Adding a Receipt Image for Order #{orderId}"
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
            onClick={() => handleReceipt(getValues())}
          >
            <FormattedHTMLMessage
              id="user.order.receipt.button.submit"
              defaultMessage="Upload Receipt"
            />
          </Button>
        </Flex>
      }
      className="font-sans text-body-2-medium"
    >
      <FormattedHTMLMessage
        id="user.order.receipt.check.question"
        defaultMessage="Please upload a image of receipt to let us know that the property is delivered to you safely"
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
              id="user.orders.receipt.fields.isDeliveredOnTime.label"
              defaultMessage="Delivery Punctuality"
            />
          }
          required
        >
          <Radio
            control={control}
            name={RECEIPT_FORM_KEY['isDeliveredOnTime']}
            size={size}
            direction="horizontal"
            options={punctualityOptions}
            className="custom-radio"
          />
        </Item>

        <Item
          label={
            <FormattedHTMLMessage
              id="user.orders.receipt.fields.conditionUponReceipt.label"
              defaultMessage="Condition of Property"
            />
          }
          required
        >
          <InputText
            placeholder="abcxyz"
            placement="top"
            control={control}
            name={RECEIPT_FORM_KEY['conditionUponReceipt']}
            size={size}
          />
        </Item>
        <Item
          label={
            <FormattedHTMLMessage
              id="user.orders.receipt.fields.imagesUponReceipt.label"
              defaultMessage="Image of Receipt"
            />
          }
          required
        >
          <ImageDragger
            control={control}
            name={RECEIPT_FORM_KEY['imagesUponReceipt']}
            maxCount={1}
            className="custom-ant-upload"
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default ReceiptModal;

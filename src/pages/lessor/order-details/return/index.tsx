import { CheckCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Form, Modal } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import Button from '@/components/Button';
import InputText from '@/components/Input';
import { ImageDragger } from '@/components/Input/ImageDragger';
import Radio from '@/components/Input/Radio';
import { RETURN_FORM_KEY, useReturn } from '@/pages/lessor/order-details/return/hooks/useReturn';

const { Item } = Form;

const ReceiptModal: React.FC = () => {
  const {
    orderId,
    isOpen,
    setIsOpen,
    handleReturn,
    isLoading,
    afterClose,
    punctualityOptions,
    control,
    getValues,
  } = useReturn();
  const size: SizeType = 'large';

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      afterClose={afterClose}
      title={
        <h1 className="text-heading-4 font-sans">
          <FormattedHTMLMessage
            id="lessor.orders.return.header"
            defaultMessage="Adding Return Information to finish Order #{orderId}"
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
            onClick={() => handleReturn(getValues())}
          >
            <FormattedHTMLMessage
              id="lessor.order.return.button.submit"
              defaultMessage="Finish this Order!"
            />
          </Button>
        </Flex>
      }
      className="font-sans text-body-2-medium"
    >
      <FormattedHTMLMessage
        id="lessor.order.return.check.question"
        defaultMessage="Please provide us about the property condition after rental period"
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
              id="lessor.orders.return.fields.isReturnedOnTime.label"
              defaultMessage="Returning Punctuality"
            />
          }
          required
        >
          <Radio
            control={control}
            name={RETURN_FORM_KEY['isReturnedOnTime']}
            size={size}
            direction="horizontal"
            options={punctualityOptions}
            className="custom-radio"
          />
        </Item>

        <Item
          label={
            <FormattedHTMLMessage
              id="lessor.orders.return.fields.conditionUponReturn.label"
              defaultMessage="Condition of Property"
            />
          }
          required
        >
          <InputText
            placeholder="abcxyz"
            placement="top"
            control={control}
            name={RETURN_FORM_KEY['conditionUponReturn']}
            size={size}
          />
        </Item>
        <Item
          label={
            <FormattedHTMLMessage
              id="lessor.orders.return.fields.imagesUponReturn.label"
              defaultMessage="Image of Property"
            />
          }
          required
        >
          <ImageDragger
            control={control}
            name={RETURN_FORM_KEY['imagesUponReturn']}
            maxCount={1}
            className="custom-ant-upload"
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default ReceiptModal;

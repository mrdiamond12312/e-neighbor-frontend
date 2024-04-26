import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Divider, Form, Image, Modal, Row } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import Button from '@/components/Button';
import InputText from '@/components/Input';
import RangePicker from '@/components/Input/RangePicker';
import { RENTAL_INFO_KEYS } from '@/pages/product/renting/helpers/rentFormKeys';
import { useRentForm } from '@/pages/product/renting/hooks/useRentForm';
import { PAYMENT_GATEWAY } from '@/pages/product/renting/hooks/useRentFormResolver';

const { Item } = Form;

const RentProduct: React.FC = () => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const {
    control,
    isOpen,
    handleCancel,
    setIsOpen,
    disabledDate,
    handleSubmit,
    getValues,
    isLoading,
  } = useRentForm();
  const size: SizeType = 'large';

  return (
    <Modal
      open={isOpen}
      destroyOnClose
      footer={() => (
        <Row className="flex flex-row justify-end">
          <Divider>
            <FormattedHTMLMessage
              id="product.rent.divider"
              defaultMessage="CHOOSE A PAYMENT METHOD"
            />
          </Divider>
          <Button
            type="primary"
            size={size}
            loading={isLoading}
            className="w-full h-12 flex flex-row items-center justify-center bg-indigo-500"
            icon={
              <Image preview={false} src="/payment-gateway/vnpay.png" rootClassName="w-8 h-8" />
            }
            onClick={() => handleSubmit(getValues())}
          >
            <FormattedHTMLMessage
              id="product.rent.gateway"
              values={{ gateway: PAYMENT_GATEWAY.VNPAY }}
              defaultMessage="Use <span class='text-body-2-semibold uppercase'>{gateway}</span> Payment Gateway"
            />
          </Button>
        </Row>
      )}
      afterClose={handleCancel}
      onCancel={() => setIsOpen(false)}
      className="w-full"
    >
      <Form
        layout="horizontal"
        rootClassName="custom-antd-form-small"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <h1 className="text-heading-3">
          <FormattedHTMLMessage
            id="product.rent.information.header"
            defaultMessage="Rent this Product"
          />
        </h1>
        <span className="text-body-1-regular">
          <FormattedHTMLMessage
            id="product.rent.information.header"
            defaultMessage="Some extra information are needed to rent this product"
          />
        </span>
        <Divider className="hidden md:block" />

        <Item
          label={formatMessage({
            id: 'product.renting.form.deliveryAddress.label',
            defaultMessage: 'Delivery Address',
          })}
          required
        >
          <InputText
            placeholder="abcxyz"
            placement="top"
            control={control}
            name={RENTAL_INFO_KEYS.deliveryAddress}
            size={size}
          />
        </Item>
        <Item
          label={formatMessage({
            id: 'product.renting.form.rentalTimes.label',
            defaultMessage: 'Renting Dates',
          })}
          labelAlign="right"
          required
        >
          <RangePicker
            control={control}
            disabledDate={disabledDate}
            name={RENTAL_INFO_KEYS.dateRange}
            size={'large' as any}
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default RentProduct;

import InputText from '@/components/Input';
import { PRICING_FILTER } from '@/const/store.filter';
import { useIntl } from '@umijs/max';
import { Form } from 'antd';
import React from 'react';

const { Item } = Form;

const Pricing: React.FC<Partial<TPropsFormInput>> = ({ control, errors }) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  return (
    <Form layout="vertical" rootClassName="custom-ant-form-small" form={form}>
      <Item
        label={formatMessage({
          id: 'store.pricing.min.title',
          defaultMessage: 'Minimum Price',
        })}
      >
        <InputText
          placeholder="0"
          placement="top"
          control={control}
          error={errors}
          name={PRICING_FILTER['min']}
          size="large"
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'store.pricing.max.title',
          defaultMessage: 'Maximum Price',
        })}
      >
        <InputText
          placeholder="9999999"
          placement="top"
          control={control}
          error={errors}
          name={PRICING_FILTER['max']}
          size="large"
        />
      </Item>
    </Form>
  );
};

export default Pricing;

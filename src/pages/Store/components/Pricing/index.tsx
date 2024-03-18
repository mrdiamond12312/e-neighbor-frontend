import { useIntl } from '@umijs/max';
import { Card, Form } from 'antd/lib';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import InputText from '@/components/Input';
import { STORE_FILTER } from '@/const/store.filter';

const { Item } = Form;

const Pricing: React.FC<Partial<TPropsFormInput>> = ({ control, errors }) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  return (
    <FadeIn direction="left" className="w-full" index={4}>
      <Card
        title={formatMessage({
          id: 'store.pricing.title',
          defaultMessage: 'Rental Price',
        })}
        className="railing-card"
      >
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
              name={STORE_FILTER['min']}
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
              name={STORE_FILTER['max']}
              size="large"
            />
          </Item>
        </Form>
      </Card>
    </FadeIn>
  );
};

export default Pricing;

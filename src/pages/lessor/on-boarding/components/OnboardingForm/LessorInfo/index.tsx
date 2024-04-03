import { useIntl } from '@umijs/max';
import { Form } from 'antd/lib';
import React from 'react';

import InputText from '@/components/Input';
import { ONBOARDING_FORM_KEY } from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';

const { Item } = Form;

export const LessorInfo: React.FC<Partial<TPropsFormInput>> = ({ control, errors }) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  return (
    <Form
      layout="horizontal"
      rootClassName="custom-antd-form-small"
      form={form}
      labelCol={{ span: 24, lg: 6 }}
      wrapperCol={{ span: 24, lg: 18 }}
    >
      <Item
        label={formatMessage({
          id: 'onboarding.form.wareHouse.label',
          defaultMessage: 'Warehouse Address',
        })}
        required
      >
        <InputText
          placeholder="abcxyz"
          placement="top"
          control={control}
          error={errors}
          name={ONBOARDING_FORM_KEY['wareHouseAddress']}
          size="large"
        />
      </Item>

      <Item
        label={formatMessage({
          id: 'onboarding.form.shopName.label',
          defaultMessage: 'Rental Shop Name',
        })}
        required
      >
        <InputText
          placeholder="abcxyz"
          placement="top"
          control={control}
          error={errors}
          name={ONBOARDING_FORM_KEY['shopName']}
          size="large"
        />
      </Item>
    </Form>
  );
};

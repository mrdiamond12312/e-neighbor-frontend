import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Divider, Form } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import InputText from '@/components/Input';
import TextArea from '@/components/Input/TextArea';
import { ONBOARDING_FORM_KEY } from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';

const { Item } = Form;

export const LessorInfo: React.FC<Partial<TPropsFormInput>> = ({ control, errors }) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const size: SizeType = 'large';

  return (
    <Form
      layout="horizontal"
      rootClassName="custom-antd-form-small"
      form={form}
      labelCol={{ span: 24, lg: 6 }}
      wrapperCol={{ span: 24, lg: 18 }}
    >
      <h1 className="text-heading-3">
        <FormattedHTMLMessage
          id="lessor.onboarding.step.lessorInfo.header"
          defaultMessage="Lessor Information"
        />
      </h1>
      <span className="text-body-1-regular">
        <FormattedHTMLMessage
          id="lessor.onboarding.step.lessorInfo.description"
          defaultMessage="Adding some extra information for your rental booth. Increase your booth's vision with a clear and engaging description."
        />
      </span>
      <Divider className="hidden md:block" />

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
          size={size}
        />
      </Item>

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
          size={size}
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'onboarding.form.description.label',
          defaultMessage: 'Rental Description',
        })}
        required
      >
        <TextArea
          placeholder="abcxyz"
          placement="top"
          control={control}
          error={errors}
          autoSize={{ minRows: 2, maxRows: 6 }}
          name={ONBOARDING_FORM_KEY['description']}
          size={size}
        />
      </Item>
    </Form>
  );
};

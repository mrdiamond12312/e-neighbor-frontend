import { useIntl } from '@umijs/max';
import { Col, Form, Row } from 'antd/lib';
import React from 'react';

import InputText from '@/components/Input';
import DatePicker from '@/components/Input/DatePicker';
import { ONBOARDING_FORM_KEY } from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';

const { Item } = Form;

export const UserInfo: React.FC<Partial<TPropsFormInput>> = ({ control, errors }) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  return (
    <Form layout="vertical" rootClassName="custom-ant-form" form={form}>
      <Row gutter={24}>
        <Col span={12}>
          <Item
            label={formatMessage({
              id: 'onboarding.form.fullName.label',
              defaultMessage: 'Fullname',
            })}
          >
            <InputText
              placeholder="abcxyz"
              placement="top"
              control={control}
              error={errors}
              name={ONBOARDING_FORM_KEY['fullName']}
              size="large"
            />
          </Item>
          <Item
            label={formatMessage({
              id: 'onboarding.form.email.label',
              defaultMessage: 'Email',
            })}
          >
            <InputText
              placeholder="abcxyz"
              placement="top"
              control={control}
              error={errors}
              name={ONBOARDING_FORM_KEY['email']}
              size="large"
            />
          </Item>
          <Item
            label={formatMessage({
              id: 'onboarding.form.phoneNumber.label',
              defaultMessage: 'Phone Number',
            })}
          >
            <InputText
              placeholder="abcxyz"
              placement="top"
              control={control}
              error={errors}
              name={ONBOARDING_FORM_KEY['phoneNumber']}
              size="large"
            />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            label={formatMessage({
              id: 'onboarding.form.citizenId.label',
              defaultMessage: 'Citizen ID',
            })}
          >
            <InputText
              placeholder="abcxyz"
              placement="top"
              control={control}
              error={errors}
              name={ONBOARDING_FORM_KEY['citizenId']}
              size="large"
            />
          </Item>
          <Item
            label={formatMessage({
              id: 'onboarding.form.dob.label',
              defaultMessage: 'Date of Birth',
            })}
          >
            <DatePicker
              placeholder="abcxyz"
              placement="top"
              control={control}
              error={errors}
              name={ONBOARDING_FORM_KEY['dob']}
              size="large"
            />
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

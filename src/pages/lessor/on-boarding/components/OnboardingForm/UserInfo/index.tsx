import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Divider, Form } from 'antd/lib';
import ImgCrop from 'antd-img-crop';
import React from 'react';

import InputText from '@/components/Input';
import DatePicker from '@/components/Input/DatePicker';
import { ImageDragger } from '@/components/Input/ImageDragger';
import { ONBOARDING_FORM_KEY } from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';

const { Item } = Form;

export const UserInfo: React.FC<Partial<TPropsFormInput>> = ({ control, errors }) => {
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
      <h1 className="text-heading-3">
        <FormattedHTMLMessage
          id="lessor.onboarding.step.userInfo.header"
          defaultMessage="User Information"
        />
      </h1>
      <span className="text-body-1-regular">
        <FormattedHTMLMessage
          id="lessor.onboarding.step.userInfo.description"
          defaultMessage="It's recommended that you verify your account details and update them if required."
        />
      </span>
      <Divider className="hidden md:block" />
      <Item
        label={formatMessage({
          id: 'onboarding.form.fullName.label',
          defaultMessage: 'Fullname',
        })}
        required
      >
        <InputText
          placeholder={formatMessage({
            id: 'onboarding.form.fullName.label',
            defaultMessage: 'Fullname',
          })}
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
        required
      >
        <InputText
          placeholder="someone@mail.to"
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
        required
      >
        <InputText
          placeholder="+84 xxxx xxx xxx"
          placement="top"
          control={control}
          error={errors}
          name={ONBOARDING_FORM_KEY['phoneNumber']}
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
      <Item
        label={formatMessage({
          id: 'onboarding.form.avatar.label',
          defaultMessage: 'Avatar',
        })}
        required
      >
        <ImgCrop aspect={1} rotationSlider>
          <ImageDragger
            className="custom-ant-upload"
            control={control}
            name={ONBOARDING_FORM_KEY['avatar']}
            maxCount={1}
          />
        </ImgCrop>
      </Item>
      <Item
        label={formatMessage({
          id: 'onboarding.form.address.label',
          defaultMessage: 'Address',
        })}
        required
      >
        <InputText
          placeholder={formatMessage({
            id: 'onboarding.form.address.label',
            defaultMessage: 'Address',
          })}
          placement="top"
          control={control}
          error={errors}
          name={ONBOARDING_FORM_KEY['address']}
          size="large"
        />
      </Item>
    </Form>
  );
};

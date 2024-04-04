import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Divider, Form } from 'antd/lib';
import ImgCrop from 'antd-img-crop';
import React from 'react';

import InputText from '@/components/Input';
import { ImageDragger } from '@/components/Input/ImageDragger';
import { ONBOARDING_FORM_KEY } from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';
const { Item } = Form;

export const IdentityInfo: React.FC<Partial<TPropsFormInput>> = ({ control, errors }) => {
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
          id="lessor.onboarding.step.identity.header"
          defaultMessage="Identity Information"
        />
      </h1>
      <span className="text-body-1-regular">
        <FormattedHTMLMessage
          id="lessor.onboarding.step.identity.description"
          defaultMessage="Adding legal information helps securing and verifying your lessor account."
        />
      </span>
      <Divider className="hidden md:block" />

      <Item
        label={formatMessage({
          id: 'onboarding.form.citizenId.label',
          defaultMessage: 'Citizen ID',
        })}
        required
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
          id: 'onboarding.form.citizenCardFront.label',
          defaultMessage: 'CIC Front Image',
        })}
        required
      >
        <ImgCrop aspect={85.6 / 53.98} rotationSlider>
          <ImageDragger
            className="custom-ant-upload"
            control={control}
            name={ONBOARDING_FORM_KEY['citizenCardFront']}
            maxCount={1}
          />
        </ImgCrop>
      </Item>
      <Item
        label={formatMessage({
          id: 'onboarding.form.citizenCardBack.label',
          defaultMessage: 'CIC Back Image',
        })}
        required
      >
        <ImgCrop aspect={85.6 / 53.98} rotationSlider>
          <ImageDragger
            className="custom-ant-upload"
            control={control}
            name={ONBOARDING_FORM_KEY['citizenCardBack']}
            maxCount={1}
          />
        </ImgCrop>
      </Item>
    </Form>
  );
};

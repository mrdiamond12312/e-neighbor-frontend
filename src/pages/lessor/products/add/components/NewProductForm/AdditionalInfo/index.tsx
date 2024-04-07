import { FormattedHTMLMessage } from '@umijs/max';
import { Divider, Form } from 'antd/lib';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import Button from '@/components/Button';
import InputText from '@/components/Input';
import DatePicker from '@/components/Input/DatePicker';
import { ImageDragger } from '@/components/Input/ImageDragger';
import Radio from '@/components/Input/Radio';
import TextArea from '@/components/Input/TextArea';
import { SurchargeInfo } from '@/pages/lessor/products/add/components/NewProductForm/AdditionalInfo/components/SurchargeInfo.tsx';
import { useAdditionalInfo } from '@/pages/lessor/products/add/components/NewProductForm/AdditionalInfo/hooks/useAdditionalInfo';
import {
  ADD_PRODUCT_FORM_KEY,
  INSURANCE_KEY,
} from '@/pages/lessor/products/add/helpers/addProductFormKeys';

const { Item } = Form;

export const AdditionalInfo: React.FC<Partial<TPropsFormInput>> = ({ control }) => {
  const [form] = Form.useForm();
  const {
    formatMessage,
    insuranceOptions,
    disabledInsuranceDetail,
    fields,
    handleNewField,
    handleRemoveField,
  } = useAdditionalInfo();
  return (
    <Form
      layout="horizontal"
      rootClassName="custom-antd-form-small"
      form={form}
      labelCol={{ span: 24, lg: 4 }}
      wrapperCol={{ span: 24, lg: 20 }}
      disabled={true}
    >
      <h1 className="text-heading-3">
        <FormattedHTMLMessage
          id="lessor.product.add.step.addtionalInfo.header"
          defaultMessage="Basic Information"
        />
      </h1>
      <span className="text-body-1-regular">
        <FormattedHTMLMessage
          id="lessor.product.add.step.addtionalInfo.description"
          defaultMessage="Provide Additional Information on insurance of this product and extra fees."
        />
      </span>
      <Divider />
      <Item
        label={formatMessage({
          id: 'add.product.form.surcharges.label',
          defaultMessage: 'Surcharge Fees',
        })}
      >
        {fields.map((field, index) => (
          <FadeIn
            direction="bottom"
            exitDirection="right"
            key={field.id}
            keyId={field.id}
            className="w-full items-center"
            mode="wait"
          >
            <SurchargeInfo
              control={control}
              handleRemoveField={() => handleRemoveField(index)}
              index={index}
            />
          </FadeIn>
        ))}
        <Button onClick={handleNewField} className="w-full">
          <FormattedHTMLMessage
            id="add.product.form.surcharges.add"
            defaultMessage="Add a Surcharge"
          ></FormattedHTMLMessage>
        </Button>
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.haveInsurance.label',
          defaultMessage: 'Insurance Info',
        })}
        required
      >
        <Radio
          control={control}
          name={ADD_PRODUCT_FORM_KEY['haveInsurance']}
          size="large"
          direction="horizontal"
          options={insuranceOptions}
          className="custom-radio"
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.insuranceDetail.label',
          defaultMessage: 'Insurance Details',
        })}
      >
        <Item
          label={formatMessage({
            id: 'add.product.form.insuranceDetail.holderName.label',
            defaultMessage: 'Insurance Holder',
          })}
          required={!disabledInsuranceDetail}
          labelCol={{ span: 24, lg: 4 }}
          wrapperCol={{ span: 24, lg: 20 }}
        >
          <InputText
            placeholder={formatMessage({
              id: 'add.product.form.insuranceDetail.holderName.label',
              defaultMessage: 'Insurance Holder',
            })}
            placement="top"
            control={control}
            name={[ADD_PRODUCT_FORM_KEY['name'], INSURANCE_KEY['holderName']].join('.')}
            size="large"
            disabled={disabledInsuranceDetail}
          />
        </Item>
        <Item
          label={formatMessage({
            id: 'add.product.form.insuranceDetail.images.label',
            defaultMessage: 'Insurance Images',
          })}
          required={!disabledInsuranceDetail}
          labelCol={{ span: 24, lg: 4 }}
          wrapperCol={{ span: 24, lg: 20 }}
        >
          <ImageDragger
            control={control}
            name={[ADD_PRODUCT_FORM_KEY['name'], INSURANCE_KEY['images']].join('.')}
            maxCount={2}
            className="custom-ant-upload"
            disabled={disabledInsuranceDetail}
          />
        </Item>
        <Item
          label={formatMessage({
            id: 'add.product.form.insuranceDetail.description.label',
            defaultMessage: 'Description',
          })}
          required={!disabledInsuranceDetail}
          labelCol={{ span: 24, lg: 4 }}
          wrapperCol={{ span: 24, lg: 20 }}
        >
          <TextArea
            placeholder={formatMessage({
              id: 'add.product.form.insuranceDetail.description.label',
              defaultMessage: 'Description',
            })}
            control={control}
            name={[ADD_PRODUCT_FORM_KEY['name'], INSURANCE_KEY['description']].join('.')}
            disabled={disabledInsuranceDetail}
          />
        </Item>
        <Item
          label={formatMessage({
            id: 'add.product.form.insuranceDetail.issueDate.label',
            defaultMessage: 'Issued Date',
          })}
          required={!disabledInsuranceDetail}
          labelCol={{ span: 24, lg: 4 }}
          wrapperCol={{ span: 24, lg: 20 }}
        >
          <DatePicker
            placeholder={formatMessage({
              id: 'add.product.form.insuranceDetail.issueDate.label',
              defaultMessage: 'Issued Date',
            })}
            size="large"
            control={control}
            name={[ADD_PRODUCT_FORM_KEY['name'], INSURANCE_KEY['issueDate']].join('.')}
            disabled={disabledInsuranceDetail}
          />
        </Item>
        <Item
          label={formatMessage({
            id: 'add.product.form.insuranceDetail.expiryDate.label',
            defaultMessage: 'Expiry Date',
          })}
          required={!disabledInsuranceDetail}
          labelCol={{ span: 24, lg: 4 }}
          wrapperCol={{ span: 24, lg: 20 }}
        >
          <DatePicker
            placeholder={formatMessage({
              id: 'add.product.form.insuranceDetail.expiryDate.label',
              defaultMessage: 'Expiry Date',
            })}
            size="large"
            control={control}
            name={[ADD_PRODUCT_FORM_KEY['name'], INSURANCE_KEY['expiryDate']].join('.')}
            disabled={disabledInsuranceDetail}
          />
        </Item>
      </Item>
    </Form>
  );
};

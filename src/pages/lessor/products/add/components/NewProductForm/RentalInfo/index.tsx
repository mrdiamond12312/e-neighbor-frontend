import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Divider, Form } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import InputText from '@/components/Input';
import Checkbox from '@/components/Input/Checkbox';
import Radio from '@/components/Input/Radio';
import { useRentalFieldForm } from '@/pages/lessor/products/add/components/NewProductForm/RentalInfo/hooks/useRentalFieldForm';
import { ADD_PRODUCT_FORM_KEY } from '@/pages/lessor/products/add/helpers/addProductFormKeys';

const { Item } = Form;

export const RentalInfo: React.FC<Partial<TPropsFormInput>> = ({ control }) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const { policyOptions, mortgageOptions, reqDocumentsOptions } = useRentalFieldForm();
  const size: SizeType = 'large';

  return (
    <Form
      layout="horizontal"
      rootClassName="custom-antd-form-small"
      form={form}
      labelCol={{ span: 24, lg: 4 }}
      wrapperCol={{ span: 24, lg: 20 }}
    >
      <h1 className="text-heading-3">
        <FormattedHTMLMessage
          id="lessor.product.add.step.rentalInfo.header"
          defaultMessage="Rental Information"
        />
      </h1>
      <span className="text-body-1-regular">
        <FormattedHTMLMessage
          id="lessor.product.add.step.basicInfo.description"
          defaultMessage="Provide rental info of this product which is the value of this product and other charges."
        />
      </span>
      <Divider />
      <Item
        label={formatMessage({
          id: 'add.product.form.value.label',
          defaultMessage: 'Product Value',
        })}
        required
      >
        <InputText
          placeholder={formatMessage({
            id: 'add.product.form.value.label',
            defaultMessage: 'Product Value',
          })}
          placement="top"
          control={control}
          name={ADD_PRODUCT_FORM_KEY['value']}
          size={size}
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.policies.label',
          defaultMessage: 'Rental Policies',
        })}
        required
      >
        <Checkbox
          control={control}
          name={ADD_PRODUCT_FORM_KEY['policies']}
          size={size}
          direction="vertical"
          options={policyOptions}
          className="custom-checkbox"
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.mortgage.label',
          defaultMessage: 'Rental Mortgages',
        })}
        required
      >
        <Radio
          control={control}
          name={ADD_PRODUCT_FORM_KEY['mortgage']}
          size={size}
          direction="vertical"
          options={mortgageOptions}
          className="custom-radio"
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.reqDocs.label',
          defaultMessage: 'Rental Documents',
        })}
        required
      >
        <Radio
          control={control}
          name={ADD_PRODUCT_FORM_KEY['requiredDocuments']}
          size={size}
          direction="vertical"
          options={reqDocumentsOptions}
          className="custom-radio"
        />
      </Item>
    </Form>
  );
};

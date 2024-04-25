import { FormattedHTMLMessage } from '@umijs/max';
import { Divider, Form } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import InputText from '@/components/Input';
import { ImageDragger } from '@/components/Input/ImageDragger';
import Select from '@/components/Input/Select';
import TextArea from '@/components/Input/TextArea';
import { useRentalTimeUnit } from '@/pages/lessor/products/add/components/NewProductForm/BasicInfo/hooks/useRentalTimeUnit';
import { ADD_PRODUCT_FORM_KEY } from '@/pages/lessor/products/add/helpers/addProductFormKeys';

const { Item } = Form;

export const BasicInfo: React.FC<Partial<TPropsFormInput>> = ({ control }) => {
  const [form] = Form.useForm();
  const { formatMessage, rentalTimeUnitOptions } = useRentalTimeUnit();
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
          id="lessor.product.add.step.basicInfo.header"
          defaultMessage="Basic Information"
        />
      </h1>
      <span className="text-body-1-regular">
        <FormattedHTMLMessage
          id="lessor.product.add.step.basicInfo.description"
          defaultMessage="Provide basic info of this product which will be displayed on this platform rental page."
        />
      </span>
      <Divider />

      <Item
        label={formatMessage({
          id: 'add.product.form.name.label',
          defaultMessage: 'Product Name',
        })}
        required
      >
        <InputText
          placeholder={formatMessage({
            id: 'add.product.form.name.label',
            defaultMessage: 'Product Name',
          })}
          placement="top"
          control={control}
          name={ADD_PRODUCT_FORM_KEY['name']}
          size={size}
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.images.label',
          defaultMessage: 'Product Images',
        })}
        required
      >
        <ImageDragger
          className="custom-ant-upload"
          control={control}
          name={ADD_PRODUCT_FORM_KEY['images']}
          maxCount={5}
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.description.label',
          defaultMessage: 'Product Description',
        })}
        required
      >
        <TextArea
          placeholder={formatMessage({
            id: 'add.product.form.description.label',
            defaultMessage: 'Product Description',
          })}
          control={control}
          autoSize={{ minRows: 2, maxRows: 6 }}
          name={ADD_PRODUCT_FORM_KEY['description']}
          size={size}
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.price.label',
          defaultMessage: 'Rental Price',
        })}
        required
      >
        <InputText
          placeholder={formatMessage({
            id: 'add.product.form.price.label',
            defaultMessage: 'Rental Price',
          })}
          placement="top"
          control={control}
          name={ADD_PRODUCT_FORM_KEY['price']}
          size={size}
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.timeUnit.label',
          defaultMessage: 'Rental Time Unit',
        })}
        required
      >
        <Select
          control={control}
          name={ADD_PRODUCT_FORM_KEY['timeUnit']}
          options={rentalTimeUnitOptions}
          size={size}
          rootClassName="custom-cascader-select"
        />
      </Item>
    </Form>
  );
};

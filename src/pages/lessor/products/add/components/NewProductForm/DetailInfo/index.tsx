import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Col, Divider, Empty, Form, Row, Spin } from 'antd/lib';
import React from 'react';

import InputText from '@/components/Input';
import Cascader from '@/components/Input/Cascader';
import { useCategoryCascader } from '@/pages/lessor/products/add/components/NewProductForm/DetailInfo/hooks/useCategoryCascader';
import { ADD_PRODUCT_FORM_KEY } from '@/pages/lessor/products/add/helpers/addProductFormKeys';

const { Item } = Form;

export type TAddProductDetailInfo = {
  categoryDetail: API.ICategoryDetails | undefined;
  isLoadingCategoryDetail: boolean;
} & Partial<TPropsFormInput>;

export const DetailInfo: React.FC<TAddProductDetailInfo> = ({
  control,
  isLoadingCategoryDetail,
  categoryDetail,
}) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const { options, loadCascadeMenuData } = useCategoryCascader();

  return (
    <Form
      layout="horizontal"
      rootClassName="custom-antd-form-small"
      form={form}
      labelCol={{ span: 24, lg: 3 }}
      wrapperCol={{ span: 24, lg: 21 }}
    >
      <h1 className="text-heading-3">
        <FormattedHTMLMessage
          id="lessor.product.add.step.basicInfo.header"
          defaultMessage="Detailed Information"
        />
      </h1>
      <span className="text-body-1-regular">
        <FormattedHTMLMessage
          id="lessor.product.add.step.basicInfo.description"
          defaultMessage="Let's dive deeper into the detailed information of this product"
        />
      </span>
      <Divider />

      <Item
        label={formatMessage({
          id: 'add.product.form.category.label',
          defaultMessage: 'Category',
        })}
        required
      >
        <Cascader
          className="custom-cascader-select"
          control={control}
          options={options}
          loadData={loadCascadeMenuData}
          name={ADD_PRODUCT_FORM_KEY['category']}
          size="large"
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'add.product.form.characteristics.label',
          defaultMessage: 'Characteristics',
        })}
        required
      >
        {isLoadingCategoryDetail ? (
          <Spin />
        ) : (
          <Row gutter={12} style={{ gap: '2px 0px' }}>
            {!categoryDetail ? (
              <Col span={24}>
                <Empty
                  description={
                    <span className="text-teal-7 font-sans">
                      <FormattedHTMLMessage
                        id="add.product.form.characteristics.empty"
                        defaultMessage="Characteristics is now empty, please choose a Category for your product to load!"
                      />
                    </span>
                  }
                />
              </Col>
            ) : (
              categoryDetail?.characteristics.map((key) => (
                <Col key={key} md={12} span={24}>
                  <Item
                    label={formatMessage({
                      id: key,
                      defaultMessage: key,
                    })}
                    labelCol={{ span: 24, lg: 8 }}
                    wrapperCol={{ span: 24, lg: 16 }}
                  >
                    <InputText
                      placeholder={formatMessage({
                        id: key,
                        defaultMessage: key,
                      })}
                      placement="top"
                      control={control}
                      name={[ADD_PRODUCT_FORM_KEY['characteristics'], key].join('.')}
                      size="large"
                    />
                  </Item>
                </Col>
              ))
            )}
          </Row>
        )}
      </Item>
    </Form>
  );
};

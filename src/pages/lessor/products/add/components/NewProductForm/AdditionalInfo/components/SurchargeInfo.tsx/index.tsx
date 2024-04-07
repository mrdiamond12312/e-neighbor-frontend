import { EditOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Col, Form, Row } from 'antd/lib';
import React from 'react';
import { Control } from 'react-hook-form';

import Button from '@/components/Button';
import InputText from '@/components/Input';
import Select from '@/components/Input/Select';
import {
  ADD_PRODUCT_FORM_KEY,
  SURCHARGE_KEY,
} from '@/pages/lessor/products/add/helpers/addProductFormKeys';

const { Item } = Form;

export type TSurchargeRecord = {
  control: Control<any>;
  index: number;
  handleRemoveField: () => void;
};

export const SurchargeInfo: React.FC<TSurchargeRecord> = ({
  control,
  handleRemoveField,
  index,
}) => {
  const { formatMessage } = useIntl();
  return (
    <section className="flex flex-row gap-2 items-start w-full px-3">
      <Row gutter={12} className="w-full" style={{ gap: '2px 0px' }}>
        <Col span={12}>
          <Item
            label={formatMessage({
              id: 'add.product.form.surcharge.id.label',
              defaultMessage: 'Surcharge Type',
            })}
            required
          >
            <Select
              placeholder={formatMessage({
                id: 'add.product.form.surcharge.id.label',
                defaultMessage: 'Surcharge Type',
              })}
              control={control}
              name={[ADD_PRODUCT_FORM_KEY['surcharge'], index, SURCHARGE_KEY['surchargeId']].join(
                '.',
              )}
              size="large"
            />
          </Item>
        </Col>
        <Col span="12">
          <Item
            label={formatMessage({
              id: 'add.product.form.surcharge.price.label',
              defaultMessage: 'Surcharge Price',
            })}
            required
          >
            <InputText
              placeholder={formatMessage({
                id: 'add.product.form.surcharge.price.label',
                defaultMessage: 'Surcharge Price',
              })}
              placement="top"
              control={control}
              name={[ADD_PRODUCT_FORM_KEY['surcharge'], index, SURCHARGE_KEY['price']].join('.')}
              size="large"
            />
          </Item>
        </Col>
      </Row>
      <Button
        type="default"
        className="border-0 border-5"
        icon={<EditOutlined />}
        isDanger={true}
        onClick={handleRemoveField}
      >
        <FormattedHTMLMessage
          id={'add.product.form.surcharges.delete'}
          defaultMessage="Delete"
        ></FormattedHTMLMessage>
      </Button>
    </section>
  );
};

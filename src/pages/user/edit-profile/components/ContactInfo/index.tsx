import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Col, Divider, Form, Row } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import InputText from '@/components/Input';
import { EDIT_PROFILE_KEYS } from '@/pages/user/edit-profile/helpers/edit-form-keys';

const { Item } = Form;

export type TContactInfoFormProps = Partial<TPropsFormInput> & {
  readOnly: boolean;
};

export const ContactInfo: React.FC<TContactInfoFormProps> = ({ control, readOnly }) => {
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
      <Divider orientation="left">
        <article className="font-sans text-heading-5">
          <FormattedHTMLMessage
            id="user.profile.form.section.contact.info"
            defaultMessage="Contact Information"
          />
        </article>
      </Divider>
      <Row gutter={12} style={{ gap: '2px 0px' }}>
        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.phone.label',
              defaultMessage: 'Phone Number',
            })}
            required
          >
            <InputText
              placeholder={formatMessage({
                id: 'user.profile.form.phone.label',
                defaultMessage: 'Phone Number',
              })}
              placement="top"
              control={control}
              name={EDIT_PROFILE_KEYS.phone}
              size={size}
              readOnly={readOnly}
            />
          </Item>
        </Col>
        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.email.label',
              defaultMessage: 'Email',
            })}
            required
          >
            <InputText
              placeholder={formatMessage({
                id: 'user.profile.form.email.label',
                defaultMessage: 'Email',
              })}
              placement="top"
              control={control}
              name={EDIT_PROFILE_KEYS.email}
              size={size}
              readOnly={readOnly}
            />
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

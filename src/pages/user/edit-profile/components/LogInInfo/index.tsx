import { FormattedHTMLMessage, useIntl, useModel } from '@umijs/max';
import { Col, Divider, Form, Input, Row } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import { getDateFormatNormal } from '../../../../../utils/time-format/index';

const { Item } = Form;

export const LogInInfo: React.FC = () => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
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
            id="user.profile.form.section.login.info"
            defaultMessage="Log in Information"
          />
        </article>
      </Divider>
      <Row gutter={12} style={{ gap: '2px 0px' }}>
        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.userName.label',
              defaultMessage: 'Username',
            })}
            required
          >
            <Input
              className="custom-input h-[38px]"
              size={size}
              value={currentUser?.userName}
              readOnly
            />
          </Item>
        </Col>
        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.createdAt.label',
              defaultMessage: 'First Logged in at',
            })}
            required
          >
            <Input
              className="custom-input h-[38px]"
              size={size}
              value={getDateFormatNormal(currentUser?.createdAt) ?? ''}
              readOnly
            />
          </Item>
        </Col>
        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.id.label',
              defaultMessage: 'User ID',
            })}
            required
          >
            <Input className="custom-input h-[38px]" size={size} value={currentUser?.id} readOnly />
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Divider, Form } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import HiddenInput from '@/components/Input/HiddenInput';
import { EDIT_PROFILE_KEYS } from '@/pages/user/edit-profile/helpers/edit-form-keys';

const { Item } = Form;

export const PasswordConfirm: React.FC<Partial<TPropsFormInput>> = ({ control }) => {
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
      <article className="font-sans flex flex-col gap-2 text-heading-3">
        <FormattedHTMLMessage
          id="user.profile.form.section.password.confirm.header"
          defaultMessage="Password Confirmation"
        />
        <p className="text-body-1-medium">
          <FormattedHTMLMessage
            id="user.profile.form.section.password.confirm.description"
            defaultMessage="To verify that you are changing your information, please enter your password."
          />
        </p>
      </article>
      <Divider />
      <Item
        label={formatMessage({
          id: 'user.profile.form.password.label',
          defaultMessage: 'Password',
        })}
        required
      >
        <HiddenInput
          placeholder={formatMessage({
            id: 'user.profile.form.password.label',
            defaultMessage: 'Password',
          })}
          placement="top"
          control={control}
          className="custom-input h-10"
          name={EDIT_PROFILE_KEYS.password}
          size={size}
        />
      </Item>
    </Form>
  );
};

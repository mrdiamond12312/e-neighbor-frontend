import { useIntl } from '@umijs/max';
import { Form } from 'antd';
import React from 'react';

import Button from '@/components/Button';
import InputText from '@/components/Input';
import HiddenInput from '@/components/Input/HiddenInput';
import { LOGIN_FORM_KEY } from '@/const/login-form';

export type TLoginForm = Partial<TPropsFormInput> & {
  isLoading: boolean;
};

const { Item } = Form;
const LoginForm: React.FC<TLoginForm> = ({ control, errors, onSubmit, isLoading }) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  return (
    <Form layout="vertical" rootClassName="custom-ant-form" form={form}>
      <Item
        label={formatMessage({
          id: 'login.form.userName.label',
          defaultMessage: 'Username',
        })}
      >
        <InputText
          placeholder="abcxyz"
          placement="top"
          control={control}
          error={errors}
          name={LOGIN_FORM_KEY['userName']}
          size="large"
        />
      </Item>
      <Item
        label={formatMessage({
          id: 'login.form.password.label',
          defaultMessage: 'Password',
        })}
        required
      >
        <HiddenInput
          placeholder="******"
          placement="top"
          control={control}
          error={errors}
          name={LOGIN_FORM_KEY['password']}
          size="large"
        />
      </Item>
      <Button
        onClick={onSubmit}
        btnSize="large"
        type="primary"
        className="w-full"
        loading={isLoading}
        htmlType="submit"
        onSubmit={onSubmit}
      >
        {formatMessage({
          id: 'login.form.submit',
          defaultMessage: 'Sign In',
        })}
      </Button>
    </Form>
  );
};

export default LoginForm;

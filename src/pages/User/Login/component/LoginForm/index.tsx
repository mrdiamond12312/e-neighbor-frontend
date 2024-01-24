import InputText from '@/components/Input';
import HiddenInput from '@/components/Input/HiddenInput';
import { LOGIN_FORM_KEY } from '@/const/login-form';
import { useIntl } from '@umijs/max';
import { Form } from 'antd';
const { Item } = Form;
import React from 'react';

const LoginForm: React.FC<Partial<TPropsFormInput>> = ({ control, errors }) => {
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
    </Form>
  );
};

export default LoginForm;

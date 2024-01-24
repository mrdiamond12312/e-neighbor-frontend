import Button from '@/components/Button';
import { PATH_REGISTER } from '@/const/path';
import LoginForm from '@/pages/User/Login/component/LoginForm';
import { useLoginForm } from '@/pages/User/Login/hooks/useLoginForm';
import { GoogleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Link, useIntl } from '@umijs/max';
import { Col, Divider, Row } from 'antd';
import React from 'react';

const Login: React.FC = () => {
  const { formatMessage } = useIntl();
  const { control, errors, handleSubmit, onSubmit, isLoading } = useLoginForm();

  return (
    <PageContainer className="w-full max-w-7xl flex m-auto py-8">
      <article className="h-full bg-neutral-1 py-12 rounded-lg">
        <Row gutter={12}>
          <Col span={24} lg={12} className="flex flex-col justify-center items-center ">
            <h1 className="text-heading-1 font-sans">
              {formatMessage({
                id: 'login.header',
                defaultMessage: 'Sign In',
              })}
            </h1>
            <p className="text-heading-5 font-sans">
              {formatMessage({
                id: 'login.message',
                defaultMessage: 'Welcome Back, please sign in!',
              })}
            </p>
          </Col>
          <Col span={24} lg={12} className="flex flex-col justify-center items-center !px-12">
            <LoginForm
              control={control}
              error={errors}
              onSubmit={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />

            <Divider>
              {formatMessage({
                id: 'login.form.alternative.header',
                defaultMessage: 'OR',
              })}
            </Divider>
            <Button icon={<GoogleOutlined />} btnSize="large" type="default" className="w-full">
              {formatMessage({
                id: 'login.alternative.GOOGLE',
                defaultMessage: 'Sign in with Google',
              })}
            </Button>
            <Divider>
              {formatMessage({
                id: 'login.form.alternative.no.account',
                defaultMessage: 'NOT REGISTER YET?',
              })}
            </Divider>
            <Link to={PATH_REGISTER} className="w-full">
              <Button btnSize="large" type="default" className="w-full">
                {formatMessage({
                  id: 'login.alternative.register',
                  defaultMessage: 'Sign Up',
                })}
              </Button>
            </Link>
          </Col>
        </Row>

        <img src="https://ik.imagekit.io/AliaV14/image-removebg-preview%20(1)%20(1).png?updatedAt=1700379933016"></img>
      </article>
    </PageContainer>
  );
};
export default Login;

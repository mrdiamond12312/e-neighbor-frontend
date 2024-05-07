import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Col, Row } from 'antd';
import React from 'react';

import LoginForm from '@/pages/admin/login/component/LoginForm';
import { useAdminLoginForm } from '@/pages/admin/login/hooks/useAdminLoginForm';

const Login: React.FC = () => {
  const { formatMessage } = useIntl();
  const { control, errors, handleSubmit, onSubmit, isLoading } = useAdminLoginForm();

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
          </Col>
        </Row>

        <img src="https://ik.imagekit.io/AliaV14/image-removebg-preview%20(1)%20(1).png?updatedAt=1700379933016"></img>
      </article>
    </PageContainer>
  );
};
export default Login;

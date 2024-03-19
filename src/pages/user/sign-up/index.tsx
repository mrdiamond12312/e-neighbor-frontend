import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Col, Row } from 'antd';
import React from 'react';

import RegisterForm from '@/pages/user/sign-up/component/RegisterForm';
import { useRegisterForm } from '@/pages/user/sign-up/hooks/useRegisterForm';

const SignUp: React.FC = () => {
  const { formatMessage } = useIntl();
  const { control, errors, handleSubmit, onSubmit, isLoading } = useRegisterForm();

  return (
    <PageContainer className="w-full max-w-7xl flex m-auto py-8">
      <article className="h-full bg-neutral-1 py-12 rounded-lg">
        <Row gutter={12}>
          <Col span={24} lg={12} className="flex flex-col justify-center items-center ">
            <h1 className="text-heading-1 font-sans px-4">
              {formatMessage({
                id: 'register.header',
                defaultMessage: 'Sign Up',
              })}
            </h1>
            <p className="text-heading-5 font-sans px-4 text-center whitespace-pre">
              {formatMessage({
                id: 'register.message',
                defaultMessage: "Newcomer? Let's Sign up!",
              })}
            </p>
          </Col>
          <Col span={24} lg={12} className="flex flex-col justify-center items-center !px-12">
            <RegisterForm
              control={control}
              error={errors}
              onSubmit={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </article>
    </PageContainer>
  );
};
export default SignUp;

import Button from '@/components/Button';
import RegisterForm from '@/pages/User/SignUp/component/RegisterForm';
import { useRegisterForm } from '@/pages/User/SignUp/hooks/useRegisterForm';

import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Col, Row } from 'antd';
import React from 'react';

const SignUp: React.FC = () => {
  const { formatMessage } = useIntl();
  const { control, errors, handleSubmit, onSubmit, isLoading } = useRegisterForm();

  return (
    <PageContainer className="w-full max-w-7xl flex m-auto py-8">
      <article className="h-full bg-neutral-1 py-12 rounded-lg">
        <Row gutter={12}>
          <Col span={24} lg={12} className="flex flex-col justify-center items-center ">
            <h1 className="text-heading-1 font-sans">
              {formatMessage({
                id: 'register.header',
                defaultMessage: 'Sign Up',
              })}
            </h1>
            <p className="text-heading-5 font-sans">
              {formatMessage({
                id: 'register.message',
                defaultMessage: "Newcomer? Let's Sign up!",
              })}
            </p>
          </Col>
          <Col span={24} lg={12} className="flex flex-col justify-center items-center !px-12">
            <RegisterForm control={control} error={errors} />
            <Button
              onClick={handleSubmit(onSubmit)}
              btnSize="large"
              type="primary"
              className="w-full"
              loading={isLoading}
            >
              {formatMessage({
                id: 'register.form.submit',
                defaultMessage: 'Sign Up',
              })}
            </Button>
          </Col>
        </Row>
      </article>
    </PageContainer>
  );
};
export default SignUp;

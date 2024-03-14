import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';
import { Card } from 'antd';

const LessorLayout: React.FC = () => {
  return (
    <PageContainer className="flex flex-col h-[100vh]">
      <Card></Card>
      <Outlet />
    </PageContainer>
  );
};

export default LessorLayout;

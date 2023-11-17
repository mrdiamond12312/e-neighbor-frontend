import TeamMembers from '@/pages/AboutUs/components/TeamMembers';
import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

const AboutUs = () => {
  return (
    <PageContainer className="w-full max-w-7xl m-auto">
      <TeamMembers />
    </PageContainer>
  );
};

export default AboutUs;

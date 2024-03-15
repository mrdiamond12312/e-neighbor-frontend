import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

import TeamMembers from '@/pages/AboutUs/components/TeamMembers';

const AboutUs = () => {
  return (
    <PageContainer className="w-full max-w-7xl m-auto">
      <TeamMembers />
    </PageContainer>
  );
};

export default AboutUs;

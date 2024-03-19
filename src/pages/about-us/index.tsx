import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

import TeamMembers from '@/pages/about-us/components/TeamMembers';

const AboutUs: React.FC = () => {
  return (
    <PageContainer className="w-full max-w-7xl m-auto">
      <TeamMembers />
    </PageContainer>
  );
};

export default AboutUs;

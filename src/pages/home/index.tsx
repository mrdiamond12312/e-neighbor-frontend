import { PageContainer } from '@ant-design/pro-components';
import { FormattedHTMLMessage } from '@umijs/max';
import { Flex } from 'antd/lib';
import React, { useState } from 'react';

import { ROLE } from '@/const/roles';
import ContactInfo from '@/layouts/ContactInfo';
import RoleDescription from '@/pages/home/components/RoleDescription';
import Roles from '@/pages/home/components/Roles';
import Scenary from '@/pages/home/components/Scenary';
import Slogan from '@/pages/home/components/Slogan';
// import TrendingFurniturePosts from '@/pages/Home/components/TrendingFurniturePosts';

const Home: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<ROLE>(ROLE.USER);

  return (
    <ContactInfo>
      <PageContainer className="max-h-[calc(100vh-56px)] xl:max-h-[calc(100vh-112px)] w-full  overflow-auto snap-mandatory snap-y snap-page-container">
        <section className="max-w-7xl h-[calc(100vh-56px)] w-full xl:h-[calc(100vh-112px)] relative lg:snap-center">
          <Scenary />
          <Slogan />
        </section>
        <section className="max-w-7xl h-[calc(100vh-56px)] w-full xl:h-[calc(100vh-112px)] relative lg:snap-center">
          <Roles setRoles={setSelectedRole} />
          <Flex className="absolute top-0 left-0 p-4 font-sans text-heading-3 bg-neutral-2/70 rounded-br-lg backdrop-blur">
            <FormattedHTMLMessage
              id="landingpage.role.title"
              defaultMessage="Currently, E-Neighbor has 3 roles:"
            />
          </Flex>
          <RoleDescription selectedRole={selectedRole} />
        </section>
      </PageContainer>
    </ContactInfo>
  );
};

export default Home;

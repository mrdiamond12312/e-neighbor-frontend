import { Flex } from 'antd/lib';
import React from 'react';

import { CommonInfo } from '@/pages/user/profile/components/CommonInfo';
import { RentalInfo } from '@/pages/user/profile/components/RentalInfo';

const UserProfile: React.FC = () => {
  return (
    <Flex className="flex-col gap-4 mt-4">
      <CommonInfo />
      <RentalInfo />
    </Flex>
  );
};

export default UserProfile;

import { Outlet } from '@umijs/max';
import { Flex, Tabs } from 'antd/lib';
import React from 'react';

import { AvatarBanner } from '@/layouts/User/components/AvatarBanner';
import { useUserLayout } from '@/layouts/User/hook/useUserLayout';

import './userLayout.css';

const LessorLayout: React.FC = () => {
  const { currentUser, tabsItem, handleTabChange, defaultActiveTabKey } = useUserLayout();

  return (
    <section className="flex flex-col w-full max-w-7xl mx-auto">
      <AvatarBanner
        image={currentUser?.image}
        name={currentUser?.fullName}
        role={currentUser?.role}
      />
      <Flex className="flex-row pl-12 w-full sticky top-0">
        <div
          className="w-48 bg-gradient-to-r from-transparent to-neutral-1"
          aria-label="placeholder"
        />
        <Flex className="flex-row w-full h-14 bg-neutral-1 justify-end items-end rounded-br-xl px-4 overflow-auto">
          <Tabs
            className="custom-tabs w-auto"
            defaultActiveKey={defaultActiveTabKey}
            items={tabsItem}
            onChange={handleTabChange}
          />
        </Flex>
      </Flex>
      <section className="w-full flex flex-col justify-start items-center overflow-auto">
        <Outlet />
      </section>
    </section>
  );
};

export default LessorLayout;

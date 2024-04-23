import { Outlet } from '@umijs/max';
import { Drawer } from 'antd/lib';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import { SideBar } from '@/components/SideBar';
import { useUserLayout } from '@/layouts/User/hook/useUserLayout';

const LessorLayout: React.FC = () => {
  const { sideBarItems, isAtOnboardingPage, isMenuDrawerOpen, handleDrawerBtn } = useUserLayout();

  return (
    <section className="flex flex-row h-[calc(100vh-56px)] w-full max-w-7xl mx-auto">
      {!isAtOnboardingPage && (
        <FadeIn direction="left" className="z-30 hidden lg:flex sticky top-14">
          <SideBar items={sideBarItems} containerClassName="sticky top-14 h-[calc(100vh-56px)]" />
        </FadeIn>
      )}
      <Drawer
        open={isMenuDrawerOpen}
        width={'fit-content'}
        rootClassName="custom-drawer"
        onClose={handleDrawerBtn}
        destroyOnClose
        placement="left"
      >
        <FadeIn direction="left" className="z-30">
          <SideBar
            items={sideBarItems}
            containerClassName="sticky top-[56px] left-0"
            hideCollapseBtn
          />
        </FadeIn>
      </Drawer>
      <section className="h-[calc(100vh-56px)] w-full flex flex-col justify-start items-center overflow-auto">
        <Outlet />
      </section>
    </section>
  );
};

export default LessorLayout;

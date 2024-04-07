import { MenuOutlined } from '@ant-design/icons';
import { Outlet, SelectLang } from '@umijs/max';
import { Breadcrumb, Drawer } from 'antd/lib';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { SideBar } from '@/components/SideBar';
import { useLessorLayout } from '@/layouts/Lessor/hook/useLessorLayout';

const LessorLayout: React.FC = () => {
  const {
    sideBarItems,
    initialState,
    isAtOnboardingPage,
    loading,
    breadCrumbItems,
    isMenuDrawerOpen,
    handleDrawerBtn,
  } = useLessorLayout();

  return (
    <section className="flex flex-row h-[100vh]">
      {!isAtOnboardingPage && (
        <FadeIn direction="left" className="z-30 hidden lg:flex">
          <SideBar items={sideBarItems} containerClassName="sticky top-0 left-0" />
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
      <section className="h-[100vh] w-full flex flex-col justify-start items-center overflow-auto">
        <FadeIn
          direction="top"
          className="w-full h-14 py-2 px-8 bg-neutral-1/30 backdrop-blur shadow flex flex-row justify-between z-20 sticky top-0"
        >
          <div className="flex flex-row items-center h-full gap-2 header-right-container">
            <Button onClick={handleDrawerBtn} type="text" className="border-none flex lg:hidden">
              <MenuOutlined className="text-body-1-medium" />
            </Button>
            <Breadcrumb
              items={breadCrumbItems}
              className="custom-breadcrumb"
              separator={
                <FadeIn direction="top">
                  <span>{'>'}</span>
                </FadeIn>
              }
            />
          </div>
          <div className="flex flex-row items-center h-full gap-2 header-left-container">
            <Avatar currentUser={initialState?.currentUser} loading={loading} />
            <SelectLang className="text-teal-2" />
          </div>
        </FadeIn>
        <Outlet />
      </section>
    </section>
  );
};

export default LessorLayout;

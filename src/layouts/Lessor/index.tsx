import { Outlet, SelectLang } from '@umijs/max';
import { Breadcrumb } from 'antd/lib';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import Avatar from '@/components/Avatar';
import { SideBar } from '@/components/SideBar';
import { useLessorLayout } from '@/layouts/Lessor/hook/useLessorLayout';

const LessorLayout: React.FC = () => {
  const { sideBarItems, initialState, isAtOnboardingPage, loading, breadCrumbItems } =
    useLessorLayout();
  return (
    <section className="flex flex-row h-[100vh]">
      {!isAtOnboardingPage && (
        <FadeIn direction="left" className="z-30">
          <SideBar items={sideBarItems} containerClassName="sticky top-[56px] left-0" />
        </FadeIn>
      )}
      <section className="h-[100vh] w-full flex flex-col justify-start items-center">
        <FadeIn
          direction="top"
          className="w-full h-14 py-2 px-8 bg-neutral-1/30 backdrop-blur shadow flex flex-row justify-between z-20 sticky top-0"
        >
          <div className="flex flex-row items-center h-full gap-2 header-right-container">
            <AnimatePresence mode="popLayout">
              <Breadcrumb items={breadCrumbItems} className="custom-breadcrumb" separator=">" />
            </AnimatePresence>
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

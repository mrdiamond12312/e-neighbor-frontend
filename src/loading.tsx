import FadeIn from '@/components/AnimationKit/FadeIn';
import { PageContainer } from '@ant-design/pro-components';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <PageContainer className="max-w-7xl w-full m-auto h-[calc(100vh-88px)] p-4 relative ">
      <AnimatePresence>
        <FadeIn
          direction="left"
          className="w-full h-[calc(100vh-88px)] relative"
          layoutId="loading-sprite"
        >
          <div className="sprite absolute bottom-24 right-4" />
        </FadeIn>
      </AnimatePresence>
    </PageContainer>
  );
};

export default Loading;

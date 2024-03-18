import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';

const Loading: React.FC = () => {
  return (
    <PageContainer className="max-w-7xl w-full m-auto h-[calc(100vh-88px)] p-4 relative ">
      <FadeIn
        direction="left"
        className="w-full h-[calc(100vh-88px)] relative"
        keyId="loading-sprite"
      >
        <div className="sprite absolute bottom-24 right-4" />
      </FadeIn>
    </PageContainer>
  );
};

export default Loading;

import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';

const Loading: React.FC = () => {
  return (
    <FadeIn
      direction="left"
      className="w-fit fixed bottom-24 right-[calc(50vw-624px)] z-100"
      keyId="loading-sprite"
    >
      <div className="sprite" />
    </FadeIn>
  );
};

export default Loading;

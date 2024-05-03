import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd/lib';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';

export type TLoadingProps = {
  extra?: string;
};

const Loading: React.FC<TLoadingProps> = ({ extra }) => {
  return (
    <FadeIn
      direction="left"
      className="w-fit fixed bottom-24 right-[calc(50vw-624px)] z-100 flex flex-col gap-2"
      keyId="loading-sprite"
    >
      <div className="sprite" />
      {extra && (
        <Flex className="flex-row gap-2 items-center pl-1">
          <span className="text-body-2-semibold font-sans">{extra}</span>
          <Spin indicator={<LoadingOutlined className="!inline-flex text-neutral-10" spin />} />
        </Flex>
      )}
    </FadeIn>
  );
};

export default Loading;

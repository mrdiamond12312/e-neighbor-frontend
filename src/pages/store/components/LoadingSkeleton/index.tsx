import { FormattedHTMLMessage } from '@umijs/max';
import { Spin } from 'antd/lib';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';

export type TLoadingSkeleProps = {
  keyId?: string;
};

const LoadingSkeleton: React.FC<TLoadingSkeleProps> = ({ keyId }) => {
  return (
    <FadeIn
      direction="right"
      keyId={keyId}
      mode="wait"
      className="flex flex-col gap-2 w-full h-[415px] bg-[length:400%_400%] bg-gradient-to-br from-teal-1/30 to-neutral-1 animate-gradient property-card overflow-clip justify-center items-center text-body-1-medium"
    >
      <Spin></Spin>
      <FormattedHTMLMessage id="common.loading" defaultMessage="Loading datas..." />
    </FadeIn>
  );
};

export default LoadingSkeleton;

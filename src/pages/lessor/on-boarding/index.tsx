import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Steps } from 'antd/lib';
import React from 'react';

import { NotifyModal } from '@/pages/lessor/on-boarding/components/NotifyModal';

const OnBoarding: React.FC = () => {
  const { formatMessage } = useIntl();
  const stepItems = [
    {
      title: formatMessage({
        id: 'lessor.onboarding.step.title.personal-info',
        defaultMessage: 'Personal Information Update',
      }),
    },
    {
      title: formatMessage({
        id: 'lessor.onboarding.step.title.lessor-info',
        defaultMessage: "Lessor's Information",
      }),
    },
    {
      title: 'Waiting',
    },
  ];

  return (
    <PageContainer className="w-full max-w-7xl m-4 p-4 bg-neutral-1 h-full rounded-lg">
      <Steps
        className="custom-steps"
        current={1}
        direction="horizontal"
        items={stepItems}
        labelPlacement="vertical"
      ></Steps>
      <NotifyModal />
    </PageContainer>
  );
};

export default OnBoarding;

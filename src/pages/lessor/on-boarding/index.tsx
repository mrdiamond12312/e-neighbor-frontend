import { FormattedHTMLMessage } from '@umijs/max';
import { Card, Divider } from 'antd/lib';
import React from 'react';

import Button from '@/components/Button';
import { NotifyModal } from '@/pages/lessor/on-boarding/components/NotifyModal';
import { UserInfo } from '@/pages/lessor/on-boarding/components/OnboardingForm/UserInfo';
import { OnboardStep } from '@/pages/lessor/on-boarding/components/OnboardStep';
import { useOnboardingForm } from '@/pages/lessor/on-boarding/hooks/useOnboardingForm';

const OnBoarding: React.FC = () => {
  const { currentStep, handleNextStep, handlePreviousStep, stepItems, control, errors } =
    useOnboardingForm();
  return (
    <Card
      rootClassName="w-full max-w-7xl m-4 p-4 bg-neutral-1 h-full rounded-lg"
      actions={[
        <Button key="form-next" onClick={handlePreviousStep} type="default">
          <FormattedHTMLMessage id="common.previous" defaultMessage="Back" />
        </Button>,
        <Button key="form-next" onClick={handleNextStep} type="primary">
          <FormattedHTMLMessage id="common.next" defaultMessage="Next" />
        </Button>,
      ]}
    >
      <OnboardStep currentStep={currentStep} stepItems={stepItems} />
      <Divider />
      <section className="flex mt-6">
        <UserInfo control={control} errors={errors} />
      </section>
      <NotifyModal />
    </Card>
  );
};

export default OnBoarding;

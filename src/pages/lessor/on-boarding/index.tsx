import { PageContainer } from '@ant-design/pro-components';
import { FormattedHTMLMessage } from '@umijs/max';
import { Card, Divider } from 'antd/lib';
import React from 'react';

import Button from '@/components/Button';
import { Steps } from '@/components/Steps';
import { NotifyModal } from '@/pages/lessor/on-boarding/components/NotifyModal';
import { IdentityInfo } from '@/pages/lessor/on-boarding/components/OnboardingForm/IdentityInfo';
import { LessorInfo } from '@/pages/lessor/on-boarding/components/OnboardingForm/LessorInfo';
import { UserInfo } from '@/pages/lessor/on-boarding/components/OnboardingForm/UserInfo';
import { useOnboardingForm } from '@/pages/lessor/on-boarding/hooks/useOnboardingForm';

const OnBoarding: React.FC = () => {
  const {
    currentStep,
    handleNextStep,
    handlePreviousStep,
    isLastStep,
    stepItems,
    control,
    handleSubmit,
    errors,
    getValues,
  } = useOnboardingForm();

  const steps = [
    <UserInfo key={'onboarding.userInfo'} control={control} errors={errors} />,
    <LessorInfo key="onboarding.lessorInfo" control={control} errors={errors} />,
    <IdentityInfo key="onboarding.identityInfo" control={control} errors={errors} />,
  ];
  return (
    <PageContainer className="w-full max-w-7xl p-4 rounded-lg flex flex-col">
      <Card
        rootClassName="p-8 pb-0 bg-neutral-1 rounded-lg flex flex-col"
        actions={[
          <Button key="form-previous" onClick={handlePreviousStep} type="default">
            <FormattedHTMLMessage id="common.previous" defaultMessage="Back" />
          </Button>,
          isLastStep ? (
            <Button key="form-submit" onClick={() => handleSubmit(getValues())} type="primary">
              <FormattedHTMLMessage id="common.submit" defaultMessage="Submit" />
            </Button>
          ) : (
            <Button key="form-next" onClick={handleNextStep} type="primary">
              <FormattedHTMLMessage id="common.next" defaultMessage="Next" />
            </Button>
          ),
        ]}
        styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%', padding: 0 } }}
      >
        <Steps currentStep={currentStep} stepItems={stepItems} />
        <Divider className="hidden md:block" />
        <section className="flex w-full max-w-3xl justify-center items-center m-auto">
          {steps[currentStep]}
        </section>
        <NotifyModal />
      </Card>
    </PageContainer>
  );
};

export default OnBoarding;

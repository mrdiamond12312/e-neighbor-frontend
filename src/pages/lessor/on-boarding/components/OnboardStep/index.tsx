import { Steps } from 'antd';
import { StepProps } from 'antd/lib';
import React from 'react';

export type TOnboardStep = {
  currentStep: number;
  stepItems: StepProps[];
};

export const OnboardStep: React.FC<TOnboardStep> = ({ currentStep, stepItems }) => {
  return (
    <Steps
      className="custom-steps !hidden md:!flex"
      current={currentStep}
      direction="horizontal"
      items={stepItems}
      labelPlacement="vertical"
    />
  );
};

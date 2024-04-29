import { Steps as AntdSteps } from 'antd';
import { StepProps, StepsProps } from 'antd/lib';
import classNames from 'classnames';
import React from 'react';

export type TStepProps = {
  currentStep?: number;
  stepItems: StepProps[];
} & StepsProps;

export const Steps: React.FC<TStepProps> = ({
  currentStep,
  stepItems,
  className,
  ...restProps
}) => {
  const combinedClassName = classNames('custom-steps', className);
  return (
    <AntdSteps
      current={currentStep}
      direction="horizontal"
      items={stepItems}
      labelPlacement="vertical"
      {...restProps}
      className={combinedClassName}
    />
  );
};

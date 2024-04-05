import { useIntl } from '@umijs/max';
import { StepProps } from 'antd/lib';
import { useState } from 'react';

export const useAddProductForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { formatMessage } = useIntl();

  const stepItems: StepProps[] = [
    {
      title: formatMessage({
        id: 'lessor.products.add.step.title.basicInfo',
        defaultMessage: 'Basic Information',
      }),
    },
    {
      title: formatMessage({
        id: 'lessor.products.add.step.title.detailInfo',
        defaultMessage: 'Details Information',
      }),
    },
    {
      title: formatMessage({
        id: 'lessor.products.add.step.title.rentalInfo',
        defaultMessage: 'Rental Information',
      }),
    },
  ];

  const numberOfSteps = stepItems.length;

  const isLastStep = currentStep === numberOfSteps - 1;

  const handleNextStep = async () => {
    // Trigger Validate for current step
    const isGoodToForward = true;
    if (isGoodToForward && !isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return { currentStep, stepItems, handleNextStep, handlePreviousStep };
};

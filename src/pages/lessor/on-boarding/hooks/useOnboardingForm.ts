import { useIntl } from '@umijs/max';
import { StepProps } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  CREDIT_KEY,
  ONBOARDING_FORM_KEY,
} from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';

export interface ICreditInfo {
  [CREDIT_KEY.accountNumber]: string;
  [CREDIT_KEY.cardType]: string;
  [CREDIT_KEY.holderName]: string;
}

export type TOnboardingFormFields = {
  [ONBOARDING_FORM_KEY.address]?: string;
  [ONBOARDING_FORM_KEY.citizenId]: string;
  [ONBOARDING_FORM_KEY.description]?: string;
  [ONBOARDING_FORM_KEY.dob]: string;
  [ONBOARDING_FORM_KEY.email]: string;
  [ONBOARDING_FORM_KEY.fullName]: string;
  [ONBOARDING_FORM_KEY.phoneNumber]: string;
  [ONBOARDING_FORM_KEY.wareHouseAddress]: string;
  [ONBOARDING_FORM_KEY.paymentInfo]: ICreditInfo;
};

export const useOnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { formatMessage } = useIntl();

  const stepItems: StepProps[] = [
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

  const {
    control,
    formState: { errors, dirtyFields, isValid, isDirty },
    getValues,
    trigger,
    handleSubmit,
  } = useForm<TOnboardingFormFields>({
    defaultValues: {},
    mode: 'onTouched',
  });

  const numberOfSteps = stepItems.length;
  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < numberOfSteps - 1 ? prev + 1 : prev));
  };
  const handlePreviousStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };
  return {
    currentStep,
    handleNextStep,
    handlePreviousStep,
    stepItems,
    numberOfSteps,
    control,
    errors,
    dirtyFields,
    isValid,
    isDirty,
    getValues,
    trigger,
    handleSubmit,
  } as const;
};

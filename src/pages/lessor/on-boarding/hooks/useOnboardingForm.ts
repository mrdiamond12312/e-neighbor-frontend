import { useIntl, useModel } from '@umijs/max';
import { StepProps } from 'antd';
import { notification } from 'antd/lib';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PATH_LESSOR_DASHBOARD } from '@/const/path';
import {
  CREDIT_KEY,
  ONBOARDING_FORM_KEY,
} from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';
import useOnboardingResolver from '@/pages/lessor/on-boarding/hooks/useOnboardingResolver';
import { useLessorOnboardMutate } from '@/services/lessor/services';
import { setStorageItem } from '@/utils/local-storage';

export interface ICreditInfo {
  [CREDIT_KEY.accountNumber]: string;
  [CREDIT_KEY.cardType]: string;
  [CREDIT_KEY.holderName]: string;
  [CREDIT_KEY.bank]: string;
}

export type TOnboardingFormFields = {
  [ONBOARDING_FORM_KEY.address]: string;
  [ONBOARDING_FORM_KEY.citizenId]: string;
  [ONBOARDING_FORM_KEY.description]: string;
  [ONBOARDING_FORM_KEY.dob]?: string | null;
  [ONBOARDING_FORM_KEY.email]: string;
  [ONBOARDING_FORM_KEY.fullName]: string;
  [ONBOARDING_FORM_KEY.phoneNumber]: string;
  [ONBOARDING_FORM_KEY.wareHouseAddress]: string;
  [ONBOARDING_FORM_KEY.paymentInfo]?: ICreditInfo[];
  [ONBOARDING_FORM_KEY.citizenCardBack]: any[];
  [ONBOARDING_FORM_KEY.citizenCardFront]: any[];
  [ONBOARDING_FORM_KEY.shopName]: string;
  [ONBOARDING_FORM_KEY.avatar]: any[];
};

export const useOnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { formatMessage } = useIntl();

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const { FormSchema } = useOnboardingResolver();

  const { mutate } = useLessorOnboardMutate();

  const stepItems: StepProps[] = [
    {
      title: formatMessage({
        id: 'lessor.onboarding.step.title.personalInfo',
        defaultMessage: 'Personal Information Update',
      }),
    },
    {
      title: formatMessage({
        id: 'lessor.onboarding.step.title.lessorInfo',
        defaultMessage: "Lessor's Information",
      }),
    },
    {
      title: formatMessage({
        id: 'lessor.onboarding.step.title.identityInfo',
        defaultMessage: 'Identity Information',
      }),
    },
  ];

  const {
    control,
    formState: { errors, dirtyFields, isValid, isDirty },
    getValues,
    trigger,
  } = useForm<TOnboardingFormFields>({
    defaultValues: {
      [ONBOARDING_FORM_KEY['address']]: currentUser?.[ONBOARDING_FORM_KEY['address']],
      [ONBOARDING_FORM_KEY['citizenId']]: currentUser?.[ONBOARDING_FORM_KEY['citizenId']],
      [ONBOARDING_FORM_KEY['dob']]: currentUser?.[ONBOARDING_FORM_KEY['dob']],
      [ONBOARDING_FORM_KEY['fullName']]: currentUser?.[ONBOARDING_FORM_KEY['fullName']],
      [ONBOARDING_FORM_KEY['email']]: currentUser?.[ONBOARDING_FORM_KEY['email']],
      [ONBOARDING_FORM_KEY['avatar']]: currentUser?.[ONBOARDING_FORM_KEY['avatar']]
        ? [{ url: currentUser?.[ONBOARDING_FORM_KEY['avatar']] }]
        : [],
    },
    resolver: FormSchema,
    mode: 'onTouched',
  });

  const numberOfSteps = stepItems.length;

  const isLastStep = currentStep === stepItems.length - 1;

  const handlePreviousStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const checkValidate = useCallback(async () => {
    switch (currentStep) {
      case 0: {
        return await trigger([
          ONBOARDING_FORM_KEY.email,
          ONBOARDING_FORM_KEY.fullName,
          ONBOARDING_FORM_KEY.dob,
          ONBOARDING_FORM_KEY.address,
          ONBOARDING_FORM_KEY.phoneNumber,
          ONBOARDING_FORM_KEY.avatar,
        ]);
      }
      case 1: {
        return await trigger([
          ONBOARDING_FORM_KEY.shopName,
          ONBOARDING_FORM_KEY.wareHouseAddress,
          ONBOARDING_FORM_KEY.description,
        ]);
      }
      case 2: {
        return await trigger([
          ONBOARDING_FORM_KEY.citizenCardBack,
          ONBOARDING_FORM_KEY.citizenCardFront,
          ONBOARDING_FORM_KEY.citizenId,
        ]);
      }
      default:
        return false;
    }
  }, [currentStep]);

  const handleNextStep = async () => {
    const isGoodToForward = await checkValidate();
    console.log(isGoodToForward, currentStep);
    if (isGoodToForward && currentStep < stepItems.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (formFields: TOnboardingFormFields) => {
    const isGoodToForward = await checkValidate();
    console.log(isGoodToForward);
    if (isGoodToForward) {
      if (
        formFields[ONBOARDING_FORM_KEY['citizenCardBack']][0].status === 'uploading' ||
        formFields[ONBOARDING_FORM_KEY['citizenCardFront']][0].status === 'uploading'
      ) {
        notification.info({
          message: formatMessage({
            id: 'common.upload.wait',
            defaultMessage: 'Please wait for image to upload before submit!',
          }),
        });
      }
      mutate(formFields, {
        onSuccess: (data) => {
          setStorageItem('accessToken', data.accessToken);
          notification.success({
            message: formatMessage({
              id: 'lessor.onboard.success',
              defaultMessage: 'You have successfully registered as a Lessor!',
            }),
            duration: 0.5,
            onClose: () => {
              window.location.href = PATH_LESSOR_DASHBOARD;
            },
          });
        },
        onError: () =>
          notification.error({
            message: formatMessage({
              id: 'lessor.onboard.error.already',
              defaultMessage: "You've already been a Lessor!",
            }),
          }),
      });
    }
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
    isLastStep,
  } as const;
};

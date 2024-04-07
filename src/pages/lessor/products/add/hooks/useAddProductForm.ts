import { useIntl } from '@umijs/max';
import { StepProps } from 'antd/lib';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  ADD_PRODUCT_FORM_KEY,
  TProductFormField,
} from '@/pages/lessor/products/add/helpers/addProductFormKeys';
import { useCategoriesDetails } from '@/services/product-categories/services';

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
    {
      title: formatMessage({
        id: 'lessor.products.add.step.title.additionalInfo',
        defaultMessage: 'Additional Information',
      }),
    },
  ];

  const numberOfSteps = stepItems.length;
  const isLastStep = currentStep === numberOfSteps - 1;

  const methods = useForm<TProductFormField>({ mode: 'onTouched' });
  const checkValidate = useCallback(async () => {
    switch (currentStep) {
      case 0:
        return await methods.trigger([
          ADD_PRODUCT_FORM_KEY.name,
          ADD_PRODUCT_FORM_KEY.images,
          ADD_PRODUCT_FORM_KEY.category,
          ADD_PRODUCT_FORM_KEY.description,
        ]);

      case 1:
        return await methods.trigger([ADD_PRODUCT_FORM_KEY.characteristics]);

      case 2:
        return await methods.trigger([
          ADD_PRODUCT_FORM_KEY.value,
          ADD_PRODUCT_FORM_KEY.policies,
          ADD_PRODUCT_FORM_KEY.mortgage,
          ADD_PRODUCT_FORM_KEY.requiredDocuments,
          ADD_PRODUCT_FORM_KEY.price,
          ADD_PRODUCT_FORM_KEY.surcharge,
        ]);

      case 3:
        return await methods.trigger([ADD_PRODUCT_FORM_KEY.insurance]);
      default:
        return false;
    }
  }, [currentStep]);

  // Chosen Category is compose of link to that category (Furniture/../etc) => take last
  const chosenCategory = methods.watch(ADD_PRODUCT_FORM_KEY.category);
  const { data: categoryDetail, isInitialLoading: isLoadingCategoryDetail } = useCategoriesDetails(
    chosenCategory ? chosenCategory[chosenCategory.length - 1] ?? undefined : undefined,
  );

  const handleNextStep = async () => {
    // Trigger Validate for current step
    const isGoodToForward = await checkValidate();
    if (isGoodToForward && !isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return {
    currentStep,
    stepItems,
    handleNextStep,
    handlePreviousStep,
    control: methods.control,
    methods,
    categoryDetail,
    isLoadingCategoryDetail,
  } as const;
};

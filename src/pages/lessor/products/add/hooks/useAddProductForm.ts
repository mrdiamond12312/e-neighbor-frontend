import { useIntl, history } from '@umijs/max';
import { notification, StepProps } from 'antd/lib';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PATH_LESSOR } from '@/const/path';
import {
  ADD_PRODUCT_FORM_KEY,
  TProductFormField,
} from '@/pages/lessor/products/add/helpers/addProductFormKeys';
import { useAddProductResolver } from '@/pages/lessor/products/add/hooks/useAddProductResolver';
import { useCategoriesDetails } from '@/services/product-categories/services';
import { useCreateNewProducts } from '@/services/products/services';

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
  const { FormSchema } = useAddProductResolver();
  const methods = useForm<TProductFormField>({ mode: 'onTouched', resolver: FormSchema });

  console.log(methods.watch());
  const checkValidate = useCallback(async () => {
    switch (currentStep) {
      case 0:
        return await methods.trigger([
          ADD_PRODUCT_FORM_KEY.name,
          ADD_PRODUCT_FORM_KEY.images,
          ADD_PRODUCT_FORM_KEY.description,
          ADD_PRODUCT_FORM_KEY.price,
          ADD_PRODUCT_FORM_KEY.timeUnit,
        ]);

      case 1:
        return await methods.trigger([
          ADD_PRODUCT_FORM_KEY.category,
          ADD_PRODUCT_FORM_KEY.characteristics,
        ]);

      case 2:
        return await methods.trigger([
          ADD_PRODUCT_FORM_KEY.value,
          ADD_PRODUCT_FORM_KEY.policies,
          ADD_PRODUCT_FORM_KEY.mortgage,
          ADD_PRODUCT_FORM_KEY.requiredDocuments,
        ]);

      case 3:
        return await methods.trigger([
          ADD_PRODUCT_FORM_KEY.haveInsurance,
          ADD_PRODUCT_FORM_KEY.surcharge,
          ADD_PRODUCT_FORM_KEY.insurance,
        ]);
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

  const { mutate, isLoading: isSubmitting } = useCreateNewProducts();

  const handleSubmit = async (formFields: TProductFormField) => {
    const isGoodToForward = await checkValidate();
    if (isGoodToForward && isLastStep) {
      mutate(formFields, {
        onSuccess: () => {
          notification.success({
            message: formatMessage({
              id: 'lessor.addProduct.success',
              defaultMessage: 'You have successfully added a new Product!',
            }),
            duration: 1,
            onClose: () => {
              history.push(PATH_LESSOR);
            },
          });
        },
      });
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
    getValues: methods.getValues,
    handleSubmit,
    isSubmitting,
    isLastStep,
  } as const;
};

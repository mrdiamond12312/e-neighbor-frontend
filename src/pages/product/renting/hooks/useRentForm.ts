import { getLocale, history, useParams } from '@umijs/max';
import { notification } from 'antd/lib';
import { RangePickerProps } from 'antd/lib/date-picker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import urlcat from 'urlcat';

import { PATH_PRODUCTS_DETAILS } from '@/const/path';
import { RENTAL_INFO_KEYS } from '@/pages/product/renting/helpers/rentFormKeys';
import useRentFormResolver, {
  AVAILABLE_LOCALES,
  PAYMENT_GATEWAY,
  TRentingFormFields,
} from '@/pages/product/renting/hooks/useRentFormResolver';
import { useCreateTransaction } from '@/services/rent/services';

export const useRentForm = () => {
  const { productId } = useParams();
  const { FormSchema } = useRentFormResolver();
  const {
    control,
    // formState,
    getValues,
    trigger,
  } = useForm<TRentingFormFields>({
    defaultValues: {
      [RENTAL_INFO_KEYS.locale]:
        getLocale() === 'vi-VN' ? AVAILABLE_LOCALES.VI : AVAILABLE_LOCALES.EN,
      [RENTAL_INFO_KEYS.strategy]: PAYMENT_GATEWAY.VNPAY,
      [RENTAL_INFO_KEYS.productId]: Number(productId),
    },
    resolver: FormSchema,
    mode: 'onTouched',
  });

  const checkValidate = async () => {
    return await trigger([
      RENTAL_INFO_KEYS.productId,
      RENTAL_INFO_KEYS.dateRange,
      RENTAL_INFO_KEYS.deliveryAddress,
    ]);
  };
  const { mutate, isLoading } = useCreateTransaction();
  const handleSubmit = async (formFields: TRentingFormFields) => {
    const isGoodToForward = await checkValidate();
    if (isGoodToForward) {
      mutate(formFields, {
        onError: (error: TMeta) => {
          console.log(error);
          notification.error({
            message: [error.statusCode, error.error].join(' - '),
            description: error.message,
          });
        },
      });
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleCancel = () => {
    history.push(urlcat(PATH_PRODUCTS_DETAILS, { productId }));
  };

  return {
    control,
    getValues,
    handleSubmit,
    disabledDate,
    productId,
    handleCancel,
    isOpen,
    setIsOpen,
    isLoading,
  } as const;
};

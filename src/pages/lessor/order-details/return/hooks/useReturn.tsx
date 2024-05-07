import { yupResolver } from '@hookform/resolvers/yup';
import { history, useIntl, useParams } from '@umijs/max';
import { notification } from 'antd/lib';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import urlcat from 'urlcat';
import * as yup from 'yup';

import { TRadioOption } from '@/components/Input/Radio';
import { PATH_LESSOR_ORDERS_DETAILS } from '@/const/path';
import { useLessorUpdateReturnFinishing } from '@/services/orders/services';

export enum RETURN_FORM_KEY {
  orderId = 'orderId',
  isReturnedOnTime = 'isReturnOnTime',
  conditionUponReturn = 'conditionUponReturn',
  imagesUponReturn = 'imagesUponReturn',
}

export type TReturnFormFields = {
  [RETURN_FORM_KEY.orderId]: number;
  [RETURN_FORM_KEY.isReturnedOnTime]: boolean;
  [RETURN_FORM_KEY.conditionUponReturn]: string;
  [RETURN_FORM_KEY.imagesUponReturn]: any[];
};

export const useReturn = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { orderId } = useParams();
  const { mutate, isLoading } = useLessorUpdateReturnFinishing();

  const { formatMessage } = useIntl();
  const ReturnValidationSchema = yup.object().shape({
    [RETURN_FORM_KEY.orderId]: yup.number().required(),
    [RETURN_FORM_KEY.isReturnedOnTime]: yup.boolean().required(),
    [RETURN_FORM_KEY.conditionUponReturn]: yup.string().required(
      formatMessage({
        id: 'lessor.orders.return.fields.conditionUponReturn.null',
        defaultMessage: 'Please describe the property upon returned',
      }),
    ),
    [RETURN_FORM_KEY.imagesUponReturn]: yup
      .array()
      .of(
        yup.object().shape({
          originFileObj: yup.mixed().required(
            formatMessage({
              id: 'lessor.orders.receipt.fields.imagesUponReturn.null',
              defaultMessage: 'An Image is Required!',
            }),
          ),
        }),
      )
      .required(
        formatMessage({
          id: 'lessor.orders.receipt.fields.imagesUponReturn.null',
          defaultMessage: 'An Image is Required!',
        }),
      )
      .min(
        1,
        formatMessage({
          id: 'lessor.orders.receipt.fields.imagesUponReturn.null',
          defaultMessage: 'An Image is Required!',
        }),
      ),
  });

  const { control, getValues, trigger, watch } = useForm<TReturnFormFields>({
    defaultValues: {
      [RETURN_FORM_KEY.orderId]: Number(orderId),
      [RETURN_FORM_KEY.isReturnedOnTime]: true,
    },
    resolver: yupResolver<TReturnFormFields>(ReturnValidationSchema) ?? null,
    mode: 'onTouched',
  });

  const finishedUploadingImages =
    !watch(RETURN_FORM_KEY.imagesUponReturn)?.some((image) => image.status === 'uploading') ?? true;

  const handleReturn = async (body: TReturnFormFields) => {
    const isGoodToForward = await trigger();
    if (!isGoodToForward) return;

    mutate(body, {
      onSuccess: () => {
        notification.success({
          message: formatMessage(
            {
              id: 'user.orders.return.submit.success',
              defaultMessage: 'Successfully add a Receipt for order #{orderId}',
            },
            { orderId },
          ),
          duration: 0.5,
          onClose: () => history.push(urlcat(PATH_LESSOR_ORDERS_DETAILS, { orderId })),
        });
      },
      onError: (error) => {
        notification.error({
          message: [error.statusCode, error.error].join(' - '),
          description: error.message,
          duration: 0.5,
          onClose: () => history.push(urlcat(PATH_LESSOR_ORDERS_DETAILS, { orderId })),
        });
      },
    });
  };

  const punctualityOptions: TRadioOption[] = [
    {
      value: true,
      label: formatMessage({
        id: 'user.orders.receipt.fields.isDeliveredOnTime.true',
        defaultMessage: 'On Time',
      }),
    },
    {
      value: false,
      label: formatMessage({
        id: 'user.orders.receipt.fields.isDeliveredOnTime.false',
        defaultMessage: 'Late',
      }),
    },
  ];

  const afterClose = () => {
    history.push(urlcat(PATH_LESSOR_ORDERS_DETAILS, { orderId }));
  };
  return {
    orderId,
    isOpen,
    setIsOpen,
    handleReturn,
    isLoading: isLoading || !finishedUploadingImages,
    afterClose,
    punctualityOptions,
    control,
    getValues,
  } as const;
};

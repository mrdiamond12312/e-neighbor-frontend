import { yupResolver } from '@hookform/resolvers/yup';
import { history, useIntl, useParams } from '@umijs/max';
import { notification } from 'antd/lib';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import urlcat from 'urlcat';
import * as yup from 'yup';

import { TRadioOption } from '@/components/Input/Radio';
import { PATH_USER_PROFILE_ORDER_DETAILS } from '@/const/path';
import { useUserUpdateReceipt } from '@/services/orders/services';

export enum RECEIPT_FORM_KEY {
  orderId = 'orderId',
  isDeliveredOnTime = 'isDeliveryOnTime',
  conditionUponReceipt = 'conditionUponReceipt',
  imagesUponReceipt = 'imagesUponReceipt',
}

export type TReceiptFormFields = {
  [RECEIPT_FORM_KEY.orderId]: number;
  [RECEIPT_FORM_KEY.isDeliveredOnTime]: boolean;
  [RECEIPT_FORM_KEY.conditionUponReceipt]: string;
  [RECEIPT_FORM_KEY.imagesUponReceipt]: any[];
};

export const useReceipt = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { orderId } = useParams();
  const { mutate, isLoading } = useUserUpdateReceipt();

  const { formatMessage } = useIntl();
  const ReceiptValidationSchema = yup.object().shape({
    [RECEIPT_FORM_KEY.orderId]: yup.number().required(),
    [RECEIPT_FORM_KEY.isDeliveredOnTime]: yup.boolean().required(),
    [RECEIPT_FORM_KEY.conditionUponReceipt]: yup.string().required(
      formatMessage({
        id: 'user.orders.receipt.fields.conditionUponReceipt.null',
        defaultMessage: 'Please describe the property upon delivered',
      }),
    ),
    [RECEIPT_FORM_KEY.imagesUponReceipt]: yup
      .array()
      .of(
        yup.object().shape({
          originFileObj: yup.mixed().required(
            formatMessage({
              id: 'user.orders.receipt.fields.imagesUponReceipt.null',
              defaultMessage: 'An Image is Required!',
            }),
          ),
        }),
      )
      .required(
        formatMessage({
          id: 'user.orders.receipt.fields.imagesUponReceipt.null',
          defaultMessage: 'An Image is Required!',
        }),
      )
      .min(
        1,
        formatMessage({
          id: 'user.orders.receipt.fields.imagesUponReceipt.null',
          defaultMessage: 'An Image is Required!',
        }),
      ),
  });

  const { control, getValues, trigger, watch } = useForm<TReceiptFormFields>({
    defaultValues: {
      [RECEIPT_FORM_KEY.orderId]: Number(orderId),
      [RECEIPT_FORM_KEY.isDeliveredOnTime]: true,
    },
    resolver: yupResolver<TReceiptFormFields>(ReceiptValidationSchema) ?? null,
    mode: 'onTouched',
  });

  const finishedUploadingImages =
    !watch(RECEIPT_FORM_KEY.imagesUponReceipt)?.some((image) => image.status === 'uploading') ??
    true;

  const handleReceipt = async (body: TReceiptFormFields) => {
    const isGoodToForward = await trigger();
    if (!isGoodToForward) return;

    mutate(body, {
      onSuccess: () => {
        notification.success({
          message: formatMessage(
            {
              id: 'user.orders.receipt.submit.success',
              defaultMessage: 'Successfully add a Receipt for order #{orderId}',
            },
            { orderId },
          ),

          duration: 0.5,
          onClose: () => history.push(urlcat(PATH_USER_PROFILE_ORDER_DETAILS, { orderId })),
        });
      },
      onError: (error) => {
        notification.error({
          message: [error.statusCode, error.error].join(' - '),
          description: error.message,
          duration: 0.5,
          onClose: () => history.push(urlcat(PATH_USER_PROFILE_ORDER_DETAILS, { orderId })),
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
    history.push(urlcat(PATH_USER_PROFILE_ORDER_DETAILS, { orderId }));
  };
  return {
    orderId,
    isOpen,
    setIsOpen,
    handleReceipt,
    isLoading: isLoading || !finishedUploadingImages,
    afterClose,
    punctualityOptions,
    control,
    getValues,
  } as const;
};

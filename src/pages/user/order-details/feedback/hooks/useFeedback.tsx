import { yupResolver } from '@hookform/resolvers/yup';
import { history, useIntl, useParams } from '@umijs/max';
import { notification } from 'antd/lib';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import urlcat from 'urlcat';
import * as yup from 'yup';

import { PATH_USER_PROFILE_ORDER_DETAILS } from '@/const/path';
import { useGiveFeedback } from '@/services/feedbacks/services';

export enum FEEDBACK_FORM_KEY {
  orderId = 'orderId',
  content = 'content',
  star = 'star',
  image = 'image',
}

export type TFeedbackFormFields = {
  [FEEDBACK_FORM_KEY.orderId]: number;
  [FEEDBACK_FORM_KEY.content]: string;
  [FEEDBACK_FORM_KEY.image]?: any[];
  [FEEDBACK_FORM_KEY.star]: number;
};

export const useFeedbackForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { orderId } = useParams();
  const { mutate, isLoading } = useGiveFeedback();

  const { formatMessage } = useIntl();
  const ReceiptValidationSchema = yup.object().shape({
    [FEEDBACK_FORM_KEY.orderId]: yup.number().required(),
    [FEEDBACK_FORM_KEY.content]: yup.string().required(
      formatMessage({
        id: 'user.orders.feedback.fields.content.null',
        defaultMessage: 'Please tell us how you feel about the service!',
      }),
    ),
    [FEEDBACK_FORM_KEY.star]: yup.number().required(
      formatMessage({
        id: 'user.orders.feedback.fields.star.null',
        defaultMessage: 'Please give us an overall rating!',
      }),
    ),
    [FEEDBACK_FORM_KEY.image]: yup.array().of(
      yup.object().shape({
        originFileObj: yup.mixed(),
      }),
    ),
  });

  const { control, getValues, trigger, watch } = useForm<TFeedbackFormFields>({
    defaultValues: {
      [FEEDBACK_FORM_KEY.orderId]: Number(orderId),
    },
    resolver: yupResolver<TFeedbackFormFields>(ReceiptValidationSchema) ?? null,
    mode: 'onTouched',
  });

  const finishedUploadingImages =
    !watch(FEEDBACK_FORM_KEY.image)?.some((image) => image.status === 'uploading') ?? true;

  const handleFeedback = async (body: TFeedbackFormFields) => {
    const isGoodToForward = await trigger();
    if (!isGoodToForward) return;

    mutate(body, {
      onSuccess: () => {
        notification.success({
          message: formatMessage({
            id: 'user.orders.feedback.submit.success',
            defaultMessage: 'Successfully add a Feedback for this order',
          }),
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
  const afterClose = () => {
    history.push(urlcat(PATH_USER_PROFILE_ORDER_DETAILS, { orderId }));
  };
  return {
    orderId,
    isOpen,
    setIsOpen,
    handleFeedback,
    isLoading: isLoading || !finishedUploadingImages,
    afterClose,
    control,
    getValues,
  } as const;
};

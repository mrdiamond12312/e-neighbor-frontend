import { yupResolver } from '@hookform/resolvers/yup';
import { history, useIntl, useParams } from '@umijs/max';
import { notification } from 'antd/lib';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import urlcat from 'urlcat';
import * as yup from 'yup';

import { PATH_ADMIN_PRODUCT_DETAIL } from '@/const/path';
import { useReviewProductApproval } from '@/services/products/services';

export enum PRODUCT_APPROVAL_FORM_KEY {
  rejectReason = 'rejectReason',
  isApproved = 'isConfirm',
  productId = 'productId',
}

export type TProductApprovalFormFields = {
  [PRODUCT_APPROVAL_FORM_KEY.rejectReason]?: string;
  [PRODUCT_APPROVAL_FORM_KEY.productId]: number;
  [PRODUCT_APPROVAL_FORM_KEY.isApproved]: boolean;
};

export const useProductApproval = () => {
  // Modal
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // URL Params
  const { productId } = useParams();

  const { formatMessage } = useIntl();
  const ProductApprovalFormValidationSchema = yup.object().shape({
    [PRODUCT_APPROVAL_FORM_KEY.productId]: yup.number().required(),
    [PRODUCT_APPROVAL_FORM_KEY.isApproved]: yup.boolean().required(),

    [PRODUCT_APPROVAL_FORM_KEY.rejectReason]: yup
      .string()
      .when(PRODUCT_APPROVAL_FORM_KEY.isApproved, {
        is: false,
        then: () =>
          yup.string().required(
            formatMessage({
              id: 'admin.product.approve.fields.rejectReason.null',
              defaultMessage: 'Please fill in your reason',
            }),
          ),
      }),
  });

  const { control, getValues, trigger, setValue } = useForm<TProductApprovalFormFields>({
    defaultValues: {
      [PRODUCT_APPROVAL_FORM_KEY.productId]: Number(productId),
      [PRODUCT_APPROVAL_FORM_KEY.isApproved]: true,
    },
    resolver: yupResolver<TProductApprovalFormFields>(ProductApprovalFormValidationSchema) ?? null,
    mode: 'onTouched',
  });

  const isApprovedOptions = [
    {
      value: true,
      label: formatMessage({
        id: 'admin.product.approve.fields.isApproved.approved',
        defaultMessage: 'Approved',
      }),
    },
    {
      value: false,
      label: formatMessage({
        id: 'admin.product.approve.fields.isApproved.rejected',
        defaultMessage: 'Rejected',
      }),
    },
  ];

  const isApprovedWatcher = useWatch({ control, name: PRODUCT_APPROVAL_FORM_KEY.isApproved });
  useEffect(() => {
    if (isApprovedWatcher) {
      setValue(PRODUCT_APPROVAL_FORM_KEY.rejectReason, undefined);
    }
  }, [isApprovedWatcher]);

  const { mutate, isLoading } = useReviewProductApproval();

  const handleReviewSubmit = async (body: TProductApprovalFormFields) => {
    // Validation
    const isGoodToForward = await trigger();

    // Submit
    if (isGoodToForward)
      mutate(body, {
        onSuccess: () => {
          notification.success({
            message: formatMessage(
              {
                id: 'admin.product.review.submit.success',
                defaultMessage: 'Successfully review Product #{productId}',
              },
              { productId },
            ),
            duration: 0.5,
            onClose: () => setIsOpen(false),
          });
        },
        onError: (error) => {
          notification.error({
            message: [error.statusCode, error.error].join(' - '),
            description: error.message,
            duration: 0.5,
            onClose: () => setIsOpen(false),
          });
        },
      });
  };

  const afterClose = () => {
    history.push(urlcat(PATH_ADMIN_PRODUCT_DETAIL, { productId }));
  };

  return {
    productId,
    isOpen,
    setIsOpen,
    handleReviewSubmit,
    isLoading,
    afterClose,
    control,
    getValues,
    isApprovedWatcher,
    isApprovedOptions,
  } as const;
};

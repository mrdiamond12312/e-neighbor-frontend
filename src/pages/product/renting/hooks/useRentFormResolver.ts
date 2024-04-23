import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@umijs/max';
import * as yup from 'yup';

import { RENTAL_INFO_KEYS } from '@/pages/product/renting/helpers/rentFormKeys';
export enum PAYMENT_GATEWAY {
  VNPAY = 'VNPAY',
  MOMO = 'MOMO',
}

export enum AVAILABLE_LOCALES {
  VI = 'vn',
  EN = 'en',
}

export type TRentingFormFields = {
  [RENTAL_INFO_KEYS.deliveryAddress]: string;
  [RENTAL_INFO_KEYS.productId]: number;
  [RENTAL_INFO_KEYS.rentTime]: string;
  [RENTAL_INFO_KEYS.returnTime]: string;
  [RENTAL_INFO_KEYS.dateRange]: string[];
  [RENTAL_INFO_KEYS.strategy]: PAYMENT_GATEWAY;
  [RENTAL_INFO_KEYS.locale]: AVAILABLE_LOCALES;
};

const useRentFormResolver = () => {
  const { formatMessage } = useIntl();
  const RentFormValidationSchema = yup.object().shape({
    [RENTAL_INFO_KEYS.deliveryAddress]: yup.string().required(
      formatMessage({
        id: 'rent.form.delivery-address.null',
        defaultMessage: 'Please input your delivery address',
      }),
    ),
    [RENTAL_INFO_KEYS.strategy]: yup
      .mixed<PAYMENT_GATEWAY>()
      .oneOf(Object.values(PAYMENT_GATEWAY))
      .required(),
    [RENTAL_INFO_KEYS.locale]: yup
      .mixed<AVAILABLE_LOCALES>()
      .oneOf(Object.values(AVAILABLE_LOCALES))
      .required(),
    [RENTAL_INFO_KEYS.productId]: yup.number().required(),
    [RENTAL_INFO_KEYS.rentTime]: yup.string().required(),
    [RENTAL_INFO_KEYS.returnTime]: yup.string().required(),
    [RENTAL_INFO_KEYS.dateRange]: yup
      .array()
      .required(
        formatMessage({
          id: 'rent.form.date-range.null',
          defaultMessage: 'Please input your rental time range!',
        }),
      )
      .of(yup.string().required())
      .length(
        2,
        formatMessage({
          id: 'rent.form.date-range.not.filled',
          defaultMessage: 'Please input both Rent Time and Return Time!',
        }),
      ),
  });

  return {
    FormSchema: yupResolver<TRentingFormFields>(RentFormValidationSchema),
  };
};

export default useRentFormResolver;

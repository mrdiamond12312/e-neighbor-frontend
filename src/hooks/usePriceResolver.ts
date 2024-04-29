import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@umijs/max';
import * as yup from 'yup';

import { STORE_FILTER } from '@/const/store.filter';
import { TStoreFields } from '@/hooks/usePriceFilter';

export const usePricingResolver = () => {
  const { formatMessage } = useIntl();
  const LoginValidationSchema = yup.object().shape({
    [STORE_FILTER.min]: yup
      .number()
      .typeError(
        formatMessage({ id: 'common.type.number.error', defaultMessage: 'Must be a number!' }),
      )
      .min(
        0,
        formatMessage({
          id: 'store.pricing.condition',
          defaultMessage: 'Min Price must larger than 0!',
        }),
      )
      .nullable()
      .transform((value, original) => (original === '' ? null : value)),
    [STORE_FILTER.max]: yup
      .number()
      .typeError(
        formatMessage({ id: 'common.type.number.error', defaultMessage: 'Must be a number!' }),
      )
      .min(
        0,
        formatMessage({
          id: 'store.pricing.condition',
          defaultMessage: 'Max Price must larger than 0!',
        }),
      )
      .moreThan(
        yup.ref(STORE_FILTER.min),
        formatMessage({
          id: 'store.pricing.max.condition.thanMin',
          defaultMessage: 'Max Price must larger than Min',
        }),
      )
      .nullable()
      .transform((value, original) => (original === '' ? null : value)),
  });

  return {
    FormSchema: yupResolver<TStoreFields>(LoginValidationSchema),
  };
};

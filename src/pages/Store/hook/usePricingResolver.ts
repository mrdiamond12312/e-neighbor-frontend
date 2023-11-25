import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useIntl } from '@umijs/max';
import { PRICING_FILTER } from '@/const/store.filter';

const usePricingResolver = () => {
  const { formatMessage } = useIntl();
  const LoginValidationSchema = yup.object().shape({
    [PRICING_FILTER.min]: yup
      .number()
      .typeError(
        formatMessage({ id: 'common.type.number.error', defaultMessage: 'Must be a number!' }),
      )
      .min(
        0,
        formatMessage({
          id: 'store.pricing.min.condition',
          defaultMessage: 'Min Price must larger than 0!',
        }),
      )
      .nullable()
      .transform((value, original) => (original === '' ? null : value)),
    [PRICING_FILTER.max]: yup
      .number()
      .typeError(
        formatMessage({ id: 'common.type.number.error', defaultMessage: 'Must be a number!' }),
      )
      .min(
        0,
        formatMessage({
          id: 'store.pricing.max.condition',
          defaultMessage: 'Max Price must larger than 0!',
        }),
      )
      .moreThan(
        yup.ref(PRICING_FILTER.min),
        formatMessage({
          id: 'store.pricing.max.condition.thanMin',
          defaultMessage: 'Max Price must larger than Min',
        }),
      )
      .nullable()
      .transform((value, original) => (original === '' ? null : value)),
  });

  return {
    FormSchema: yupResolver(LoginValidationSchema),
  };
};

export default usePricingResolver;

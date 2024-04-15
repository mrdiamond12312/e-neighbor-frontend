import { useIntl } from '@umijs/max';

import { TIME_UNIT } from '@/pages/lessor/products/add/helpers/addProductFormKeys';

export const useRentalTimeUnit = () => {
  const { formatMessage } = useIntl();
  const rentalTimeUnitOptions = (Object.keys(TIME_UNIT) as Array<keyof typeof TIME_UNIT>).map(
    (key) => ({
      label: formatMessage({ id: TIME_UNIT[key], defaultMessage: key }),
      value: TIME_UNIT[key],
    }),
  );
  return { formatMessage, rentalTimeUnitOptions } as const;
};

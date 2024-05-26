import { useIntl } from '@umijs/max';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { TRadioOption } from '@/components/Input/Radio';
import {
  ADD_PRODUCT_FORM_KEY,
  SURCHARGE_KEY,
  TProductFormField,
} from '@/pages/lessor/products/add/helpers/addProductFormKeys';
import { useSurchargesList } from '@/services/product-surcharges/services';

export const useAdditionalInfo = () => {
  const { formatMessage } = useIntl();
  const { watch, control } = useFormContext<TProductFormField>();
  const disabledInsuranceDetail = !watch(ADD_PRODUCT_FORM_KEY.haveInsurance);
  const { fields, append, remove } = useFieldArray({
    control,
    name: ADD_PRODUCT_FORM_KEY.surcharge,
  });

  const getFieldName = (index: number) => [ADD_PRODUCT_FORM_KEY.surcharge, index];

  const handleNewField = () => {
    append({ [SURCHARGE_KEY.surchargeId]: '', [SURCHARGE_KEY.price]: 0 });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  const { data, isLoading: surchargesLoading } = useSurchargesList();

  const surchargesOptions = surchargesLoading
    ? []
    : data?.map((record) => ({
        value: record.id,
        label: formatMessage({ id: record.name, defaultMessage: record.name }),
      }));

  const insuranceOptions: TRadioOption[] = [
    {
      value: true,
      label: formatMessage({ id: 'product.insurance.exist.yes', defaultMessage: 'Has Insurance' }),
    },
    {
      value: false,
      label: formatMessage({ id: 'product.insurance.exist.no', defaultMessage: 'No insurance' }),
    },
  ];
  return {
    formatMessage,
    insuranceOptions,
    disabledInsuranceDetail,
    fields,
    handleNewField,
    handleRemoveField,
    getFieldName,
    surchargesOptions,
    surchargesLoading,
  } as const;
};

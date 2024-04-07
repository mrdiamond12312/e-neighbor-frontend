import { useIntl } from '@umijs/max';
import { useFormContext } from 'react-hook-form';

import { TCheckboxOption } from '@/components/Input/Checkbox';
import { TRadioOption } from '@/components/Input/Radio';
import {
  carPolicyKeys,
  furniturePolicyKeys,
  policyKeys,
} from '@/pages/lessor/products/add/components/NewProductForm/RentalInfo/helpers/policyKeys';
import {
  ADD_PRODUCT_FORM_KEY,
  MORTGAGE,
  REQUIRED_DOCUMENTS,
  TProductFormField,
} from '@/pages/lessor/products/add/helpers/addProductFormKeys';

export const useRentalFieldForm = () => {
  const { formatMessage } = useIntl();
  const { watch } = useFormContext<TProductFormField>();

  const category = watch(ADD_PRODUCT_FORM_KEY['category']);
  const policies = category ? (category[0] ? carPolicyKeys : furniturePolicyKeys) : policyKeys;
  const policyOptions: TCheckboxOption[] = policies.map((policy) => ({
    label: formatMessage({ id: policy, defaultMessage: policy }),
    value: policy,
  }));

  const mortgageOptions: TRadioOption[] = (
    Object.keys(MORTGAGE) as Array<keyof typeof MORTGAGE>
  ).map((key) => ({
    label: formatMessage({ id: MORTGAGE[key], defaultMessage: MORTGAGE[key] }),
    value: MORTGAGE[key],
  }));

  const reqDocumentsOptions: TRadioOption[] = (
    Object.keys(REQUIRED_DOCUMENTS) as Array<keyof typeof REQUIRED_DOCUMENTS>
  ).map((key) => ({
    label: formatMessage({ id: REQUIRED_DOCUMENTS[key], defaultMessage: REQUIRED_DOCUMENTS[key] }),
    value: REQUIRED_DOCUMENTS[key],
  }));
  return { policyOptions, mortgageOptions, reqDocumentsOptions } as const;
};

import { PRICING_FILTER } from '@/const/store.filter';
import usePricingResolver from '@/pages/Store/hook/usePricingResolver';

import { useForm } from 'react-hook-form';

export type TPricingFields = {
  [PRICING_FILTER.min]?: number | null;
  [PRICING_FILTER.max]?: number | null;
};

export const usePricingFilter = () => {
  const { FormSchema } = usePricingResolver();
  const {
    control,
    formState: { errors, dirtyFields, isValid, isDirty },
    getValues,
    trigger,
    handleSubmit,
  } = useForm<TPricingFields>({
    defaultValues: {},
    resolver: FormSchema ?? null,
    mode: 'onTouched',
  });

  return {
    control,
    errors,
    dirtyFields,
    isValid,
    isDirty,
    getValues,
    trigger,
    handleSubmit,
  };
};

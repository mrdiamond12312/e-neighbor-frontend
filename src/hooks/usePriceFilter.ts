import { useForm } from 'react-hook-form';

import { STORE_FILTER } from '@/const/store.filter';
import { usePricingResolver } from '@/hooks/usePriceResolver';

export type TStoreFields = {
  [STORE_FILTER.min]?: number | null;
  [STORE_FILTER.max]?: number | null;
};

export const usePriceFilter = () => {
  const { FormSchema } = usePricingResolver();
  const {
    control,
    formState: { errors, dirtyFields, isValid, isDirty },
    getValues,
    watch,
    trigger,
    handleSubmit,
  } = useForm<TStoreFields>({
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
    watch,
  };
};

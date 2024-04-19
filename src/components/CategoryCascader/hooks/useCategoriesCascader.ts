import { useIntl } from '@umijs/max';
import { useState } from 'react';

import {
  ICascaderOption,
  categoriesOptions,
} from '@/components/CategoryCascader/helpers/cascade-helper';
import { getCategories } from '@/services/product-categories/api-services';

export const useCategoriesCascader = () => {
  const [options, setOptions] = useState<ICascaderOption[]>(categoriesOptions);
  const { formatMessage } = useIntl();
  const loadCascadeMenuData = (selectedOptions: ICascaderOption[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    getCategories({ isVehicle: targetOption.value ?? undefined }).then((data) => {
      targetOption.children = data?.map((category) => ({
        label: formatMessage({ id: category.name }),
        value: category.id,
      }));

      setOptions([...options]);
    });
  };
  return { options, loadCascadeMenuData, formatMessage } as const;
};

import { useIntl } from '@umijs/max';
import { useState } from 'react';

import { categoriesOptions, IOption } from '@/pages/lessor/products/add/helpers/productCategories';
import { getCategories } from '@/services/product-categories/api-services';

export const useCategoryCascader = () => {
  const [options, setOptions] = useState<IOption[]>(categoriesOptions);

  const { formatMessage } = useIntl();
  const loadCascadeMenuData = (selectedOptions: IOption[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    getCategories({ isVehicle: targetOption.value ?? undefined }).then((data) => {
      targetOption.children = data?.map((category) => ({
        label: formatMessage({ id: category.name }),
        value: category.id,
      }));

      setOptions([...options]);
    });
  };
  return { options, loadCascadeMenuData } as const;
};

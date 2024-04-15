import { Cascader } from 'antd/lib';
import React from 'react';

import { useCategoriesCascader } from '@/components/CategoryCascader/hooks/useCategoriesCascader';

export type TCategoryCascaderProps = {
  onCategoryChange: (categoryId: React.Key[]) => void;
  value: React.Key[];
  size: 'large' | 'middle' | 'small';
};

export const CategoryCascader: React.FC<TCategoryCascaderProps> = ({
  onCategoryChange,
  value,
  size,
}) => {
  const { options, loadCascadeMenuData } = useCategoriesCascader();
  return (
    <Cascader
      className="custom-cascader-select"
      options={options}
      onChange={(value) => {
        onCategoryChange(value);
      }}
      value={value as any[]}
      loadData={loadCascadeMenuData}
      size={size}
    />
  );
};

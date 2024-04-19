import { FormattedHTMLMessage } from '@umijs/max';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React from 'react';

import Button from '@/components/Button';
import { CategoryCascader } from '@/components/CategoryCascader';

export type TCategoryFilterProps = {
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  clearFilters?: () => void;
  selectedKeys: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
};

export const CategoryFilter: React.FC<TCategoryFilterProps> = ({
  setSelectedKeys,
  selectedKeys,
  clearFilters,
  confirm,
}) => {
  return (
    <section className="p-4 flex flex-col gap-2 items-end">
      <CategoryCascader
        onCategoryChange={(categoryId: React.Key[]) => {
          setSelectedKeys(categoryId);
          confirm({ closeDropdown: true });
        }}
        value={selectedKeys}
        size="middle"
      />
      <Button
        onClick={() => {
          if (clearFilters) clearFilters();
          confirm({ closeDropdown: true });
        }}
        className="w-fit"
      >
        <FormattedHTMLMessage id="common.filter.clear" defaultMessage="Clear" />
      </Button>
    </section>
  );
};

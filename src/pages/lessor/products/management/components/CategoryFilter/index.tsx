import { FormattedHTMLMessage } from '@umijs/max';
import { Flex } from 'antd/lib';
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
    <section className="p-4 flex flex-col gap-2">
      <CategoryCascader
        onCategoryChange={(categoryId: React.Key[]) => setSelectedKeys(categoryId)}
        value={selectedKeys}
        size="middle"
      />
      <Flex className="flex-row gap-2">
        <Button
          onClick={() => {
            if (clearFilters) clearFilters();
            confirm({ closeDropdown: true });
          }}
          className="w-full"
        >
          <FormattedHTMLMessage id="common.filter.clear" defaultMessage="Clear" />
        </Button>
        <Button type="primary" onClick={() => confirm({ closeDropdown: true })} className="w-full">
          <FormattedHTMLMessage id="common.filter.confirm" defaultMessage="Confirm" />
        </Button>
      </Flex>
    </section>
  );
};

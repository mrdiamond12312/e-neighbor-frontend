import { useIntl } from '@umijs/max';
import { Menu } from 'antd';
import React from 'react';

export type TCategoriesProps = {
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
};

const Categories: React.FC<TCategoriesProps> = ({ setCategory }) => {
  const { formatMessage } = useIntl();
  const items = [
    {
      label: formatMessage({
        id: 'store.category.title',
        defaultMessage: 'Categories',
      }),
      key: 'category',
      children: [
        {
          label: formatMessage({
            id: 'store.category.transportation',
            defaultMessage: 'Transportations',
          }),
          key: 'category-transportation',
        },
        {
          label: formatMessage({
            id: 'store.category.utilities',
            defaultMessage: 'Household Utilities',
          }),
          key: 'category-utilities',
        },
      ],
    },
  ];
  return (
    <Menu
      onSelect={({ selectedKeys }) => setCategory(selectedKeys)}
      disabledOverflow={true}
      openKeys={['category']}
      className="category-menu"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      multiple
      items={items}
    />
  );
};

export default Categories;

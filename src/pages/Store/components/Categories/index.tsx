import FadeIn from '@/components/AnimationKit/FadeIn';
import { useIntl } from '@umijs/max';
import { Menu } from 'antd';
import React from 'react';

export type TCategoriesProps = {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedKeys: string[];
};

const Categories: React.FC<TCategoriesProps> = ({ setCategory, selectedKeys }) => {
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
            id: 'store.category.vehicles',
            defaultMessage: 'Vehicles',
          }),
          key: 'vehicles',
        },
        {
          label: formatMessage({
            id: 'store.category.furniture',
            defaultMessage: 'Furnitures',
          }),
          key: 'furnitures',
        },
      ],
    },
  ];
  return (
    <FadeIn direction="left" className="w-full" index={1}>
      <Menu
        onSelect={({ selectedKeys }) => setCategory(selectedKeys.join(''))}
        disabledOverflow={true}
        openKeys={['category']}
        className="category-menu"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
      />
    </FadeIn>
  );
};

export default Categories;

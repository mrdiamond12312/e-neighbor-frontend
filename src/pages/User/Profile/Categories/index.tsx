import { useIntl } from '@umijs/max';
import { Menu } from 'antd';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';

export type TCategoriesProps = {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedKeys: string[];
};

const UserCategories: React.FC<TCategoriesProps> = ({ setCategory, selectedKeys }) => {
  const { formatMessage } = useIntl();
  const items = [
    {
      label: formatMessage({
        id: 'user.category.title',
        defaultMessage: 'My Account',
      }),
      key: 'category',
      children: [
        {
          label: formatMessage({
            id: 'user.category.user_information',
            defaultMessage: 'Information',
          }),
          key: 'user_information',
        },
        {
          label: formatMessage({
            id: 'user.category.payment',
            defaultMessage: 'Payment',
          }),
          key: 'payment',
        },
        {
          label: formatMessage({
            id: 'user.category.order',
            defaultMessage: 'Order',
          }),
          key: 'order',
        },
        {
          label: formatMessage({
            id: 'user.category.wishlist',
            defaultMessage: 'Wishlist',
          }),
          key: 'wishlist',
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

export default UserCategories;

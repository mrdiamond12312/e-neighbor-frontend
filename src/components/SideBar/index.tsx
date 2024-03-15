import type { MenuProps } from 'antd';
import { Menu } from 'antd/lib';
import React from 'react';

import { useLocationMenuKeys } from '@/components/SideBar/hooks/useLocationMenuKeys';

type MenuItem = Required<MenuProps>['items'][number];

export const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem =>
  ({
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem);

export type TSideBarProps = {
  items: MenuItem[];
};

export const SideBar: React.FC<TSideBarProps> = ({ items }) => {
  const { defaultActiveKey } = useLocationMenuKeys(items);

  return (
    <div>
      <Menu
        defaultSelectedKeys={defaultActiveKey}
        mode="inline"
        inlineCollapsed={false}
        items={items}
      />
    </div>
  );
};

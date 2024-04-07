import { LeftOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd/lib';
import classNames from 'classnames';
import React, { useState } from 'react';

import Button from '@/components/Button';
import Logo from '@/components/Logo';
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
  containerClassName?: string;
  menuClassName?: string;
  hideCollapseBtn?: boolean;
};

export const SideBar: React.FC<TSideBarProps> = ({
  items,
  containerClassName,
  menuClassName,
  hideCollapseBtn = false,
}) => {
  const { defaultActiveKey } = useLocationMenuKeys(items);

  const [isCollapsed, setCollapsed] = useState<boolean>(false);

  const combinedContainerClassName = classNames(
    'relative h-[100vh] flex flex-col justify-between items-center px-3 border-dashed border-r-[1px] bg-neutral-1/30 custom-container-collapsed',
    { 'w-[252px]': !isCollapsed, 'w-20': isCollapsed },

    containerClassName,
  );
  const combinedMenuClassName = classNames('custom-sidebar', menuClassName);

  const collapsedBtnCss = classNames(
    'rounded-full p-0 text-center flex justify-center items-center h-fit absolute -right-3 top-[43px] z-20',
    { hidden: hideCollapseBtn },
  );
  const collapsedSignCss = classNames('p-1 transition-all', {
    'rotate-180': isCollapsed,
  });

  const handleCollapsedButton = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={combinedContainerClassName}>
      <div className="flex flex-row gap-2 justify-center items-center h-14 w-full">
        <Logo collapsedLogoText={isCollapsed} />
      </div>
      <Button type="primary" onClick={handleCollapsedButton} className={collapsedBtnCss}>
        <LeftOutlined className={collapsedSignCss} />
      </Button>
      <Menu
        mode="inline"
        inlineCollapsed={isCollapsed}
        selectedKeys={defaultActiveKey}
        items={items}
        className={combinedMenuClassName}
      />
    </div>
  );
};

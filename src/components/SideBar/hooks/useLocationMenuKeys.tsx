import { useLocation } from '@umijs/max';
import { MenuProps } from 'antd';
import { useCallback } from 'react';

export type MenuItem = Required<MenuProps>['items'][number];

export const useLocationMenuKeys = (items: MenuItem[]) => {
  const { pathname } = useLocation();

  const isActive = useCallback(
    (currentPath: string): boolean => {
      return currentPath.startsWith(pathname);
    },
    [pathname],
  );

  const findActiveKey = (items: any[]): string => {
    let activeKey = '';
    items?.forEach((item) => {
      if (item?.children) {
        const childActiveKey = findActiveKey(item.children);
        if (childActiveKey) {
          activeKey = childActiveKey; // Return child active key if found
        }
      } else if (isActive(item?.key)) {
        activeKey = item.key;
      }
    });
    return activeKey;
  };

  const defaultActiveKey = [findActiveKey(items)];

  return {
    defaultActiveKey,
  };
};

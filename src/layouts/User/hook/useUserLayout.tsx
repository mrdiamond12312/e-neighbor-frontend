import { history, useIntl, useLocation, useModel } from '@umijs/max';

import {
  PATH_USER_PROFILE_EDIT,
  PATH_USER_PROFILE_ORDERS,
  PATH_USER_PROFILE_WALLET,
  PATH_USER_PROFILE_WISHLIST,
} from '@/const/path';

export type TBreadCrumbsObj = {
  key: string;
  to: string;
  title: React.ReactNode;
};

export const LESSOR_BREADCRUMBS_FORMATID_HEADER = 'lessor.breadcrumbs';
export const useUserLayout = () => {
  const { loading, initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();
  const tabsItem = [
    {
      key: PATH_USER_PROFILE_EDIT,
      label: formatMessage({
        id: 'user.profile.menu.accountInfo',
        defaultMessage: 'Account Information',
      }),
    },
    {
      key: PATH_USER_PROFILE_ORDERS,
      label: formatMessage({
        id: 'user.profile.menu.orders',
        defaultMessage: 'Orders',
      }),
    },
    {
      key: PATH_USER_PROFILE_WALLET,
      label: formatMessage({
        id: 'user.profile.menu.wallet',
        defaultMessage: 'My Wallet',
      }),
      disabled: true,
    },
    {
      key: PATH_USER_PROFILE_WISHLIST,
      label: formatMessage({
        id: 'user.profile.menu.wishlist',
        defaultMessage: 'Wishlist',
      }),
      disabled: true,
    },
  ];

  const handleTabChange = (activeKey: string) => {
    history.push(activeKey);
  };

  const defaultActiveTabKey = () => {
    let item;
    for (item of tabsItem) {
      if (pathname.includes(item.key)) return item.key;
    }
    return pathname;
  };

  return {
    loading,
    initialState,
    currentUser,
    tabsItem,
    handleTabChange,
    formatMessage,
    defaultActiveTabKey: defaultActiveTabKey(),
  } as const;
};

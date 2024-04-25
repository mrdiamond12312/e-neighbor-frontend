import { history, useIntl, useLocation, useModel } from '@umijs/max';

import { PATH_USER_OVERVIEW, PATH_USER_PROFILE_EDIT } from '@/const/path';

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
      key: PATH_USER_OVERVIEW,
      label: formatMessage({
        id: 'user.profile.menu.overview',
        defaultMessage: 'Overview',
      }),
    },
    {
      key: PATH_USER_PROFILE_EDIT,
      label: formatMessage({
        id: 'user.profile.menu.edit-profile',
        defaultMessage: 'Edit Information',
      }),
    },
  ];

  const handleTabChange = (activeKey: string) => {
    history.push(activeKey);
  };

  return {
    loading,
    initialState,
    currentUser,
    tabsItem,
    handleTabChange,
    formatMessage,
    defaultActiveTabKey: pathname,
  } as const;
};

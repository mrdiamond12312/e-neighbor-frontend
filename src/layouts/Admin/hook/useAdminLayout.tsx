import { ChartLineUp, Storefront } from '@phosphor-icons/react';
import { FormattedHTMLMessage, Link, NavLink, useLocation, useModel } from '@umijs/max';
import { useState } from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import type { MenuItem } from '@/components/SideBar/hooks/useLocationMenuKeys';
import {
  PATH_ADMIN,
  PATH_ADMIN_DASHBOARD,
  PATH_ADMIN_LOGIN,
  PATH_ADMIN_PRODUCTS,
} from '@/const/path';
import { containsDigits } from '@/utils/validator';

export type TBreadCrumbsObj = {
  key: string;
  to: string;
  title: React.ReactNode;
};

export const ICON_SIZE = 20;
export const ADMIN_BREADCRUMBS_FORMATID_HEADER = 'admin.breadcrumbs';

export const useAdminLayout = () => {
  const { loading, initialState } = useModel('@@initialState');
  const { pathname } = useLocation();
  const isAtAdminLoginPage = pathname === PATH_ADMIN_LOGIN;

  const sideBarItems: MenuItem[] = [
    {
      label: (
        <Link to={PATH_ADMIN_DASHBOARD}>
          <FormattedHTMLMessage id="admin.sidebar.dashboard" defaultMessage="Dashboard" />
        </Link>
      ),
      key: PATH_ADMIN_DASHBOARD,
      icon: <ChartLineUp size={ICON_SIZE} />,
    },
    {
      label: (
        <FormattedHTMLMessage
          id="admin.sidebar.products.management"
          defaultMessage="Products Management"
        />
      ),
      key: 'sub-menu-property-management',
      icon: <Storefront size={ICON_SIZE} />,
      children: [
        {
          label: (
            <Link to={PATH_ADMIN_PRODUCTS}>
              <FormattedHTMLMessage
                id="admin.sidebar.products.approval.all"
                defaultMessage="Approval Requests"
              />
            </Link>
          ),
          key: PATH_ADMIN_PRODUCTS,
        },
      ],
    },
  ];
  const breadCrumbItems = pathname
    .split('/')
    .filter((crumb) => crumb)
    .reduce((acc: TBreadCrumbsObj[], part, index, array) => {
      const className = index === array.length - 1 ? 'breadcrumb-active' : 'breadcrumb';
      if (index === 0) {
        const formatId = [ADMIN_BREADCRUMBS_FORMATID_HEADER, part].join('.');
        const link = `/${part}`;
        acc.push({
          key: formatId,
          to: link,
          title: (
            <FadeIn direction="top" keyId={formatId} key={formatId}>
              <NavLink to={link === PATH_ADMIN ? PATH_ADMIN_DASHBOARD : link} className={className}>
                <FormattedHTMLMessage id={formatId} />
              </NavLink>
            </FadeIn>
          ),
        });
      } else {
        const previous = acc.at(-1);
        const formatId = [previous?.key ?? ADMIN_BREADCRUMBS_FORMATID_HEADER, part].join('.');
        const link = [previous?.to ?? '', part].join('/');
        acc.push({
          key: formatId,
          to: link,
          title: (
            <FadeIn direction="top" keyId={formatId} key={formatId}>
              <NavLink to={link} className={className}>
                <FormattedHTMLMessage id={formatId} />
              </NavLink>
            </FadeIn>
          ),
        });
      }
      return acc;
    }, [])
    .filter((item) => !containsDigits(item.key));

  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const handleDrawerBtn = () => setIsMenuDrawerOpen((prev) => !prev);
  return {
    loading,
    initialState,
    pathname,
    isAtAdminLoginPage,
    breadCrumbItems,
    sideBarItems,
    isMenuDrawerOpen,
    handleDrawerBtn,
  } as const;
};

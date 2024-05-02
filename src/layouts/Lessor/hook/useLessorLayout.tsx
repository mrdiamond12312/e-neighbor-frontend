import { ChartLineUp, Invoice, Storefront } from '@phosphor-icons/react';
import { FormattedHTMLMessage, Link, NavLink, useLocation, useModel } from '@umijs/max';
import { useState } from 'react';

import { containsDigits } from '../../../utils/validator/index';

import FadeIn from '@/components/AnimationKit/FadeIn';
import type { MenuItem } from '@/components/SideBar/hooks/useLocationMenuKeys';
import {
  PATH_LESSOR,
  PATH_LESSOR_ADD_PRODUCT,
  PATH_LESSOR_DASHBOARD,
  PATH_LESSOR_ONBOARDING,
  PATH_LESSOR_ORDERS,
  PATH_LESSOR_PRODUCTS_MANAGE,
} from '@/const/path';

export type TBreadCrumbsObj = {
  key: string;
  to: string;
  title: React.ReactNode;
};

export const ICON_SIZE = 20;
export const LESSOR_BREADCRUMBS_FORMATID_HEADER = 'lessor.breadcrumbs';

export const useLessorLayout = () => {
  const { loading, initialState } = useModel('@@initialState');
  const { pathname } = useLocation();
  const isAtOnboardingPage = pathname === PATH_LESSOR_ONBOARDING;
  const sideBarItems: MenuItem[] = [
    {
      label: (
        <Link to={PATH_LESSOR_DASHBOARD}>
          <FormattedHTMLMessage id="lessor.sidebar.dashboard" defaultMessage="Dashboard" />
        </Link>
      ),
      key: PATH_LESSOR_DASHBOARD,
      icon: <ChartLineUp size={ICON_SIZE} />,
    },
    {
      label: (
        <FormattedHTMLMessage
          id="lessor.sidebar.products.management"
          defaultMessage="Products Management"
        />
      ),
      key: 'sub-menu-property-management',
      icon: <Storefront size={ICON_SIZE} />,
      children: [
        {
          label: (
            <Link to={PATH_LESSOR_PRODUCTS_MANAGE}>
              <FormattedHTMLMessage
                id="lessor.sidebar.products.management.all"
                defaultMessage="All Products"
              />
            </Link>
          ),
          key: PATH_LESSOR_PRODUCTS_MANAGE,
        },
        {
          label: (
            <Link to={PATH_LESSOR_ADD_PRODUCT}>
              <FormattedHTMLMessage
                id="lessor.sidebar.products.management.add"
                defaultMessage="Add a Product"
              />
            </Link>
          ),
          key: PATH_LESSOR_ADD_PRODUCT,
        },
      ],
    },
    {
      key: 'sub-menu-order-management',
      icon: <Invoice size={ICON_SIZE} />,
      label: (
        <FormattedHTMLMessage
          id="lessor.sidebar.orders.management"
          defaultMessage="Orders Management"
        />
      ),
      children: [
        {
          key: PATH_LESSOR_ORDERS,
          label: (
            <Link to={PATH_LESSOR_ORDERS}>
              <FormattedHTMLMessage id="lessor.sidebar.orders.all" defaultMessage="All Orders" />
            </Link>
          ),
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
        const formatId = [LESSOR_BREADCRUMBS_FORMATID_HEADER, part].join('.');
        const link = `/${part}`;
        acc.push({
          key: formatId,
          to: link,
          title: (
            <FadeIn direction="top" keyId={formatId} key={formatId}>
              <NavLink
                to={link === PATH_LESSOR ? PATH_LESSOR_DASHBOARD : link}
                className={className}
              >
                <FormattedHTMLMessage id={formatId} />
              </NavLink>
            </FadeIn>
          ),
        });
      } else {
        const previous = acc.at(-1);
        const formatId = [previous?.key ?? 'lessor.breadcrumbs', part].join('.');
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
    isAtOnboardingPage,
    breadCrumbItems,
    sideBarItems,
    isMenuDrawerOpen,
    handleDrawerBtn,
  } as const;
};

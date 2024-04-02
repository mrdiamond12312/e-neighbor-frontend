import { PieChartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage, Link, Outlet, SelectLang, useLocation, useModel } from '@umijs/max';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import Avatar from '@/components/Avatar';
import { SideBar } from '@/components/SideBar';
import type { MenuItem } from '@/components/SideBar/hooks/useLocationMenuKeys';
import {
  PATH_LESSOR_DASHBOARD,
  PATH_LESSOR_PRODUCTS,
  PATH_LESSOR_ADD_PRODUCT,
  PATH_LESSOR_ORDERS,
  PATH_LESSOR_ORDERS_CANCELED,
  PATH_LESSOR_ONBOARDING,
} from '@/const/path';

const sideBarItems: MenuItem[] = [
  {
    label: (
      <Link to={PATH_LESSOR_DASHBOARD}>
        <FormattedHTMLMessage id="lessor.sidebar.dashboard" defaultMessage="Dashboard" />
      </Link>
    ),
    key: PATH_LESSOR_DASHBOARD,
    icon: <PieChartOutlined />,
  },
  {
    label: (
      <FormattedHTMLMessage
        id="lessor.sidebar.products.management"
        defaultMessage="Products Management"
      />
    ),
    key: 'sub-menu-property-management',
    icon: <ShoppingOutlined />,
    children: [
      {
        label: (
          <Link to={PATH_LESSOR_PRODUCTS}>
            <FormattedHTMLMessage
              id="lessor.sidebar.products.management.all"
              defaultMessage="All Products"
            />
          </Link>
        ),
        key: PATH_LESSOR_PRODUCTS,
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
      {
        key: PATH_LESSOR_ORDERS_CANCELED,
        label: (
          <Link to={PATH_LESSOR_ORDERS_CANCELED}>
            <FormattedHTMLMessage
              id="lessor.sidebar.orders.canceled"
              defaultMessage="Canceled Orders"
            />
          </Link>
        ),
      },
    ],
  },
];

const LessorLayout: React.FC = () => {
  const { loading, initialState } = useModel('@@initialState');
  const { pathname } = useLocation();
  return (
    <section className="flex flex-row h-[100vh]">
      {!(pathname === PATH_LESSOR_ONBOARDING) && (
        <FadeIn direction="left" className="z-30">
          <SideBar items={sideBarItems} containerClassName="sticky top-[56px] left-0" />
        </FadeIn>
      )}
      <section className="h-[100vh] w-full flex flex-col justify-start items-center">
        <FadeIn
          direction="top"
          className="w-full h-14 py-2 px-8 bg-neutral-1/30 backdrop-blur shadow flex flex-row justify-between z-20 "
        >
          <div className="flex flex-row items-center h-full gap-2 header-right-container">
            <span className="text-heading-4 text-teal-7">
              <FormattedHTMLMessage id="lessor.menu.title" defaultMessage="Lessor Channel" />
            </span>
          </div>
          <div className="flex flex-row items-center h-full gap-2 header-left-container">
            <Avatar currentUser={initialState?.currentUser} loading={loading} />
            <SelectLang className="text-teal-2" />
          </div>
        </FadeIn>
        <Outlet />
      </section>
    </section>
  );
};

export default LessorLayout;

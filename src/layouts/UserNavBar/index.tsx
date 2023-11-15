import React, { Fragment } from 'react';
import routes from '@/../config/routes';
import { Outlet } from '@umijs/max';
import NavBar from '@/layouts/UserNavBar/components/NavBar';

const UserNavBar: React.FC<TComponentsProps> = ({ children }) => {
  console.log(routes);
  return (
    <Fragment>
      <NavBar />

      <Outlet />
      {children}
    </Fragment>
  );
};

export default UserNavBar;

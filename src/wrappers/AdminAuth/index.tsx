import { Navigate, Outlet, useAccess, useLocation } from '@umijs/max';
import React from 'react';

import { PATH_ADMIN, PATH_ADMIN_DASHBOARD, PATH_ADMIN_LOGIN } from '@/const/path';

const AdminAuth: React.FC = () => {
  const { isAdmin } = useAccess();

  const { pathname } = useLocation();

  const adminRedirectPath = [PATH_ADMIN, PATH_ADMIN_LOGIN];

  if (!isAdmin && pathname !== PATH_ADMIN_LOGIN)
    return <Navigate state={{ from: pathname }} to={PATH_ADMIN_LOGIN} replace />;

  if (isAdmin && pathname === PATH_ADMIN_LOGIN)
    return <Navigate to={PATH_ADMIN_DASHBOARD} replace />;

  if (isAdmin && adminRedirectPath.includes(pathname))
    return <Navigate to={PATH_ADMIN_DASHBOARD} replace />;

  if (isAdmin) return <Outlet />;

  return <Outlet />;
};

export default AdminAuth;

import { Navigate, Outlet, useAccess, useLocation } from '@umijs/max';
import React from 'react';

import { PATH_LOGIN } from '@/const/path';

const Auth: React.FC = () => {
  const { isGuest, isUser, isLessor } = useAccess();

  const { pathname } = useLocation();

  if (isGuest) return <Navigate state={{ from: pathname }} to={PATH_LOGIN} replace />;

  if (isLessor || isUser) return <Outlet />;
  return <Outlet />;
};

export default Auth;

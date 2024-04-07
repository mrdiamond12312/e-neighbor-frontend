import { Navigate, Outlet, useAccess, useLocation } from '@umijs/max';
import React from 'react';

import {
  PATH_LESSOR,
  PATH_LESSOR_DASHBOARD,
  PATH_LESSOR_ONBOARDING,
  PATH_LOGIN,
} from '@/const/path';

const LessorAuth: React.FC = () => {
  const { isGuest, isUser, isLessor } = useAccess();

  const { pathname } = useLocation();

  const lessorRedirectPath = [PATH_LESSOR_ONBOARDING, PATH_LESSOR];

  if (isGuest) return <Navigate state={{ from: pathname }} to={PATH_LOGIN} replace />;

  if (isUser && pathname !== PATH_LESSOR_ONBOARDING)
    return <Navigate to={PATH_LESSOR_ONBOARDING} replace />;

  if (isLessor && lessorRedirectPath.includes(pathname))
    return <Navigate to={PATH_LESSOR_DASHBOARD} replace />;

  if (isLessor) return <Outlet />;

  return <Outlet />;
};

export default LessorAuth;

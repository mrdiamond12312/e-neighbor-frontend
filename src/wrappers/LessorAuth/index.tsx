import { Navigate, Outlet, useAccess, useLocation } from '@umijs/max';
import React from 'react';

import { PATH_LESSOR_ONBOARDING, PATH_LOGIN } from '@/const/path';

const LessorAuth: React.FC = () => {
  const { isGuest, isUser, isLessor } = useAccess();

  const { pathname } = useLocation();

  if (isGuest) {
    return <Navigate to={PATH_LOGIN} replace />;
  }

  if (isUser && pathname !== PATH_LESSOR_ONBOARDING) {
    return <Navigate to={PATH_LESSOR_ONBOARDING} replace />;
  }

  if (isLessor) return <Outlet />;

  return <Outlet />;
};

export default LessorAuth;

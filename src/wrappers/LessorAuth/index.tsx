import { PATH_LESSOR_ONBOARDING, PATH_LOGIN } from '@/const/path';
import { Navigate, Outlet, useAccess } from '@umijs/max';
import React from 'react';

const LessorAuth: React.FC = () => {
  const { isGuest, isUser, isLessor } = useAccess();

  console.log(useAccess());

  if (isGuest) {
    return <Navigate to={PATH_LOGIN} replace />;
  }

  if (isUser) {
    return <Navigate to={PATH_LESSOR_ONBOARDING} replace />;
  }

  if (isLessor) return <Outlet />;

  return <Outlet />;
};

export default LessorAuth;

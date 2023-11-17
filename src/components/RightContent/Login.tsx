import { PATH_LOGIN } from '@/const/path';
import { Link } from '@umijs/max';
import React from 'react';

const Login: React.FC = () => {
  return (
    <Link
      to={PATH_LOGIN}
      reloadDocument
      className="px-2 flex justify-center align-center w-fit relative menu-item "
    >
      <div className="flex justify-center items-center text-neutral-1 hover:text-neutral-1 px-2 ">
        <p className="h-fit text-body-2-semibold leading-normal my-auto">Login</p>
      </div>
    </Link>
  );
};

export default Login;

import { Spin } from 'antd';
import React from 'react';

import { AvatarDropdown } from '@/components';

export interface IAvatar {
  currentUser: API.TAuthProfile | undefined;
  loading: boolean;
}

const Avatar: React.FC<IAvatar> = ({ currentUser, loading }) => {
  return loading ? (
    <Spin />
  ) : (
    <AvatarDropdown>
      <div className="flex flex-row gap-2 bg-teal-2 rounded-full items-center justify-center p-2">
        <img
          src={currentUser?.avatar ?? ''}
          key="menu-user-avatar"
          className="w-[26px] h-[26px] object-cover rounded-full"
        ></img>
        <span className="text-body-2-regular text-neutral-1" key="menu-user-name">
          {currentUser?.fullName}
        </span>
      </div>
    </AvatarDropdown>
  );
};

export default Avatar;

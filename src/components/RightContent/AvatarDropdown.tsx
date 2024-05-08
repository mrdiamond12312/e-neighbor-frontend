import { LogoutOutlined, SettingOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl, useModel, history, useLocation } from '@umijs/max';
import { Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';

import HeaderDropdown from '../HeaderDropdown';

import Login from '@/components/RightContent/Login';
import { PATH_ADMIN, PATH_LESSOR, PATH_USER_PROFILE_EDIT } from '@/const/path';
import { handleLogout } from '@/services/auth/services';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.fullName ?? currentUser?.userName}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu = 1, children }) => {
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { formatMessage } = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { pathname } = useLocation();
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;

      switch (key) {
        case 'personal-information': {
          history.replace({
            pathname: PATH_USER_PROFILE_EDIT,
          });
          return;
        }
        case 'logout': {
          flushSync(() => {
            setInitialState((s) => ({ ...s, currentUser: undefined }));
          });
          handleLogout();
          return;
        }

        case 'admin': {
          history.replace({
            pathname: PATH_ADMIN,
          });
          return;
        }

        case 'lessor': {
          history.replace({
            pathname: PATH_LESSOR,
          });
          return;
        }
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser) {
    return <Login />;
  }

  const menuItems = [
    ...(currentUser?.role === 'admin'
      ? [
          {
            key: 'admin',
            icon: <SettingOutlined />,
            label: formatMessage({
              id: 'menu.avatar.dropdown.admin',
              defaultMessage: 'To Admin Page',
            }),
          },
        ]
      : []),
    ...(menu
      ? [
          {
            key: 'personal-information',
            icon: <UserOutlined />,
            label: formatMessage({
              id: 'menu.avatar.dropdown.userInfo',
              defaultMessage: 'User Information',
            }),
          },
          {
            key: 'lessor',
            icon: <ShopOutlined />,
            label: formatMessage({
              id: 'menu.avatar.dropdown.lessor.channel',
              defaultMessage: 'To Lessor Channel',
            }),
            disabled: pathname.startsWith(PATH_LESSOR) || currentUser?.role === 'admin',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: formatMessage({ id: 'menu.avatar.dropdown.logout', defaultMessage: 'Log out' }),
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};

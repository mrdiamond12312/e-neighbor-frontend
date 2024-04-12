import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl, useModel, history, useLocation } from '@umijs/max';
import { Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';

import HeaderDropdown from '../HeaderDropdown';

import Login from '@/components/RightContent/Login';
import { PATH_LESSOR, PATH_USER_PROFILE } from '@/const/path';
import { handleLogout } from '@/services/auth/services';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.fullName}</span>;
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
        case 'logout': {
          flushSync(() => {
            setInitialState((s) => ({ ...s, currentUser: undefined }));
          });
          handleLogout();
          return;
        }

        case 'personal-information': {
          history.replace({
            pathname: PATH_USER_PROFILE,
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
    ...(menu
      ? [
          {
            key: 'personal-information',
            icon: <UserOutlined />,
            label: formatMessage({
              id: 'menu.avatar.dropdown.userInfo',
              defaultMessage: 'User Information',
            }),
            disabled: pathname.startsWith(PATH_USER_PROFILE),
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            key: 'lessor',
            icon: <UserOutlined />,
            label: formatMessage({
              id: 'menu.avatar.dropdown.lessor.channel',
              defaultMessage: 'To Lessor Channel',
            }),
            disabled: pathname.startsWith(PATH_LESSOR),
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

import React from 'react';
import Settings from '@/../config/defaultSettings';
import { useIntl } from '@umijs/max';

const NavBar: React.FC = () => {
  const { formatMessage } = useIntl();
  const { logo, title } = Settings;

  const menuData = [
    {
      key: 'menu.nav.Home',
      name: formatMessage({
        id: 'menu.nav.Home',
        defaultMessage: 'Landing Page',
      }),
      path: '/home',
    },
  ];

  return (
    <div className="bg-teal-4 w-full text-neutral-1">
      <nav className="flex flex-row h-14 max-w-7xl w-full m-auto">
        <div className="flex flex-row py-3 justify-center items-center gap-2">
          <img className="h-full" src={logo} />
          <p className="text-heading-4">{title}</p>
        </div>
        <ul className="m-0">
          {menuData.map((route) => (
            <li key={route.key}>{route.name}</li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

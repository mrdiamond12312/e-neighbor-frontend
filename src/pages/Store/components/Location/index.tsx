import { useIntl } from '@umijs/max';
import { Menu } from 'antd';
import React from 'react';

export type TLocationsProps = {
  setLocations: React.Dispatch<React.SetStateAction<string[]>>;
};

const Locations: React.FC<TLocationsProps> = ({ setLocations }) => {
  const { formatMessage } = useIntl();
  const items = [
    {
      label: formatMessage({
        id: 'store.location.title',
        defaultMessage: 'Locations',
      }),
      key: 'location',
      children: [
        {
          label: formatMessage({
            id: 'store.location.HCM',
            defaultMessage: 'Ho Chi Minh City',
          }),
          key: 'HCMC',
        },
        {
          label: formatMessage({
            id: 'store.location.HN',
            defaultMessage: 'Hanoi Capital',
          }),
          key: 'HN',
        },
        {
          label: formatMessage({
            id: 'store.location.else',
            defaultMessage: 'Else >',
          }),
          key: '*',
        },
      ],
    },
  ];
  return (
    <Menu
      onSelect={({ selectedKeys }) => setLocations(selectedKeys)}
      disabledOverflow={true}
      openKeys={['location']}
      className="category-menu"
      mode="inline"
      multiple
      items={items}
    />
  );
};

export default Locations;

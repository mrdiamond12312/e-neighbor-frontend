import { useIntl } from '@umijs/max';
import { Menu } from 'antd';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';

export type TLocationsProps = {
  setLocations: (location: string[]) => void;
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
    <FadeIn direction="left" className="w-full" index={2} keyId="railing-location">
      <Menu
        onSelect={({ selectedKeys }) => setLocations(selectedKeys)}
        disabledOverflow={true}
        openKeys={['location']}
        className="category-menu"
        mode="inline"
        multiple
        items={items}
      />
    </FadeIn>
  );
};

export default Locations;

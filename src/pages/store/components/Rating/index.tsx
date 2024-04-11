import { useIntl } from '@umijs/max';
import { Card, Rate } from 'antd/lib';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';

export interface IRatingRailProps {
  ratingHandler: (value: number) => void;
}

export const Rating: React.FC<IRatingRailProps> = ({ ratingHandler }) => {
  const { formatMessage } = useIntl();
  return (
    <FadeIn direction="left" exitDirection="left" className="w-full" index={3} key="railing-rating">
      <Card
        title={formatMessage({
          id: 'store.rating.title',
          defaultMessage: 'Ratings',
        })}
        className="railing-card h-full"
      >
        <Rate className="custom-star animate-pulse" onChange={ratingHandler} />
      </Card>
    </FadeIn>
  );
};

import React from 'react';

export interface ICardProps {
  imageSrc: string;
  title: string;
  owner: string;
  rating: number;
  tag: string;
  pricing: number;
  ctaBtnFormattedMessage: {
    id: string;
    defaultMessage: string;
  };
  ctaBtnFn: () => void;
}

export const PropertyCard: React.FC<ICardProps> = ({}) => {
  return <div> PropertyCard</div>;
};

import { Rate } from 'antd/lib';
import React from 'react';

import Button from '@/components/Button';
import Logo from '@/components/Logo';

export interface ICardProps {
  imageSrc?: string;
  title?: string;
  owner?: string;
  rating?: number;
  tag?: string;
  pricing?: number;
  pricingCurrency?: string;
  ctaBtnFormattedMessage?: string;
  ctaBtnFn?: () => void;
  type?: 'empty' | 'default';
}

export const PropertyCard: React.FC<ICardProps> = ({
  imageSrc,
  title,
  owner,
  ctaBtnFn,
  ctaBtnFormattedMessage,
  tag,
  rating,
  pricing,
  pricingCurrency,
  type = 'default',
}) => {
  // const { formatMessage } = useIntl();
  if (type === 'empty')
    return (
      <article className="w-64 h-[415px] bg-neutral-3 property-card overflow-clip flex flex-col items-center justify-center">
        <Logo />
      </article>
    );
  return (
    <article className="w-64 h-[415px] bg-teal-2 property-card overflow-clip">
      <img src={imageSrc} className="h-72 object-cover" />
      <div className="rounded-none bg-neutral-1 h-[calc(100%-288px)] card-information-container">
        <section className="h-full p-4 flex flex-col gap-2 card-information">
          <section className="flex flex-row gap-3 card-title-section ">
            <img src={owner} className="w-16 h-16 object-cover hidden opacity-0 avatar" />
            <section className="bg-neutral-1 flex flex-col gap-1 w-full title">
              <h2 className="truncate text-heading-5 text-teal-7 m-0">{title}</h2>
              <Button
                onClick={ctaBtnFn}
                className="w-full hidden bg-neutral-1 mix-blend-overlay text-teal-4 text-body-1-semibold border-none opacity-0 cta-btn"
              >
                {ctaBtnFormattedMessage}
              </Button>
            </section>
          </section>

          <section className="flex flex-col gap-1 card-price">
            <span className="text-teal-5 truncate text-body-2-medium card-tag">{tag}</span>

            <Rate value={rating} className="hidden card-rating" />
            <span className="text-teal-7 text-heading-5 card-price">
              {pricing} {pricingCurrency}
            </span>
          </section>
        </section>
      </div>
    </article>
  );
};

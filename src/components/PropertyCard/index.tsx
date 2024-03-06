import FlushReveal from '@/components/AnimationKit/FlushReveal';
import Button from '@/components/Button';
import { Rate } from 'antd/lib';
import React from 'react';

export interface ICardProps {
  imageSrc: string;
  title: string;
  owner: string;
  rating: number;
  tag: string;
  pricing: number;
  pricingCurrency: string;
  ctaBtnFormattedMessage: string;
  ctaBtnFn: () => void;
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
}) => {
  // const { formatMessage } = useIntl();
  return (
    <FlushReveal
      rootClassName="rounded"
      pointerClassName="bg-favicon bg-no-repeat bg-contain bg-center"
    >
      <article className="w-64 h-[415px] rounded bg-teal-2 property-card overflow-clip">
        <img src={imageSrc} className="h-72" />
        <div className="rounded-none bg-neutral-2 h-[calc(100%-288px)] card-information-container">
          <section className="h-full p-4 flex flex-col gap-2 card-information">
            <section className="flex flex-row gap-3 card-title-section ">
              <img src={owner} className="w-16 h-16 object-cover hidden opacity-0 avatar" />
              <section className="bg-neutral-2 flex flex-col gap-1 w-full title">
                <h2 className="truncate text-body-1-semibold text-teal-6">{title}</h2>
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
              <span className="text-teal-6 text-body-1-semibold card-price">
                {pricing} {pricingCurrency}
              </span>
            </section>
          </section>
        </div>
      </article>
    </FlushReveal>
  );
};

import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import React from 'react';

import FlushReveal from '@/components/AnimationKit/FlushReveal';
import { PropertyCard } from '@/components/PropertyCard';
import LoadingSkeleton from '@/pages/store/components/LoadingSkeleton';
import { useMostRatedProducts, useMostViewedProducts } from '@/services/products/services';

export interface IPopularProductsProps {
  isVehicle: boolean;
}

const PopularProducts: React.FC<IPopularProductsProps> = ({ isVehicle }) => {
  const { data: mostViewedProducts, isLoading: isLoadingMostViewed } = useMostViewedProducts({
    isVehicle,
    isConfirmedByAdmin: false,
  });

  const { data: mostRatedProducts, isLoading: isLoadingMostRated } = useMostRatedProducts({
    isVehicle,
    isConfirmedByAdmin: false,
  });

  const { formatMessage } = useIntl();

  return (
    <section className="flex flex-col gap-8 w-full basis-0">
      <span className="text-neutral-7 text-heading-3 w-full">
        <FormattedHTMLMessage
          id="store.products.preview.most.viewed"
          defaultMessage="Most Popular Products"
        />
      </span>

      <div className="flex flex-row flex-wrap gap-y-3 gap-x-2 w-full justify-center">
        {mostViewedProducts?.pages.map((page, pageIndex) =>
          page.data.map((item, index) => (
            <FlushReveal
              key={item.id}
              keyId={item.id}
              index={(pageIndex * page.data.length + index) * 6}
              pointerClassName="bg-favicon bg-no-repeat bg-contain bg-center"
            >
              <PropertyCard
                ctaBtnFormattedMessage={formatMessage({
                  id: 'store.preview.card.btn.rent',
                  defaultMessage: 'Rent Now!',
                })}
                imageSrc={item.image}
                owner={item.lessorImage}
                pricing={item.price}
                pricingCurrency={formatMessage({ id: item.timeUnit, defaultMessage: '%Nan%' })}
                rating={item.rating}
                tag={item.category.name}
                key={item.id}
                title={item.name}
              />
            </FlushReveal>
          )),
        )}
        {isLoadingMostViewed && <LoadingSkeleton keyId="most-viewed" />}
      </div>

      <span className="text-neutral-7 text-heading-3 w-fit">
        <FormattedHTMLMessage
          id="store.products.preview.most.rated"
          defaultMessage="Trusted by Customers"
        />
      </span>

      <div className="flex flex-row flex-wrap gap-y-3 gap-x-2 w-full justify-center">
        {mostRatedProducts?.pages.map((page, pageIndex) =>
          page.data.map((item, index) => (
            <FlushReveal
              key={item.id}
              keyId={item.id}
              index={(pageIndex * page.data.length + index) * 6}
            >
              <PropertyCard
                ctaBtnFormattedMessage={formatMessage({
                  id: 'store.preview.card.btn.rent',
                  defaultMessage: 'Rent Now!',
                })}
                imageSrc={item.image}
                owner={item.lessorImage}
                pricing={item.price}
                pricingCurrency={formatMessage({ id: item.timeUnit, defaultMessage: '%Nan%' })}
                rating={item.rating}
                tag={item.category.name}
                key={item.id}
                title={item.name}
              />
            </FlushReveal>
          )),
        )}
        {isLoadingMostRated && <LoadingSkeleton keyId={'most-rated'} />}
      </div>
    </section>
  );
};

export default PopularProducts;

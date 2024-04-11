import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    isConfirmedByAdmin: true,
  });

  const { data: mostRatedProducts, isLoading: isLoadingMostRated } = useMostRatedProducts({
    isVehicle,
    isConfirmedByAdmin: true,
  });

  const navigate = useNavigate();

  const handleProductClick = (productId: string | number) => {
    navigate(`/product/${productId}/detail/`);
  };

  const { formatMessage } = useIntl();

  return (
    <section className="flex flex-col gap-4 w-full basis-0">
      <span className="text-neutral-7 text-heading-3 w-full">
        <FormattedHTMLMessage
          id="store.products.preview.most.viewed"
          defaultMessage="Most Popular Products"
        />
      </span>

      <div className="flex flex-row flex-wrap gap-y-3 gap-x-2 w-full justify-start">
        {mostViewedProducts?.pages.map((page, pageIndex) =>
          page.data.map((item, index) => (
            <FlushReveal
              key={item.id}
              keyId={item.id}
              index={(pageIndex * page.data.length + index) * 6}
              pointerClassName="bg-favicon bg-no-repeat bg-contain bg-center"
            >
              <div onClick={() => handleProductClick(item.id)}>
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
              </div>
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

      <div className="flex flex-row flex-wrap gap-y-3 gap-x-2 w-full justify-start">
        {mostRatedProducts?.pages.map((page, pageIndex) =>
          page.data.map((item, index) => (
            <FlushReveal key={item.id} keyId={item.id} index={pageIndex * page.data.length + index}>
              <div onClick={() => handleProductClick(item.id)}>
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
              </div>
            </FlushReveal>
          )),
        )}
        {isLoadingMostRated && <LoadingSkeleton keyId={'most-rated'} />}
      </div>
    </section>
  );
};

export default PopularProducts;

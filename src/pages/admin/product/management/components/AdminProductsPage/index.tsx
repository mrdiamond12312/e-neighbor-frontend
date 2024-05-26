import { FormattedHTMLMessage, getLocale, Link, useIntl } from '@umijs/max';
import { Empty } from 'antd/lib';
import React, { Fragment } from 'react';
import urlcat from 'urlcat';

import FlushReveal from '@/components/AnimationKit/FlushReveal';
import Button from '@/components/Button';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { PropertyCard } from '@/components/PropertyCard';
import { PATH_ADMIN_PRODUCT_DETAIL } from '@/const/path';

export interface IProductsPageProps {
  isLoading: boolean;
  products?: IPaginationResponse<API.IProductCard>;
}

const AdminProductsPage: React.FC<IProductsPageProps> = ({ isLoading, products }) => {
  const { formatMessage } = useIntl();
  return (
    <section className="flex flex-col gap-4 w-full basis-0 bg-neutral-1 p-4 rounded-lg border border-neutral-3">
      <div className="flex flex-row flex-wrap gap-y-3 gap-x-2 w-full justify-center">
        {products?.data.length === 0 ? (
          <Empty
            className="flex flex-col justify-center items-center h-[415px]"
            description={
              <span className="font-sans text-body-1-semibold text-neutral-6">
                <FormattedHTMLMessage
                  id="products.page.empty"
                  defaultMessage="0 Product was Found!"
                />
              </span>
            }
          />
        ) : (
          <Fragment>
            {products?.data.map((product, index) => (
              <FlushReveal
                key={product.id}
                keyId={product.id}
                index={index * 6}
                pointerClassName="bg-favicon bg-no-repeat bg-contain bg-center"
                contentClassName="rounded overflow-clip border border-neutral-3"
              >
                <Link to={urlcat(PATH_ADMIN_PRODUCT_DETAIL, { productId: product.id })}>
                  <PropertyCard
                    ctaNode={
                      <Button className="w-full hidden bg-neutral-1 mix-blend-overlay text-teal-4 text-body-1-semibold border-none opacity-0 cta-btn z-10">
                        <FormattedHTMLMessage
                          id="admin.product.card.review"
                          defaultMessage="Review"
                        />
                      </Button>
                    }
                    imageSrc={product.image}
                    owner={product.lessorImage}
                    pricing={product.price.toLocaleString(getLocale())}
                    pricingCurrency={formatMessage({
                      id: product.timeUnit,
                      defaultMessage: '%Nan%',
                    })}
                    rating={product.rating}
                    tag={formatMessage({
                      id: product.category.name,
                      defaultMessage: product.category.name,
                    })}
                    key={product.id}
                    title={product.name}
                  />
                </Link>
              </FlushReveal>
            ))}
            {Array((products?.meta.take ?? 0) - (products?.data.length ?? 0))
              .fill(0)
              .map((_, index) => (
                <FlushReveal
                  key={`index ${index}`}
                  keyId={`index ${index}`}
                  index={((products?.data.length ?? 0) + index) * 6}
                  pointerClassName="bg-favicon bg-no-repeat bg-contain bg-center"
                  contentClassName="rounded overflow-clip border border-neutral-3"
                >
                  <PropertyCard type="empty" />
                </FlushReveal>
              ))}
          </Fragment>
        )}
        {isLoading && <LoadingSkeleton keyId="most-viewed" />}
      </div>
    </section>
  );
};

export default AdminProductsPage;

import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, Col, ConfigProvider, Rate, Row } from 'antd/lib';
import React, { useState } from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import FlushReveal from '@/components/AnimationKit/FlushReveal';
import { PropertyCard } from '@/components/PropertyCard';
import Categories from '@/pages/store/components/Categories';
import { CoverSearchBox } from '@/pages/store/components/CoverSearchBox';
import Locations from '@/pages/store/components/Location';
import Pricing from '@/pages/store/components/Pricing';
import { useStoreFilter } from '@/pages/store/hook/useStoreFilter';

const Store: React.FC = () => {
  const [category, setCategory] = useState<string>('furnitures');
  const [locations, setLocations] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>();

  const { control, errors } = useStoreFilter();
  const { formatMessage } = useIntl();

  const searchBoxHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const currentSearchValue = event.currentTarget.value;
    if (currentSearchValue !== keyword) {
      setKeyword(currentSearchValue);
    }
  };

  console.log(category, locations, keyword);
  return (
    <ConfigProvider
      theme={{
        token: {
          screenXL: 1280,
          screenXLMin: 1280,
        },
      }}
    >
      <PageContainer className="w-full max-w-7xl m-auto">
        <FadeIn direction="top" keyId="main-page-container">
          <Row className="w-full py-4">
            <Col
              span={24}
              xl={4}
              className="max-h-[calc(100vh-88px)] sm:flex  flex-row xl:flex-col pb-4 xl:pb-0 gap-4 xl:sticky xl:top-[72px] overflow-auto px-2 hidden"
            >
              <Categories setCategory={setCategory} selectedKeys={(() => [category])()} />

              <Locations setLocations={setLocations} />

              <FadeIn direction="left" className="w-full" index={3} key="railing-rating">
                <Card
                  title={formatMessage({
                    id: 'store.rating.title',
                    defaultMessage: 'Ratings',
                  })}
                  className="railing-card h-full"
                >
                  <Rate className="custom-star animate-pulse" />
                </Card>
              </FadeIn>

              <Pricing control={control} error={errors} />
            </Col>
            <Col span={24} xl={20} className="flex flex-col gap-8 px-2">
              <CoverSearchBox onPressEnter={searchBoxHandler} category={category} />

              {
                // TO DO: Remove and add another component here for a list of rental property
              }
              <section className="flex flex-col gap-4 w-fit basis-0">
                <span className="text-neutral-7 text-heading-3 w-fit">Prototyping</span>
                <div className="flex flex-row flex-wrap gap-y-3 gap-x-2 w-fit justify-center">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <FlushReveal
                        pointerClassName="bg-favicon bg-no-repeat bg-contain bg-center"
                        key={`idk ${index}`}
                        index={index * 5}
                      >
                        <PropertyCard
                          ctaBtnFormattedMessage="Rent Now!"
                          imageSrc="https://hips.hearstapps.com/hmg-prod/images/dw-burnett-pcoty22-8260-1671143390.jpg?crop=0.668xw:1.00xh;0.184xw,0&resize=640:*"
                          owner="https://cdn.iconscout.com/icon/free/png-256/free-avatar-380-456332.png"
                          pricing={1000000}
                          pricingCurrency="VND/day"
                          rating={4.5}
                          tag="Car"
                          title="Yamahahahahahahahaha"
                        />
                      </FlushReveal>
                    ))}
                </div>
              </section>
            </Col>
          </Row>
        </FadeIn>
      </PageContainer>
    </ConfigProvider>
  );
};

export default Store;

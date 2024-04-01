import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, Col, ConfigProvider, Rate, Row } from 'antd/lib';
import React, { useState } from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import Categories from '@/pages/store/components/Categories';
import { CoverSearchBox } from '@/pages/store/components/CoverSearchBox';
import Locations from '@/pages/store/components/Location';
import PopularProducts from '@/pages/store/components/PopularProducts';
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
        <FadeIn direction="top" keyId="main-page-container" className="w-full">
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
              <PopularProducts isVehicle={category === 'vehicles'} />
            </Col>
          </Row>
        </FadeIn>
      </PageContainer>
    </ConfigProvider>
  );
};

export default Store;

import FadeIn from '@/components/AnimationKit/FadeIn';
import Categories from '@/pages/Store/components/Categories';
import { CoverSearchBox } from '@/pages/Store/components/CoverSearchBox';
import Locations from '@/pages/Store/components/Location';
import Pricing from '@/pages/Store/components/Pricing';
import { useStoreFilter } from '@/pages/Store/hook/useStoreFilter';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, Col, Rate, Row } from 'antd/lib';
import React, { useState } from 'react';

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
    <PageContainer className="w-full max-w-7xl m-auto ">
      <Row gutter={16} className="w-full py-4">
        <Col span={5} className="min-w-[209px] h-[calc(100vh-88px)] flex flex-col gap-4">
          <Categories setCategory={setCategory} selectedKeys={(() => [category])()} />
          <Locations setLocations={setLocations} />
          <FadeIn direction="left" className="w-full" index={3}>
            <Card
              title={formatMessage({
                id: 'store.rating.title',
                defaultMessage: 'Ratings',
              })}
              className="railing-card"
            >
              <Rate className="custom-star animate-pulse" />
            </Card>
          </FadeIn>
          <Pricing control={control} error={errors} />
        </Col>
        <Col span={19}>
          <CoverSearchBox onPressEnter={searchBoxHandler} category={category} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Store;

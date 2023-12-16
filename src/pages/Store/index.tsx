import Categories from '@/pages/Store/components/Categories';
import Locations from '@/pages/Store/components/Location';
import Pricing from '@/pages/Store/components/Pricing';
import { usePricingFilter } from '@/pages/Store/hook/usePricingForm';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, Col, Rate, Row } from 'antd';
import React, { useState } from 'react';

const Store: React.FC = () => {
  const [category, setCategory] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const { control, errors } = usePricingFilter();
  const { formatMessage } = useIntl();

  console.log(category, locations);
  return (
    <PageContainer className="w-full max-w-7xl m-auto ">
      <Row gutter={16} className="w-full py-4">
        <Col span={5} className="min-w-[209px] h-[calc(100vh-0px)] flex flex-col gap-2">
          <Categories setCategory={setCategory} />
          <Locations setLocations={setLocations} />
          <Card
            title={formatMessage({
              id: 'store.rating.title',
              defaultMessage: 'Ratings',
            })}
            className="railing-card"
          >
            <Rate className="custom-star animate-pulse" />
          </Card>
          <Card
            title={formatMessage({
              id: 'store.pricing.title',
              defaultMessage: 'Rental Price',
            })}
            className="railing-card"
          >
            <Pricing control={control} error={errors} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Store;

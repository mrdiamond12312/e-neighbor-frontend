import { PageContainer } from '@ant-design/pro-components';
import { Col, ConfigProvider, Row } from 'antd/lib';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import { ProductsPagination } from '@/components/ProductsPagination';
import { usePagination } from '@/hooks/usePagination';
import Categories from '@/pages/store/components/Categories';
import { CoverSearchBox } from '@/pages/store/components/CoverSearchBox';
import Locations from '@/pages/store/components/Location';
import PopularProducts from '@/pages/store/components/PopularProducts';
import Pricing from '@/pages/store/components/Pricing';
import ProductsPage from '@/pages/store/components/ProductsPage';
import { Rating } from '@/pages/store/components/Rating';
import { useProductPage } from '@/services/products/services';

const Store: React.FC = () => {
  const {
    category,
    categoryHandler,
    sortOptions,
    sortFieldHandler,
    sortField,
    control,
    keyword,
    locationHandler,
    ratingHandler,
    searchBoxHandler,
    paginationParams,
    order,
    orderHandler,
    orderOptions,
    page,
    pageHandler,
  } = usePagination();

  const { data: products, isLoading } = useProductPage(paginationParams);

  console.log(products);
  console.log(paginationParams);
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
        <FadeIn direction="top" exitDirection="top" keyId="main-page-container" className="w-full">
          <Row className="w-full py-4">
            <Col
              span={24}
              xl={4}
              className="max-h-[calc(100vh-88px)] sm:flex  flex-row xl:flex-col pb-4 xl:pb-0 gap-4 xl:sticky xl:top-[72px] overflow-auto px-2 hidden"
            >
              <Categories setCategory={categoryHandler} selectedKeys={(() => [category])()} />

              <Locations setLocations={locationHandler} />

              <Rating ratingHandler={ratingHandler} />

              <Pricing control={control} />
            </Col>
            <Col span={24} xl={20} className="flex flex-col gap-8 px-2 font-sans">
              <CoverSearchBox
                onPressEnter={searchBoxHandler}
                category={category}
                kwValue={keyword}
              />
              <ProductsPagination
                sortOptions={sortOptions}
                sortField={sortField}
                sortFieldHandler={sortFieldHandler}
                orderOptions={orderOptions}
                order={order}
                orderHandler={orderHandler}
                page={page}
                pageHandler={pageHandler}
                pageMeta={products?.meta}
                isLoading={isLoading}
              >
                <ProductsPage products={products} isLoading={isLoading} />
              </ProductsPagination>
              <PopularProducts isVehicle={paginationParams.isVehicle} />
            </Col>
          </Row>
        </FadeIn>
      </PageContainer>
    </ConfigProvider>
  );
};

export default Store;

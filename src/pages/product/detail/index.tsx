import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';
import { Col, Flex, Row, Tabs } from 'antd/lib';
import React, { Fragment } from 'react';

import { ImageGallery } from '@/components/ImageGallery';
import Loading from '@/loading';
import { ProductLanding } from '@/pages/product/detail/components/ProductLanding';
import { SurchargeInfo } from '@/pages/product/detail/components/SurchargeInfo';
import { useProductDetail } from '@/pages/product/detail/hooks/useProductDetail';
import { useTabs } from '@/pages/product/detail/hooks/useTabs';

export type TReusableProductDetailExtraProps = {
  action?: React.ReactNode;
  extra?: React.ReactNode;
};

const ProductDetail: React.FC<TReusableProductDetailExtraProps> = ({ extra, action }) => {
  const { data, isLoading, breadcrumbsItems, formatMessage, productId } = useProductDetail();
  const { tabs } = useTabs(data);

  return (
    <PageContainer
      className="max-h-[calc(100vh-56px)] w-full overflow-auto flex-col snap-mandatory snap-y snap-page-container"
      header={{ title: '1' }}
    >
      {isLoading ? (
        <Loading
          extra={formatMessage(
            {
              id: 'product.details.loading.description',
              defaultMessage: 'Loading Product #{productId}',
            },
            { productId },
          )}
        />
      ) : (
        data && (
          <Fragment>
            <Row
              gutter={8}
              className="justify-center max-w-7xl w-full min-h-[calc(100vh-56px)] items-center lg:snap-center"
              style={{ marginLeft: 0, marginRight: 0 }}
            >
              <Col lg={16} span={24}>
                <div className="p-4">
                  <ImageGallery images={data.images} />
                </div>
              </Col>
              <Col lg={8} span={24}>
                <ProductLanding
                  data={data}
                  breadcrumbsItems={breadcrumbsItems}
                  hideAction={extra || action ? true : false}
                  action={action}
                />
              </Col>
            </Row>
            <Row
              gutter={16}
              className="lg:snap-center w-full max-w-7xl min-h-[calc(100vh-56px)] gap-y-4 py-4"
              style={{ marginLeft: 0, marginRight: 0 }}
            >
              <Col lg={18} span={24} style={{ paddingLeft: '0' }}>
                <Flex className="bg-neutral-1 p-2 px-4 rounded-lg min-h-[calc(100vh-88px)]">
                  <Tabs items={tabs} className="custom-tabs" />
                </Flex>
              </Col>
              <Col lg={6} span={24} style={{ paddingRight: '0' }}>
                <Flex className="bg-neutral-1 p-4 rounded-lg">
                  <SurchargeInfo data={data}></SurchargeInfo>
                </Flex>
              </Col>
            </Row>
            {extra && (
              <Row
                gutter={16}
                className="lg:snap-center w-full max-w-7xl min-h-[calc(100vh-56px)] py-4 gap-y-4"
                style={{ marginLeft: 0, marginRight: 0 }}
              >
                {extra}
              </Row>
            )}
            <Outlet />
          </Fragment>
        )
      )}
    </PageContainer>
  );
};

export default ProductDetail;

import { PageContainer } from '@ant-design/pro-components';
import { Col, Flex, Row, Tabs } from 'antd/lib';
import React, { Fragment } from 'react';
// import ImageGallery from 'react-image-gallery';

import { ImageGallery } from '@/components/ImageGallery';
import ContactInfo from '@/layouts/ContactInfo';
import Loading from '@/loading';
import { ProductLanding } from '@/pages/product/detail/components/ProductLanding';
import { SurchargeInfo } from '@/pages/product/detail/components/SurchargeInfo';
import { useProductDetail } from '@/pages/product/detail/hooks/useProductDetail';
import { useTabs } from '@/pages/product/detail/hooks/useTabs';

const ProductDetail: React.FC = () => {
  const { data, isLoading, breadcrumbsItems, formatMessage, productId } = useProductDetail();
  const { tabs } = useTabs(data);

  return (
    <ContactInfo>
      <PageContainer
        className="max-h-[calc(100vh-56px)] xl:max-h-[calc(100vh-112px)] overflow-auto p-4 flex-col gap-4 snap-mandatory snap-y snap-page-container "
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
                className="justify-center max-w-7xl w-full min-h-[calc(100vh-56px)] xl:min-h-[calc(100vh-112px)] items-center lg:snap-center"
                style={{ marginLeft: 0, marginRight: 0 }}
              >
                <Col lg={16} span={24}>
                  <div className="p-4">
                    <ImageGallery images={data.images} />
                  </div>
                </Col>
                <Col lg={8} span={24}>
                  <ProductLanding data={data} breadcrumbsItems={breadcrumbsItems} />
                </Col>
              </Row>
              <Row
                gutter={16}
                className="lg:snap-center w-full max-w-7xl gap-y-4"
                style={{ marginLeft: 0, marginRight: 0 }}
              >
                <Col lg={18} span={24}>
                  <Flex className="bg-neutral-1 p-2 px-4 min-h-[calc(100vh-80px)] xl:min-h-[calc(100vh-136px)] rounded-lg">
                    <Tabs items={tabs} className="custom-tabs" />
                  </Flex>
                </Col>
                <Col lg={6} span={24}>
                  <Flex className="bg-neutral-1 p-4 rounded-lg">
                    <SurchargeInfo data={data}></SurchargeInfo>
                  </Flex>
                </Col>
              </Row>
            </Fragment>
          )
        )}
      </PageContainer>
    </ContactInfo>
  );
};

export default ProductDetail;

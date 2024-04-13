import { Col, Flex, Row, Tabs } from 'antd/lib';
import React from 'react';
// import ImageGallery from 'react-image-gallery';

import { ImageGallery } from '@/components/ImageGallery';
import ContactInfo from '@/layouts/ContactInfo';
import { ProductLanding } from '@/pages/product/detail/components/ProductLanding';
import { SurchargeInfo } from '@/pages/product/detail/components/SurchargeInfo';
import { useProductDetail } from '@/pages/product/detail/hooks/useProductDetail';
import { useTabs } from '@/pages/product/detail/hooks/useTabs';
import LoadingSkeleton from '@/pages/store/components/LoadingSkeleton';

const ProductDetail: React.FC = () => {
  const { data, isLoading } = useProductDetail();
  const { tabs } = useTabs(data);

  return (
    <ContactInfo>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        data && (
          <Flex className="flex-col gap-4">
            <Row gutter={8} className="justify-center items-center">
              <Col lg={16} span={24}>
                <div className="p-4">
                  <ImageGallery images={data.images} />
                </div>
              </Col>
              <Col lg={8} span={24}>
                <ProductLanding data={data} />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={16} span={24}>
                <Flex className="bg-neutral-1 p-4 min-h-[calc(100vh-136px)] rounded-lg">
                  <Tabs items={tabs} className="custom-tabs" />
                </Flex>
              </Col>
              <Col lg={8} span={24}>
                <Flex className="bg-neutral-1 p-4 rounded-lg">
                  <SurchargeInfo data={data}></SurchargeInfo>
                </Flex>
              </Col>
            </Row>
          </Flex>
        )
      )}
    </ContactInfo>
  );
};

export default ProductDetail;

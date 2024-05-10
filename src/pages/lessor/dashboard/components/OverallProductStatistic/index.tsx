import { LoadingOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Card, Divider, Flex, Spin, Statistic } from 'antd/lib';
import React from 'react';

export type TOverallStatisticProps = {
  data?: API.TOverallStatistic;
  isLoading: boolean;
};

export const OverallProductStatistic: React.FC<TOverallStatisticProps> = ({ data, isLoading }) => {
  return (
    <Flex className="flex flex-col w-full">
      <Divider orientation="left">
        <article className="font-sans text-heading-4">
          <FormattedHTMLMessage
            id="lessor.dashboard.section.overall.section.product.title"
            defaultMessage="Products Overview"
          />
        </article>
      </Divider>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24, color: 'teal' }} />}
        spinning={isLoading}
      >
        <Flex className="flex flex-row gap-2">
          <Card className="w-full">
            <Statistic
              className="font-sans"
              title={
                <p className="text-body-1-medium h-8">
                  <FormattedHTMLMessage
                    id="lessor.dashboard.section.overall.accessCount.title"
                    defaultMessage="Total View on Products"
                  />
                </p>
              }
              value={data?.totalAccessCount}
            />
          </Card>

          <Card className="w-full">
            <Statistic
              className="font-sans"
              title={
                <p className="text-body-1-medium h-8">
                  <FormattedHTMLMessage
                    id="lessor.dashboard.section.overall.products.vehicles.title"
                    defaultMessage="Number of Vehicle Product for Rent"
                  />
                </p>
              }
              value={
                data?.numberOfProductByCategory.findLast((record) => record.isVehicle)
                  ?.numberOfProduct
              }
            />
          </Card>

          <Card className="w-full">
            <Statistic
              className="font-sans"
              title={
                <p className="text-body-1-medium h-8">
                  <FormattedHTMLMessage
                    id="lessor.dashboard.section.overall.products.furnitures.title"
                    defaultMessage="Number of Furniture Product for Rent"
                  />
                </p>
              }
              value={
                data?.numberOfProductByCategory.findLast((record) => !record.isVehicle)
                  ?.numberOfProduct
              }
            />
          </Card>
        </Flex>
      </Spin>
    </Flex>
  );
};

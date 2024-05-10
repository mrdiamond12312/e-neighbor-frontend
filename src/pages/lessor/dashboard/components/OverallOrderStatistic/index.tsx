import { LoadingOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Card, Divider, Flex, Spin, Statistic } from 'antd/lib';
import React from 'react';

import { OrderStatus } from '@/components/OrderStatus';
import { ORDER_STATUS } from '@/hooks/useOrderPagination';

export type TOverallStatisticProps = {
  data?: API.TOverallStatistic;
  isLoading: boolean;
};

export const OverallOrderStatistic: React.FC<TOverallStatisticProps> = ({ data, isLoading }) => {
  return (
    <Flex className="flex flex-col">
      <Divider orientation="left">
        <article className="font-sans text-heading-4">
          <FormattedHTMLMessage
            id="lessor.dashboard.section.overall.section.order.title"
            defaultMessage="Orders Overview"
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
              title={<OrderStatus orderStatus={ORDER_STATUS.PENDING} />}
              value={
                data?.orderByStatus.findLast(
                  (record) => record.orderStatus === ORDER_STATUS.PENDING,
                )?.numberOfOrder ?? 0
              }
            />
          </Card>

          <Card className="w-full">
            <Statistic
              className="font-sans"
              title={<OrderStatus orderStatus={ORDER_STATUS.APPROVED} />}
              value={
                data?.orderByStatus.findLast(
                  (record) => record.orderStatus === ORDER_STATUS.APPROVED,
                )?.numberOfOrder ?? 0
              }
            />
          </Card>

          <Card className="w-full">
            <Statistic
              className="font-sans"
              title={<OrderStatus orderStatus={ORDER_STATUS.IN_PROGRESS} />}
              value={
                data?.orderByStatus.findLast(
                  (record) => record.orderStatus === ORDER_STATUS.IN_PROGRESS,
                )?.numberOfOrder ?? 0
              }
            />
          </Card>

          <Card className="w-full">
            <Statistic
              className="font-sans"
              title={<OrderStatus orderStatus={ORDER_STATUS.COMPLETED} />}
              value={
                data?.orderByStatus.findLast(
                  (record) => record.orderStatus === ORDER_STATUS.COMPLETED,
                )?.numberOfOrder ?? 0
              }
            />
          </Card>
        </Flex>
      </Spin>
    </Flex>
  );
};

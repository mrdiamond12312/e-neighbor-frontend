import { LoadingOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Col, Divider, Flex, Row, Select, Spin } from 'antd/lib';
import React from 'react';
import { TooltipProps } from 'recharts';
import resolveConfig from 'tailwindcss/resolveConfig';

import { AreaChart } from '@/components/ReCharts/AreaChart';
import { dayRangeOptions } from '@/pages/lessor/dashboard/helpers/dayRangeOptions';
const tailwindConfig = resolveConfig({
  content: [],
});

export type TRevenueStatisticProps = {
  data?: API.TRevenueStatistic;
  isLoading: boolean;
  dayRange: number;
  setDayRange: React.Dispatch<React.SetStateAction<number>>;
};

const CustomRevenueToolTip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length)
    return (
      <Flex className="p-4 rounded text-body-2-regular font-sans bg-neutral-1 border border-teal-1 flex flex-col gap-1">
        <FormattedHTMLMessage
          id="lessor.dashboard.section.revenue.chart.tooltip.date"
          defaultMessage="On <span class='text-teal-7 text-body-2-semibold'>{date}</span>,"
          values={{
            date: payload[0].payload.time,
          }}
        />
        <FormattedHTMLMessage
          id="lessor.dashboard.section.revenue.chart.tooltip.revenue"
          defaultMessage="Gained a total of <span class='text-teal-7 text-body-2-semibold'>{revenue}₫</span>"
          values={{
            revenue: payload[0].value,
          }}
        />
      </Flex>
    );
  return null;
};

export const RevenueStatistic: React.FC<TRevenueStatisticProps> = ({
  data,
  isLoading,
  dayRange,
  setDayRange,
}) => {
  return (
    <Row gutter={16}>
      <Divider orientation="left">
        <article className="font-sans text-heading-4">
          <FormattedHTMLMessage
            id="lessor.dashboard.section.revenue"
            defaultMessage="Revenue Statistics"
          />
        </article>
      </Divider>
      <Col span={24} lg={24}>
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 24, color: 'teal' }} />}
          spinning={isLoading}
        >
          <Flex className="border border-neutral-3 bg-neutral-1 rounded-lg p-4 flex flex-col gap-4">
            <Flex className="pl-16 pr-12 flex-row font-sans text-body-1-semibold items-center justify-between">
              <Flex className="flex-row gap-1 items-center">
                <FormattedHTMLMessage
                  id="lessor.dashboard.section.revenue.dayRange.label"
                  defaultMessage="Revenue Gained"
                />
                <Select
                  value={dayRange}
                  onChange={(value: number) => setDayRange(value)}
                  className="custom-cascader-select w-fit "
                  options={dayRangeOptions}
                  popupClassName="custom-select-panel"
                />
              </Flex>
              <Flex className="text-teal-7 text-body-1-medium">
                <FormattedHTMLMessage
                  id="lessor.dashboard.section.revenue.total"
                  defaultMessage="Total: <span class='text-teal-1 text-body-1-semibold'>{totalRevenue}</span> ₫"
                  values={{ totalRevenue: data?.totalRevenue }}
                />
              </Flex>
            </Flex>
            <AreaChart
              data={data?.chartData}
              dataKeys={['revenue']}
              labelKey="time"
              containerClassName="!h-80"
              chartClassname="font-sans"
              colors={[tailwindConfig.theme.colors.teal[300]]}
              customTooltip={<CustomRevenueToolTip />}
            />
          </Flex>
        </Spin>
      </Col>
    </Row>
  );
};

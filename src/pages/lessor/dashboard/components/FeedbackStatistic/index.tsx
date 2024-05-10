import { LoadingOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Col, Divider, Flex, Row, Select, Spin } from 'antd/lib';
import React from 'react';
import { TooltipProps } from 'recharts';
import resolveConfig from 'tailwindcss/resolveConfig';

import { AreaChart } from '@/components/ReCharts/AreaChart';
import { PieChart } from '@/components/ReCharts/PieChart';
import { dayRangeOptions } from '@/pages/lessor/dashboard/helpers/dayRangeOptions';
const tailwindConfig = resolveConfig({
  content: [],
});

export type TRatingInformationProps = {
  information: string | number;
  cx?: number;
  cy?: number;
};

export type TFeedbackStatisticProps = {
  data?: API.TFeedbackStatistic;
  isLoading: boolean;
  dayRange: number;
  setDayRange: React.Dispatch<React.SetStateAction<number>>;
};

const CustomFeedbackToolTip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length)
    return (
      <Flex className="p-4 rounded text-body-2-regular font-sans bg-neutral-1 border border-teal-1 flex flex-col gap-1">
        <FormattedHTMLMessage
          id="lessor.dashboard.section.feedback.chart.tooltip.date"
          defaultMessage="On <span class='text-teal-7 text-body-2-semibold'>{date}</span>,"
          values={{
            date: payload[0].payload.time,
          }}
        />
        <FormattedHTMLMessage
          id="lessor.dashboard.section.feedback.chart.tooltip.avgRating"
          defaultMessage="<span class='text-yellow-600 text-body-2-regular'>Average Rating: <span class='text-yellow-500 text-body-2-semibold'>{averageStar}</span></span>"
          values={{
            averageStar: payload[0].payload.averageStar,
          }}
        />
        <FormattedHTMLMessage
          id="lessor.dashboard.section.feedback.chart.tooltip.numberOfFeedback"
          defaultMessage="<span class='text-teal-7 text-body-2-regular'>Feedbacks Recieved: <span class='text-teal-300 text-body-2-semibold'>{numberOfFeedback}</span></span>"
          values={{
            numberOfFeedback: payload[0].payload.totalFeedback,
          }}
        />
      </Flex>
    );
  return null;
};

export const RatingInformation: React.FC<TRatingInformationProps> = ({ information, cx, cy }) => {
  const { formatMessage } = useIntl();

  const extraInformation: {
    [key: string | number]: any;
  } = {
    5: formatMessage({
      id: 'lessor.statistic.rate.5.desc',
      defaultMessage: 'Very Satisfied',
    }),
    4: formatMessage({
      id: 'lessor.statistic.rate.4.desc',
      defaultMessage: 'Satisfied',
    }),
    3: formatMessage({
      id: 'lessor.statistic.rate.3.desc',
      defaultMessage: 'Okay',
    }),
    2: formatMessage({
      id: 'lessor.statistic.rate.2.desc',
      defaultMessage: 'Dissatisfied',
    }),
    1: formatMessage({
      id: 'lessor.statistic.rate.1.desc',
      defaultMessage: 'Very Dissatisfied',
    }),
  };

  return (
    <text x={cx} y={cy} dy={8} textAnchor="middle" className="font-sans">
      <tspan x={cx} dy="0" className="text-body-1-medium">
        {extraInformation[information]}
      </tspan>
      <tspan x={cx} dy="1.2em" className="text-body-1-regular">
        {information} &#11088;
      </tspan>
    </text>
  );
};

export const FeedbackStatistic: React.FC<TFeedbackStatisticProps> = ({
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
            id="lessor.dashboard.section.feedback"
            defaultMessage="Feedback Statistics"
          />
        </article>
      </Divider>
      <Col span={24} lg={10} className="pb-2 lg:!pb-0">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 24, color: 'teal' }} />}
          spinning={isLoading}
        >
          <Flex className="border border-neutral-3 bg-neutral-1 rounded-lg p-4 flex flex-col gap-4">
            <Flex className="flex-row font-sans text-body-1-semibold justify-center items-center gap-1 h-8">
              <FormattedHTMLMessage
                id="lessor.dashboard.section.feedback.overall.label"
                defaultMessage="Overall Rating of All times"
              />
            </Flex>
            <PieChart
              data={data?.feedbackByRating}
              containerClassName="!h-80"
              chartClassname="font-sans"
              dataKey="numberOfFeedback"
              labelKey="rating"
              innerRadius={70}
              outerRadius={110}
              colors={[
                tailwindConfig.theme.colors.yellow[500],
                tailwindConfig.theme.colors.yellow[400],
                tailwindConfig.theme.colors.yellow[300],
                tailwindConfig.theme.colors.yellow[200],
                tailwindConfig.theme.colors.yellow[100],
              ]}
              customCenterRender={(payload, cx, cy) => (
                <RatingInformation information={payload} cx={cx} cy={cy} />
              )}
            />
          </Flex>
        </Spin>
      </Col>
      <Col span={24} lg={14}>
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 24, color: 'teal' }} />}
          spinning={isLoading}
        >
          <Flex className="border border-neutral-3 bg-neutral-1 rounded-lg p-4 flex flex-col gap-4">
            <Flex className="pl-16 flex-row font-sans text-body-1-semibold items-center gap-1">
              <FormattedHTMLMessage
                id="lessor.dashboard.section.feedback.dayRange.label"
                defaultMessage="Feedbacks Recieved"
              />
              <Select
                value={dayRange}
                onChange={(value: number) => setDayRange(value)}
                className="custom-cascader-select w-fit "
                options={dayRangeOptions}
                popupClassName="custom-select-panel"
              />
            </Flex>
            <AreaChart
              data={data?.chartData}
              dataKeys={['totalFeedback']}
              labelKey="time"
              containerClassName="!h-80"
              chartClassname="font-sans"
              colors={[tailwindConfig.theme.colors.teal[300]]}
              customTooltip={<CustomFeedbackToolTip />}
            />
          </Flex>
        </Spin>
      </Col>
    </Row>
  );
};

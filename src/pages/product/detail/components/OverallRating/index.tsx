import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Rate, Typography } from 'antd/lib';
import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip, TooltipProps } from 'recharts';

export type TOverallRating = {
  avgRating: string | number;
  accData: {
    '5'?: number;
    '4'?: number;
    '3'?: number;
    '2'?: number;
    '1'?: number;
  };
  feedbackCount: string | number;
};

export const CustomRatingToolTip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length)
    return (
      <Flex className="p-4 rounded text-body-2-regular font-sans bg-neutral-1 border border-teal-1">
        <FormattedHTMLMessage
          id="product.details.feedback.overall.tooltip"
          defaultMessage="<span class='text-teal-7 text-body-2-semibold'>{feedbackCount}</span> {numberOfStar}-star feedbacks"
          values={{
            feedbackCount: payload[0].value,
            numberOfStar: payload[0].payload.numberOfStar,
          }}
        />
      </Flex>
    );
  return null;
};

export const OverallRating: React.FC<TOverallRating> = ({ avgRating, accData, feedbackCount }) => {
  const formatAccData = Object.keys(accData)
    .map((key) => ({
      numberOfStar: key,
      feedbackCount: accData?.[key as keyof typeof accData] ?? 0,
    }))
    .reverse();

  return (
    <Flex className="flex-row w-full">
      <Flex className="flex-col pl-4 gap-1 font-sans text-body-2-semibold text-neutral-7 shrink-0 justify-center items-center">
        <Typography className="font-sans text-heading-1 text-teal-7">{avgRating}</Typography>
        <Rate value={Number(avgRating)} disabled />
        <FormattedHTMLMessage
          id="product.details.feedback.overall.feedbackCount"
          defaultMessage="({feedbackCount} reviews)"
          values={{ feedbackCount }}
        />
      </Flex>
      <ResponsiveContainer className="!w-full !h-32">
        <BarChart
          data={formatAccData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          layout="vertical"
          className="font-sans"
        >
          <XAxis type="number" hide domain={[]} />
          <YAxis dataKey="numberOfStar" type="category" />
          <Tooltip content={<CustomRatingToolTip />} />
          <Bar dataKey="feedbackCount" className="fill-teal-1" />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
};

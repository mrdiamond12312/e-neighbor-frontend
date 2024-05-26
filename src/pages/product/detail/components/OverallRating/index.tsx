import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Rate, Typography } from 'antd/lib';
import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip, TooltipProps } from 'recharts';

export type TOverallRating = {
  avgRating: string | number;
  accData: {
    rating: number;
    count: number;
  }[];
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
            numberOfStar: payload[0].payload.rating,
          }}
        />
      </Flex>
    );
  return null;
};

export const OverallRating: React.FC<TOverallRating> = ({ avgRating, accData }) => {
  const allRatings = [5, 4, 3, 2, 1]; // Array of all possible ratings
  const extendedData = allRatings.map((rating) => {
    const existingEntry = accData?.find((entry) => entry.rating === rating);
    return existingEntry || { rating, count: 0 };
  });

  const feedbackCount = extendedData.reduce(
    (accumulator, data) => accumulator + (Number(data.count) ?? 0),
    0,
  );
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
          data={extendedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          layout="vertical"
          className="font-sans"
        >
          <XAxis type="number" hide />
          <YAxis dataKey="rating" type="category" />
          <Tooltip content={<CustomRatingToolTip />} />
          <Bar dataKey="count" className="fill-teal-1" />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
};

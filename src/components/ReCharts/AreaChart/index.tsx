import classNames from 'classnames';
import React from 'react';
import {
  AreaChart as ReChartAreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';
import { CurveType } from 'recharts/types/shape/Curve';

export type TAreaChartProps<T> = {
  data?: T[];
  dataKeys: string[];
  labelKey: string;
  containerClassName: string;
  chartClassname?: string;
  colors?: string[];
  customTooltip?: ContentType<ValueType, NameType>;
  curveType?: CurveType;
  yAxisWidth?: number;
};

export const AreaChart: React.FC<TAreaChartProps<any>> = ({
  data,
  dataKeys,
  labelKey,
  colors,
  containerClassName,
  chartClassname,
  customTooltip,
  curveType = 'monotone',
  yAxisWidth,
}) => {
  const colorKeys = dataKeys.map((key) => ['gradients', key].join('.'));
  console.log(colorKeys);
  return (
    <ResponsiveContainer className={classNames('w-full !h-32', containerClassName)}>
      <ReChartAreaChart
        width={500}
        height={400}
        className={chartClassname}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: yAxisWidth ?? 30,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          {dataKeys.map((key, index) => {
            return (
              <linearGradient
                key={colorKeys[index]}
                id={colorKeys[index]}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors?.[index % colors.length]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors?.[index % colors.length]} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        <XAxis dataKey={labelKey} />
        <YAxis />
        <Tooltip content={customTooltip} />
        {dataKeys.map((key, index) => (
          <Area
            key={key}
            type={curveType}
            dataKey={key}
            stroke={colors?.[index % colors.length]}
            fill={`url(#${colorKeys[index]})`}
          />
        ))}
      </ReChartAreaChart>
    </ResponsiveContainer>
  );
};

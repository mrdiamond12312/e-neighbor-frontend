import classNames from 'classnames';
import React, { useState } from 'react';
import { ResponsiveContainer, Pie, PieChart as RechartPieChart, Sector, Cell } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

export type TActiveShapeProps = PieSectorDataItem & {
  tagKey: string;
  payload?: any;
};

const ActivePieShape: React.FC<TActiveShapeProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
  tagKey,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 0));
  const cos = Math.cos(-RADIAN * (midAngle ?? 0));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle">
        {payload?.[tagKey]}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${((percent ?? 0) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export type TPieChartProps<T> = {
  data: T[];
  dataKey: string;
  labelKey: string;
  containerClassName: string;
  innerRadius?: number;
  outerRadius?: number;
  chartClassname?: string;
  colors?: string[];
};

export const PieChart: React.FC<TPieChartProps<any>> = ({
  data,
  containerClassName,
  dataKey,
  labelKey,
  innerRadius,
  outerRadius,
  chartClassname,
  colors,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onPieEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer className={classNames('w-full !h-32', containerClassName)}>
      <RechartPieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={<ActivePieShape tagKey={labelKey} />}
          data={data}
          innerRadius={innerRadius ?? 60}
          outerRadius={outerRadius ?? 80}
          dataKey={dataKey}
          onMouseEnter={onPieEnter}
          className={chartClassname}
        >
          {data.map((entry, index) => (
            <Cell key={entry} fill={colors?.[index % colors?.length]} />
          ))}
        </Pie>
      </RechartPieChart>
    </ResponsiveContainer>
  );
};

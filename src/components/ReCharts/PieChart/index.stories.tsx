import type { Meta, StoryObj } from '@storybook/react';
import resolveConfig from 'tailwindcss/resolveConfig';

import { PieChart } from '.';

const fullConfig = resolveConfig({
  content: [],
});

// Interactive Function, used for testin

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {},
    containerClassName: {
      type: 'string',
    },
    dataKey: {
      type: 'string',
    },
    labelKey: {
      type: 'string',
    },
    innerRadius: {
      type: 'number',
    },
    outerRadius: {
      type: 'number',
    },
    chartClassname: {
      type: 'string',
    },
  },
};

// Make Type
type TPieChartStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TPieChartStory = {
  args: {
    data: [
      {
        name: 'pig',
        value: 3000,
      },
      {
        name: 'dog',
        value: 2000,
      },
      {
        name: 'cat',
        value: 1299,
      },
    ],
    containerClassName: '!h-80',
    dataKey: 'value',
    labelKey: 'name',
    innerRadius: 80,
    outerRadius: 100,
    colors: [
      fullConfig.theme.colors.teal[100],
      fullConfig.theme.colors.teal[200],
      fullConfig.theme.colors.teal[300],
    ],
  },
  render: (args) => (
    <div className="w-full">
      <PieChart {...args} />
    </div>
  ),
};

export default meta;

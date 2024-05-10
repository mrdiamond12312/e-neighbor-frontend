import type { Meta, StoryObj } from '@storybook/react';
import resolveConfig from 'tailwindcss/resolveConfig';

import { AreaChart } from '.';

const fullConfig = resolveConfig({
  content: [],
});

// Interactive Function, used for testin

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {},
    curveType: {
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
        name: 'Farm A',
        cat: 4000,
        dog: 2400,
        pig: 2400,
      },
      {
        name: 'Farm B',
        cat: 400,
        dog: 1220,
        pig: 900,
      },
      {
        name: 'Farm C',
        cat: 2000,
        dog: 2400,
        pig: 2400,
      },
      {
        name: 'Farm D',
        cat: 0,
        dog: 300,
        pig: 1400,
      },
    ],
    containerClassName: '!h-80',
    dataKeys: ['cat', 'dog', 'pig'],
    labelKey: 'name',
    colors: [
      fullConfig.theme.colors.red[300],
      fullConfig.theme.colors.yellow[300],
      fullConfig.theme.colors.teal[300],
    ],
  },
  render: (args) => (
    <div className="w-full">
      <AreaChart {...args} />
    </div>
  ),
};

export default meta;

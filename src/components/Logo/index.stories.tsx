import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { Flex } from 'antd/lib';

import Logo, { TLogo } from '.';

// Interactive Function, used for testing
const args: TLogo = {
  logoText: 'E-Neighbor',
  mode: 'teal',
  collapsedLogoText: false,
  logoTextClassName: 'leading-6',
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof Logo> = {
  title: 'Component/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TFeedbackCardStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TFeedbackCardStory = {
  args: {
    ...args,
  },
  render: (args) => (
    <Flex className="flex-row gap-2 justify-center items-end">
      <Logo {...args} />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(args.logoText ?? '')).toBeInTheDocument();
  },
};

export default meta;

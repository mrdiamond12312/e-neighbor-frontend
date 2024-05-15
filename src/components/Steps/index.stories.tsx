import { Star } from '@phosphor-icons/react';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import dayjs from 'dayjs';

import { Steps, TStepProps } from '.';

const args: TStepProps = {
  stepItems: [
    {
      title: 'Start!',
      description: dayjs().format('DD/MM/YYYY'),
      icon: <Star size={32} className="p-1" />,
    },
    {
      title: 'First Step!',
      description: 'Fill out your Personal Information',
    },
    {
      title: 'Payment Information!',
      description: 'Add a Payment Method',
    },
    {
      title: 'Your Opinion!',
      description: 'Add your opinion here',
    },
  ],
  currentStep: 1,
};

// Interactive Function, used for testing

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof Steps> = {
  title: 'Component/Steps',
  component: Steps,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TStepsStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TStepsStory = {
  args: { ...args },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    args.stepItems.forEach(async (item) => {
      await expect(canvas.getByText(item.title as string)).toBeInTheDocument();
      await expect(canvas.getByText(item.description as string)).toBeInTheDocument();
    });
  },
};

export default meta;

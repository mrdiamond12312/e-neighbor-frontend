import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import FadeIn from '.';

// Interactive Function, used for testing

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof FadeIn> = {
  title: 'Animation Kit/FadeIn',
  component: FadeIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TFadeInStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TFadeInStory = {
  args: {
    children: "Hi! I'm a random React.Node!",
    direction: 'left',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await delay(1000);
    const thisElement = canvas.getByText("Hi! I'm a random React.Node!");
    await expect(thisElement.parentElement).toBeInTheDocument();
  },
};

export default meta;

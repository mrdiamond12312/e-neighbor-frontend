import Button from '.';
import type { Meta, StoryObj } from '@storybook/react';

import { within, userEvent } from '@storybook/testing-library';

import { expect, jest } from '@storybook/jest';

// Interactive Function, used for testing

const loggingClick = () => {
  console.log('Clicked!');
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof Button> = {
  title: 'Component/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      type: 'string',
    },
    type: {
      control: 'radio',
      options: ['primary', 'dashed', undefined],
    },
    disabled: {
      type: 'boolean',
    },
    onClick: {},
  },
};

// Make Type
type TButtonStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TButtonStory = {
  args: {
    children: "Hi! I'm a button.",
    type: undefined,
    disabled: false,
    onClick: loggingClick,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thisButton = canvas.getByText("Hi! I'm a button.");
    await expect(thisButton.parentElement).toBeInTheDocument();

    jest.spyOn(console, 'log');
    await userEvent.click(thisButton);
    await expect(console.log).toHaveBeenCalledWith('Clicked!');
  },
};

export const Disabled: TButtonStory = {
  args: {
    children: "Hi! I'm a button.",
    type: undefined,
    disabled: true,
    onClick: loggingClick,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thisDisabledButton = canvas.getByText("Hi! I'm a button.");
    await expect(thisDisabledButton.parentElement).toBeInTheDocument();
    await expect(thisDisabledButton.parentElement).toBeDisabled();
  },
};

export default meta;

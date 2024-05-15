import { expect, jest } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import { SearchBar } from '.';

// Interactive Function, used for testing
const searchBoxHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
  console.log(event.currentTarget.value);
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof SearchBar> = {
  title: 'Component/Search Bar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TButtonStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TButtonStory = {
  args: { onPressEnter: searchBoxHandler, placeholder: 'Search...', className: 'h-10' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thisInput = canvas.getByPlaceholderText('Search...');
    await expect(thisInput.parentElement).toBeInTheDocument();

    jest.spyOn(console, 'log');
    await userEvent.click(thisInput);
    await userEvent.type(thisInput, 'Hi, I just wrote something!');
    await userEvent.keyboard('{Enter}');
    await expect(console.log).toHaveBeenCalledWith('Hi, I just wrote something!');
  },
};

export default meta;

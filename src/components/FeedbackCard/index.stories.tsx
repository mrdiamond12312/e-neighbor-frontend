import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import dayjs from 'dayjs';

import FeedbackCard from '.';

// Interactive Function, used for testing
const args: API.IFeedback = {
  id: 1,
  orderId: 1,
  productId: 1,
  user: {
    fullName: 'Daimondo Testo',
    avatar:
      'https://www.shutterstock.com/image-vector/cute-cartoon-rubber-duck-vector-600nw-2276837591.jpg',
  },

  content: 'Great Product',
  image:
    'https://www.shutterstock.com/image-vector/cute-cartoon-rubber-duck-vector-600nw-2276837591.jpg',
  star: 5,
  createdAt: dayjs().toString(),
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof FeedbackCard> = {
  title: 'Component/Feedback Card',
  component: FeedbackCard,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(args.content)).toBeInTheDocument();

    await expect(canvas.getByText(dayjs().format('DD/MM/YYYY'))).toBeInTheDocument();

    await expect(canvas.getByText(args.content)).toBeInTheDocument();

    await expect(canvas.getByText(args.user.fullName)).toBeInTheDocument();
  },
};

export default meta;

import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { IImageGalleryProps, ImageGallery } from '@/components/ImageGallery';

// Interactive Function, used for testing
const args: IImageGalleryProps = {
  images: [
    'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg/800px-Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg',
    'https://media.istockphoto.com/id/172999686/photo/cow-portrait.jpg?s=612x612&w=0&k=20&c=N-qA-duoiBovotyPez66n3OrOWpLrazJjAwWtAph1rw=',
    'https://media.istockphoto.com/id/471480053/photo/happy-cow.jpg?s=612x612&w=0&k=20&c=IYcNcymvDBXQ6-4fbg9_2BJy5EjVVWI8RQGtolzmhko=',
  ],
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof ImageGallery> = {
  title: 'Component/Image Gallery',
  component: ImageGallery,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TImageGalleryStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TImageGalleryStory = {
  args: {
    ...args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect((await canvas.findAllByRole('img')).length).toEqual(args.images.length + 1);
  },
};

export default meta;

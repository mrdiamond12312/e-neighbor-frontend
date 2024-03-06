import { PropertyCard } from '.';
import type { Meta, StoryObj } from '@storybook/react';

// import { within, userEvent } from '@storybook/testing-library';

// import { expect, jest } from '@storybook/jest';

// Interactive Function, used for testing

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<typeof PropertyCard> = {
  title: 'Component/Property Card',
  component: PropertyCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TPropertyCardStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TPropertyCardStory = {
  args: {
    imageSrc:
      'https://hips.hearstapps.com/hmg-prod/images/dw-burnett-pcoty22-8260-1671143390.jpg?crop=0.668xw:1.00xh;0.184xw,0&resize=640:*',
    title: 'Yamahahahahahahahaha',
    owner: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-380-456332.png',
    tag: 'Car',
    rating: 4.5,
    pricing: 1000000,
    pricingCurrency: 'VND/day',

    ctaBtnFormattedMessage: 'Rent Now!',
  },
  play: async ({}) => {},
};

export default meta;

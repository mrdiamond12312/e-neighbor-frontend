import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import { useForm } from 'react-hook-form';

import { Rate } from '@/components/Input/Rate';

const args = {
  size: 'large',
  direction: 'vertical',
  className: 'h-10 content-center',
};

// Interactive Function, used for testing
const { Item } = Form;
const Wrapper: React.FC = (args) => {
  const { control, watch } = useForm();

  return (
    <Form
      layout="horizontal"
      rootClassName="custom-antd-form-small pt-6"
      labelCol={{ span: 24, lg: 8 }}
      wrapperCol={{ span: 24, lg: 16 }}
    >
      <Item label={'Value'}>
        <Flex className="text-body-2-semibold h-10 items-center pl-3 font-sans">
          {watch('rateTest') ?? 0}
        </Flex>
      </Item>
      <Item label={'Rate'}>
        <Rate aria-label="Rate" control={control} name={'rateTest'} {...args} />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Rate',
  component: Rate,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TRateStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TRateStory = {
  args: {
    ...args,
  },
  render: (args) => (
    <Flex className="w-7/12 m-auto">
      <Wrapper {...args} />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const randNumber = Math.floor(Math.random() * 5);
    const doubleClick = Math.floor(Math.random() * 2) === 1;

    const starGazers = canvas.getAllByRole('radio', {
      checked: false,
    });
    const selectedStar = starGazers[randNumber % 5];

    await userEvent.click(selectedStar);
    if (doubleClick) await userEvent.click(selectedStar);

    await expect(canvas.getByText(doubleClick ? 0 : randNumber + 1)).toBeInTheDocument();
  },
};

export default meta;

import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import { useForm } from 'react-hook-form';

import Radio from '@/components/Input/Radio';

const args = {
  size: 'large',
  direction: 'vertical',
  className: 'custom-radio',
  options: [
    {
      value: 'Daimondo Chosen',
      label: 'Daimondo',
    },
    {
      value: 'Daiya Chosen',
      label: 'Daiya',
    },
  ],
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
          {watch('radioTest')}
        </Flex>
      </Item>
      <Item label={'Radio'}>
        <Radio aria-label="Radio" control={control} name={'radioTest'} options={[]} {...args} />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Radio',
  component: Radio,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TRadioStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TRadioStory = {
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

    const randNumber = Math.floor(Math.random() * args.options.length);
    const chosenOption = args.options[randNumber % args.options.length];
    const element = canvas.getByText(chosenOption.label);
    await expect(element).toBeInTheDocument();
    await userEvent.click(element);

    await expect(canvas.getByText(chosenOption.value)).toBeInTheDocument();
  },
};

export default meta;

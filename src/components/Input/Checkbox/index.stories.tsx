import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import { useForm } from 'react-hook-form';

import Checkbox from '@/components/Input/Checkbox';

const args = {
  size: 'large',
  direction: 'vertical',
  className: 'custom-checkbox',
  options: [
    {
      value: 'Daimondo',
      label: 'Daimondo',
    },
    {
      value: 'Daiya',
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
          {watch('checkboxTest')?.join(',')}
        </Flex>
      </Item>
      <Item label={'Checkbox'}>
        <Checkbox
          aria-label="Checkbox"
          control={control}
          name={'checkboxTest'}
          options={[]}
          {...args}
        />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TCheckboxStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TCheckboxStory = {
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

    for (const option of args.options) {
      const element = canvas.getByText(option.label);
      await expect(element).toBeInTheDocument();
      await userEvent.click(element);
    }

    await expect(
      canvas.getByText(args.options.map((option) => option.value).join(',')),
    ).toBeInTheDocument();
  },
};

export default meta;

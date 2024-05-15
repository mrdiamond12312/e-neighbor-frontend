import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import { useForm } from 'react-hook-form';

import HiddenInput from '@/components/Input/HiddenInput';

const args = {
  size: 'large',
  className: 'custom-input h-10',
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
          {watch('hiddenInputTest')}
        </Flex>
      </Item>
      <Item label={'HiddenInput'}>
        <HiddenInput
          placement="top"
          aria-label="HiddenInput"
          control={control}
          name={'hiddenInputTest'}
          {...args}
        />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Hidden Input',
  component: HiddenInput,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type THiddenInputStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: THiddenInputStory = {
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
    const input = canvas.getByLabelText('HiddenInput', {
      selector: 'input',
    });
    const secretToType = 'This is a Top Secret String';
    await userEvent.click(input);
    await userEvent.type(input, secretToType);
    await expect(canvas.getByText(secretToType)).toBeInTheDocument();
  },
};

export default meta;

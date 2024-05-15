import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import { useForm } from 'react-hook-form';

import InputText from '@/components/Input';

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
          {watch('inputTextTest')}
        </Flex>
      </Item>
      <Item label={'InputText'}>
        <InputText
          placement="top"
          aria-label="InputText"
          control={control}
          name={'inputTextTest'}
          {...args}
        />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Input',
  component: InputText,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TInputTextStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TInputTextStory = {
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
    const input = canvas.getByLabelText('InputText', {
      selector: 'input',
    });
    const textToType = 'A Public Information';
    await userEvent.click(input);
    await userEvent.type(input, textToType);
    await expect(canvas.getByText(textToType)).toBeInTheDocument();
  },
};

export default meta;

import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import { useForm } from 'react-hook-form';

import TextArea from '@/components/Input/TextArea';

const args = {
  size: 'large',
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
          {watch('textAreaTest')}
        </Flex>
      </Item>
      <Item label={'TextArea'}>
        <TextArea
          placement="top"
          aria-label="TextArea"
          control={control}
          name={'textAreaTest'}
          {...args}
        />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Text Area',
  component: TextArea,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TTextAreaStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TTextAreaStory = {
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
    const input = canvas.getByLabelText('TextArea', {
      selector: 'textarea',
    });
    const textToType = 'A Public Information';
    await userEvent.click(input);
    await userEvent.type(input, textToType);
    await expect(canvas.getAllByText(textToType).length).toEqual(2);
  },
};

export default meta;

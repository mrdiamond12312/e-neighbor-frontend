import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import { useForm } from 'react-hook-form';

import Select from '@/components/Input/Select';

const args = {
  size: 'large',

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
  className: 'custom-cascader-select w-fit',
  popupClassName: 'custom-select-panel',
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
          {watch('selectTest')}
        </Flex>
      </Item>
      <Item label={'Select'}>
        <Select
          aria-label="Select"
          placeholder="Select Placeholder"
          control={control}
          name={'selectTest'}
          {...args}
        />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TSelectStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TSelectStory = {
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
    const input = canvas.getByLabelText('Select', {
      selector: 'input',
    });
    await expect(input).toBeInTheDocument();
    await userEvent.click(input);
  },
};

export default meta;

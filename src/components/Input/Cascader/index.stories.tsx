import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import { useForm } from 'react-hook-form';

import Cascader from '@/components/Input/Cascader';

const args = {
  size: 'large',
  options: [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ],
  className: 'custom-cascader-select',
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
          {watch('cascaderTest')?.join(',')}
        </Flex>
      </Item>
      <Item label={'Cascader'}>
        <Cascader
          aria-label="Cascader"
          placeholder="Cascader Placeholder"
          control={control}
          name={'cascaderTest'}
          {...args}
        />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Cascader',
  component: Cascader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TCascaderStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TCascaderStory = {
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
    const input = canvas.getByLabelText('Cascader', {
      selector: 'input',
    });
    await expect(input).toBeInTheDocument();
    await userEvent.click(input);
  },
};

export default meta;

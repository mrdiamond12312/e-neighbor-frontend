import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import DatePicker from '@/components/Input/DatePicker';
import { getDateFormatNormal } from '@/utils/time-format/index';

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
          {getDateFormatNormal(watch('datePickerTest'))}
        </Flex>
      </Item>
      <Item label={'DatePicker'}>
        <DatePicker
          placement="top"
          aria-label="DatePicker"
          control={control}
          name={'datePickerTest'}
          {...args}
        />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Date Picker',
  component: DatePicker,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TDatePickerStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TDatePickerStory = {
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

    const input = canvas.getByLabelText('DatePicker', {
      selector: 'input',
    });

    await userEvent.click(input);
    await userEvent.type(input, dayjs().format('YYYY-MM-DD'));
    await userEvent.type(input, '{enter}');
    await expect(
      canvas.getByText(getDateFormatNormal(dayjs().toString()) ?? ''),
    ).toBeInTheDocument();
  },
};

export default meta;

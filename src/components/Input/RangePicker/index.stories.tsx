import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Flex, Form } from 'antd/lib';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import RangePicker from '@/components/Input/RangePicker';
import { getDateFormatNormal } from '@/utils/time-format/index';

const args = {
  size: 'large',
};

// Interactive Function, used for testing

const { Item } = Form;
const Wrapper: React.FC = (args) => {
  const { control, watch } = useForm();

  console.log(watch());
  return (
    <Form
      layout="horizontal"
      rootClassName="custom-antd-form-small pt-6"
      labelCol={{ span: 24, lg: 8 }}
      wrapperCol={{ span: 24, lg: 16 }}
    >
      <Item label={'Value'}>
        <Flex className="text-body-2-semibold h-10 items-center pl-3 font-sans">
          {[
            'From',
            getDateFormatNormal(watch('rangePickerTest')?.[0]),
            'to',
            getDateFormatNormal(watch('rangePickerTest')?.[1]),
          ].join(' ')}
        </Flex>
      </Item>
      <Item label={'RangePicker'}>
        <RangePicker
          aria-label="RangePicker"
          control={control}
          name={'rangePickerTest'}
          {...args}
        />
      </Item>
    </Form>
  );
};

// Storybook Declarations
// General Information of Components (which components, name, and props)
const meta: Meta<any> = {
  title: 'Form/Range Picker',
  component: RangePicker,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

// Make Type
type TRangePickerStory = StoryObj<typeof meta>;

// Specific Stories
export const Default: TRangePickerStory = {
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

    const startInput = canvas.getByPlaceholderText('Start date');
    const endInput = canvas.getByPlaceholderText('End date');

    const startDate = dayjs();
    const endDate = dayjs().add(7, 'day');

    await userEvent.click(startInput);
    await userEvent.type(startInput, startDate.format('YYYY-MM-DD'));
    await userEvent.keyboard('{Enter}');

    await userEvent.click(endInput);
    await userEvent.type(endInput, endDate.format('YYYY-MM-DD'));
    await userEvent.keyboard('{Enter}');
    await expect(
      await canvas.findByText(getDateFormatNormal(startDate.toString()) ?? '', {
        exact: false,
      }),
    ).toBeInTheDocument();

    await expect(
      await canvas.findByText(getDateFormatNormal(endDate.toString()) ?? '', {
        exact: false,
      }),
    ).toBeInTheDocument();
  },
};

export default meta;

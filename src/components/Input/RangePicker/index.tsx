import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

const { RangePicker: AntdRangePicker } = DatePicker;
import ValidateError from '@/components/Input/ValidateError';

export type TPropsDatePicker = TPropsFormInput & RangePickerProps;

const RangePicker: React.FC<TPropsDatePicker> = ({
  control,
  name,
  format,
  className,
  disabledDate,
  size,
  ...restProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <AntdRangePicker
            {...field}
            {...restProps}
            size={size}
            value={field.value ? [dayjs(field.value[0]), dayjs(field.value[1])] : null}
            format={format}
            className={classNames(error ? `error` : `focus hover`, className)}
            onChange={(date) => {
              field.onChange(date ? date.valueOf() : null);
            }}
            popupClassName="custom-antd-picker-panel"
            disabledDate={disabledDate}
            status={error ? 'error' : ''}
          />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

export default RangePicker;

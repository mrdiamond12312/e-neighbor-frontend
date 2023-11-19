import ValidateError from '@/components/Input/ValidateError';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

export type TPropsDatePicker = TPropsFormInput & {
  minimumYear?: number;
  disabledDate?: RangePickerProps['disabledDate'];
};

const AntdDatePicker: React.FC<TPropsDatePicker> = ({
  control,
  name,
  format,
  className,
  size,
  disabledDate,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <DatePicker
            {...field}
            value={field.value ? dayjs(field.value) : null}
            format={format}
            className={classNames(error ? `error` : `focus hover`, className)}
            size={size}
            onChange={(date) => {
              field.onChange(date ? date.valueOf() : null);
            }}
            disabledDate={disabledDate}
            status={error ? 'error' : ''}
          />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

export default AntdDatePicker;

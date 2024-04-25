import { DatePicker as AntdDatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { Flex } from 'antd/lib';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

import ValidateError from '@/components/Input/ValidateError';

export type TPropsDatePicker = TPropsFormInput & {
  minimumYear?: number;
  disabledDate?: RangePickerProps['disabledDate'];
  readOnly?: boolean;
};

const DatePicker: React.FC<TPropsDatePicker> = ({
  control,
  name,
  format,
  className,
  size,
  disabledDate,
  readOnly = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        !readOnly ? (
          <Fragment>
            <AntdDatePicker
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
        ) : (
          <Flex className="h-8 font-sans text-body-2-semibold items-end">
            {field.value ?? 'NaN'}
          </Flex>
        )
      }
    />
  );
};

export default DatePicker;

import { DatePicker as AntdDatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { Input } from 'antd/lib';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

import ValidateError from '@/components/Input/ValidateError';
import { getDateFormatNormal } from '@/utils/time-format';

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
  ...restProps
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
              onChange={(date, dateString) => {
                field.onChange(dateString ? dateString : null);
              }}
              disabledDate={disabledDate}
              status={error ? 'error' : ''}
              {...restProps}
            />
            <ValidateError error={error} />
          </Fragment>
        ) : (
          <Input
            className={className}
            size={size}
            value={getDateFormatNormal(field.value) ?? ''}
            readOnly
          />
        )
      }
    />
  );
};

export default DatePicker;

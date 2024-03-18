import { Input } from 'antd';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

import ValidateError from '@/components/Input/ValidateError';

const { TextArea } = Input;

const AntdTextArea: React.FC<TPropsFormInput> = ({
  control,
  name,
  autoSize,
  size,
  className,
  rows,
  placeholder,
  ...settings
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <TextArea
            rows={rows}
            placeholder={placeholder}
            {...field}
            autoSize={autoSize}
            size={size}
            status={error ? 'error' : ''}
            className={classNames(error ? `error` : `focus hover`, className)}
            {...settings}
          />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

export default AntdTextArea;

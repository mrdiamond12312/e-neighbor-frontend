import { Input } from 'antd';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import ValidateError from '@/components/Input/ValidateError';

const HiddenInput: React.FC<TPropsFormInput> = ({
  name,
  control,
  type,
  size,
  placeholder,
  className,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Fragment>
            <Input.Password
              {...field}
              disabled={disabled}
              type={type}
              size={size}
              placeholder={placeholder}
              status={error ? 'error' : ''}
              className={classNames(error ? `error` : `focus hover`, className)}
            />
            <ValidateError error={error} />
          </Fragment>
        );
      }}
    />
  );
};

export default HiddenInput;

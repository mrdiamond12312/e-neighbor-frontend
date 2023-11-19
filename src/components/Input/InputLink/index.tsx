import ValidateError from '@/components/Input/ValidateError';
import { Input, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

const InputLink: React.FC<TPropsFormInput> = ({
  name,
  control,
  type,
  size,
  placeholder,
  className,
  placement = 'top',
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <Tooltip title={field?.value} placement={placement}>
            <Input
              {...field}
              type={type}
              size={size}
              placeholder={placeholder}
              className={classNames(error ? `error` : `focus hover`, className)}
              status={error ? 'error' : ''}
            />
          </Tooltip>
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

export default InputLink;

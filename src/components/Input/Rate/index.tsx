import { Rate as AntdRate, RateProps } from 'antd/lib';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

import ValidateError from '@/components/Input/ValidateError';

export type TRateProps = {
  control: any;
  name: string;
  className?: string;
  disabled?: boolean;
} & RateProps;

export const Rate: React.FC<TRateProps> = ({
  control,
  name,
  className,
  disabled,
  ...restProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <AntdRate {...field} className={className} disabled={disabled} {...restProps} />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

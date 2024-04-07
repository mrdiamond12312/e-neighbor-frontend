import { Cascader as AntdCascader, CascaderProps } from 'antd/lib';
import React, { Fragment } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import ValidateError from '@/components/Input/ValidateError';
export type TPropsDragger = {
  control: Control<FieldValues>;
  name: string;
} & CascaderProps;

const Cascader: React.FC<TPropsDragger> = ({ control, name, ...restProps }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <AntdCascader {...field} {...restProps} />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

export default Cascader;

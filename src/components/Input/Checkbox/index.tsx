import { Checkbox as AntdCheckbox } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Space } from 'antd/lib';
import { Fragment } from 'react';
import { Controller } from 'react-hook-form';

import ValidateError from '@/components/Input/ValidateError';

export type TCheckboxOption = {
  value: any;
  label: string;
  disabled?: boolean;
};

export type TCheckbox = {
  size?: SizeType;
  control: any;
  name: string;
  options: TCheckboxOption[];
  className?: string;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
};

const Checkbox: React.FC<TCheckbox> = ({
  control,
  name,
  options,
  className,
  disabled,
  direction,
  ...restProps
}) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <Fragment>
              <AntdCheckbox.Group
                {...field}
                className={className}
                disabled={disabled}
                {...restProps}
              >
                <Space direction={direction ?? 'horizontal'}>
                  {options?.map((item) => (
                    <AntdCheckbox key={item.value} value={item.value} disabled={item.disabled}>
                      {item.label}
                    </AntdCheckbox>
                  ))}
                </Space>
              </AntdCheckbox.Group>
              <ValidateError error={error} />
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
};

export default Checkbox;

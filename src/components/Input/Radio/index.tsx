import { Radio as AntdRadio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Space } from 'antd/lib';
import { Fragment } from 'react';
import { Controller } from 'react-hook-form';

import ValidateError from '@/components/Input/ValidateError';

export type TRadioOption = {
  value: any;
  label: string;
  disabled?: boolean;
};

export type TRadio = {
  size?: SizeType;
  control: any;
  name: string;
  options: TRadioOption[];
  className?: string;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
};

const Radio: React.FC<TRadio> = ({ control, name, options, className, disabled, direction }) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <Fragment>
              <AntdRadio.Group
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className={className}
                disabled={disabled}
              >
                <Space direction={direction ?? 'horizontal'}>
                  {options?.map((item) => (
                    <AntdRadio key={item.value} value={item.value} disabled={item.disabled}>
                      {item.label}
                    </AntdRadio>
                  ))}
                </Space>
              </AntdRadio.Group>
              <ValidateError error={error} />
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
};

export default Radio;

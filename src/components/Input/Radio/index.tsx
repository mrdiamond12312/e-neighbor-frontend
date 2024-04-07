import { Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Fragment } from 'react';
import { Controller } from 'react-hook-form';

declare type TRadio = {
  size?: SizeType;
  control: any;
  name: string;
  values: { code: string | number | boolean; name: string | number }[];
  className?: string;
  disabled?: boolean;
};

const AntdRadio: React.FC<TRadio> = ({ control, name, values, className, disabled }) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <Fragment>
              <Radio.Group
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className={className}
                disabled={disabled}
              >
                {values?.map(
                  (item: {
                    code: number | string | boolean;
                    name: string | number;
                    disabled?: boolean;
                  }) => (
                    <Radio key={item.name} value={item.code} disabled={item.disabled}>
                      {item.name}
                    </Radio>
                  ),
                )}
              </Radio.Group>
              <p className="text-error-6">{error?.message}</p>
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
};

export default AntdRadio;

import { Select as AntdSelect, SelectProps } from 'antd/lib';
import { Fragment } from 'react/jsx-runtime';
import { Controller } from 'react-hook-form';

import ValidateError from '@/components/Input/ValidateError';

export type TSelect = {
  control: any;
  name: string;
  className?: string;
  disabled?: boolean;
} & SelectProps;

const Select: React.FC<TSelect> = ({
  control,
  name,
  size,
  className,
  disabled = false,
  placeholder,
  ...restProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <AntdSelect
            {...field}
            size={size}
            className={className}
            disabled={disabled}
            placeholder={placeholder}
            {...restProps}
          />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
};

export default Select;

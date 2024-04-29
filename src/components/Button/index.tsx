import { Button as AntdButton } from 'antd';
import { ButtonProps } from 'antd/lib';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

export interface IButtonProps extends ButtonProps {
  children: ReactNode;
  btnSize?: 'medium' | 'large';
  isDanger?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  btnSize,
  className,
  isDanger = false,
  type,
  ...restProps
}) => {
  const classNamePropose = classNames(
    'btn-medium',
    { 'btn-medium': btnSize === 'medium', 'btn-large': btnSize === 'large' },
    'btn-default',
    {
      'btn-primary': type === 'primary',
      'btn-dashed': type === 'dashed',
      'btn-text': type === 'text',
    },
    {
      'btn-danger': isDanger,
    },
    className,
  );
  return (
    <AntdButton {...restProps} type={type} className={classNamePropose}>
      {children}
    </AntdButton>
  );
};

export default Button;

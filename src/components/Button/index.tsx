import React, { ReactNode } from 'react';
import { Button as AntdButton } from 'antd';
import classNames from 'classnames';
import { ButtonProps } from 'antd/lib';

type TButtonProps = ButtonProps & {
  children: ReactNode;
  btnSize?: 'medium' | 'large';
};

const Button: React.FC<TButtonProps> = ({ children, btnSize, className, type, ...restProps }) => {
  const classNamePropose = classNames(
    'btn-medium',
    { 'btn-medium': btnSize === 'medium' },
    { 'btn-large': btnSize === 'large' },
    'btn-default',
    { 'btn-primary': type === 'primary' },
    { 'btn-dashed': type === 'dashed' },
    className,
  );
  return (
    <AntdButton {...restProps} type={type} className={classNamePropose}>
      {children}
    </AntdButton>
  );
};

export default Button;

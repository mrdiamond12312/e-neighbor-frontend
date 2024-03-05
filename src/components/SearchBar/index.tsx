import { Input, InputProps } from 'antd/lib';
import React from 'react';
import classNames from 'classnames';
import { SearchOutlined } from '@ant-design/icons';

// TO DO: extend and add a suggestion search for search box
// export interface ISearchProps extends InputProps {

// }

export const SearchBar: React.FC<InputProps> = ({ onPressEnter, ...restProps }) => {
  const className = classNames('ant-input-affix-wrapper-lg', restProps.className);
  return (
    <Input
      onPressEnter={onPressEnter}
      prefix={<SearchOutlined />}
      {...restProps}
      className={className}
    ></Input>
  );
};

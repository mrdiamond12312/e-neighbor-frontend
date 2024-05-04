import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';

export const ThankYouIcon: React.FC = () => {
 return (
    <div className="flex items-center justify-center">
      <CheckCircleOutlined style={{fontSize: '72px'}} className="text-teal-5" />
      <span className="ml-2 text-lg"></span>
    </div>
 );
};
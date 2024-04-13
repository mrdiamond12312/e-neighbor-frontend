import { FacebookOutlined, MailOutlined, PhoneOutlined, TwitterOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Outlet, useIntl } from '@umijs/max';
import React from 'react';

const ContactInfo: React.FC<TComponentsProps> = ({ children }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="w-full bigger-outline">
      <div className=" flex-row justify-center items-center bg-white h-14 shadow-md sticky top-14 px-4 hidden xl:flex z-10">
        <div className="flex flex-row max-w-7xl w-full ">
          <div className="w-full flex flex-row text-body-2-semibold gap-4">
            <div className="flex flex-row justify-center items-center gap-1">
              <PhoneOutlined />
              <p>09xxxxxxxxx</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
              <MailOutlined />
              <p>mail.to@e-neighbor.com.vn</p>
            </div>
          </div>
          <div className="w-full flex flex-row text-body-2-semibold justify-center items-center">
            <p>
              {formatMessage({
                id: 'menu.reminder',
                defaultMessage: 'Hope you get what you wish!',
              })}
            </p>
          </div>
          <div className="w-full flex flex-row gap-2 text-body-2-semibold justify-end items-center">
            <p>
              {formatMessage({
                id: 'menu.linkin',
                defaultMessage: 'Keep in touch:',
              })}
            </p>
            <FacebookOutlined />
            <TwitterOutlined />
          </div>
        </div>
      </div>
      <PageContainer className="max-w-7xl w-full m-auto p-4" header={{ title: '1' }}>
        <Outlet />
        {children}
      </PageContainer>
    </div>
  );
};

export default ContactInfo;

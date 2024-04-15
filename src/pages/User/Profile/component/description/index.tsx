import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import { useEffect } from 'react';
import { useIntl } from 'umi';

import useDataProfile from '@/pages/user/profile/hook/getDataProfile';

const DescriptionsForm: React.FC = () => {
  const { formatMessage } = useIntl();

  const { dataProfile } = useDataProfile();

  useEffect(() => {
    console.log(dataProfile);
  }, [dataProfile]);
  return (
    <div>
      <Descriptions
        title={formatMessage({
          id: 'user.profile.input.login',
          defaultMessage: 'Login Information',
        })}
      >
        <Descriptions.Item
          label={formatMessage({
            id: 'user.profile.input.username',
            defaultMessage: 'Username',
          })}
          span={3}
        >
          {dataProfile?.userName}
        </Descriptions.Item>
        <Descriptions.Item
          label={formatMessage({
            id: 'user.profile.input.password',
            defaultMessage: 'Password',
          })}
          span={3}
        >
          {'******'}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title={formatMessage({
          id: 'user.profile.input.contact',
          defaultMessage: 'Contact Information',
        })}
      >
        <Descriptions.Item
          label={formatMessage({
            id: 'user.profile.input.fullName',
            defaultMessage: 'Full Name',
          })}
          span={3}
        >
          {dataProfile?.fullName}
        </Descriptions.Item>
        <Descriptions.Item
          label={formatMessage({
            id: 'user.profile.input.phoneNumber',
            defaultMessage: 'Phone Number',
          })}
          span={3}
        >
          {dataProfile?.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item
          label={formatMessage({
            id: 'user.profile.input.email',
            defaultMessage: 'Email',
          })}
          span={3}
        >
          {dataProfile?.email}
        </Descriptions.Item>
        <Descriptions.Item
          label={formatMessage({
            id: 'user.profile.input.address',
            defaultMessage: 'Address',
          })}
          span={3}
        >
          {dataProfile?.address}
        </Descriptions.Item>
        <Descriptions.Item
          label={formatMessage({
            id: 'user.profile.input.detailAddress',
            defaultMessage: 'Detail Address',
          })}
          span={3}
        >
          {dataProfile?.detailedAddress}
        </Descriptions.Item>
        <Descriptions.Item
          label={formatMessage({
            id: 'user.profile.input.dateOfBirth',
            defaultMessage: 'Date of Birth',
          })}
          span={3}
        >
          {dataProfile?.dob}
        </Descriptions.Item>
        <Descriptions.Item
          label={formatMessage({
            id: 'user.profile.input.social',
            defaultMessage: 'Social',
          })}
          span={3}
        >
          <a href="#" className="mx-5 px-5">
            {<FacebookOutlined style={{ color: '#344e86' }} />}
          </a>
          <a href="#" className="mx-5 px-5">
            {<InstagramOutlined style={{ color: '#e1306c' }} />}
          </a>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default DescriptionsForm;

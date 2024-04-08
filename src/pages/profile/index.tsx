import { EditOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Card, Col, Descriptions, Input, Modal, Row, Switch } from 'antd/lib';
import React, { useState } from 'react';

import BgProfile from '../../../public/profile/bg-profile.jpg';
import profilavatar from '../../../public/profile/face-2.jpg';
// import { data } from '../../utils/ProfileData';
const Profile: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('judarclitus1920');
  const [password, setPassword] = useState<string>('abcdef');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('Judar Clitus');
  const [mobile, setMobile] = useState<string>('(84) 838 972 219');
  const [email, setEmail] = useState<string>('judarclitus@eneighbor.com');
  const [location, setLocation] = useState<string>('Vietnam');

  const handleToggleEditMode = () => {
    setIsConfirmationModalVisible(true);
  };

  const handleConfirmPassword = () => {
    if (confirmPassword === password) {
      setIsConfirmationModalVisible(false);
      setEditMode(true);
    } else {
      Modal.error({
        title: 'Incorrect Password',
        content: 'Please enter the correct password to proceed.',
      });
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    setEditMode(false);
  };

  const handleCancelChanges = () => {
    setEditMode(false);
  };

  return (
    <PageContainer className="w-full max-w-7xl m-auto">
      <Row gutter={10} className="w-full py-4">
        <Col
          span={4}
          className="min-w-[209px] max-h-[calc(100vh-88px)] flex flex-col gap-4 sticky top-[72px] overflow-auto"
        >
          {/* Todo: Categories here */}
        </Col>

        <Col span={25} className="flex flex-col gap-12">
          <div className="profile-nav-bg" style={{ backgroundImage: `url(${BgProfile})` }} />
          <Card
            className="card-profile-head"
            bodyStyle={{ display: 'none' }}
            title={
              <Row justify="space-between" align="middle" gutter={[24, 0]}>
                <Col span={24} md={12} className="col-info">
                  <Avatar.Group>
                    <Avatar size={74} shape="square" src={profilavatar} />
                    <div className="avatar-info">
                      <h4 className="font-semibold m-0">Judar Clitus</h4>
                      <p>judarclitus@eneighbor.com</p>
                    </div>
                  </Avatar.Group>
                </Col>
                <Col
                  span={24}
                  md={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                ></Col>
              </Row>
            }
          />
          <Row gutter={[24, 0]}>
            <Col span={24} md={8} className="mb-24">
              <Card
                bordered={false}
                className="header-solid h-full"
                title={<h6 className="font-semibold m-0">Platform Settings</h6>}
              >
                <ul className="list settings-list">
                  <li>
                    <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
                  </li>
                  <li>
                    <Switch defaultChecked />
                    <span>Notify me about the payment deadline</span>
                  </li>
                  <li>
                    <Switch />
                    <span>Notify me when someone answers me</span>
                  </li>
                  <li>
                    <Switch defaultChecked />
                    <span>Notify me about product status</span>
                  </li>
                  <li>
                    <h6 className="list-header text-sm text-muted m-0">APPLICATION</h6>
                  </li>
                  <li>
                    <Switch defaultChecked />
                    <span>Monthly product updates</span>
                  </li>
                  <li>
                    <Switch defaultChecked />
                    <span>Suggestions from wishlist</span>
                  </li>
                </ul>
              </Card>
            </Col>

            <Col span={24} md={8} className="mb-24">
              <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Profile Information</h6>}
                className="header-solid h-full card-profile-information"
                extra={
                  <Button type="link" onClick={handleToggleEditMode}>
                    <EditOutlined />
                  </Button>
                }
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                <Descriptions title="Login Information">
                  <Descriptions.Item label="Username" span={3}>
                    {editMode ? (
                      <Input value={username} onChange={handleUsernameChange} />
                    ) : (
                      username
                    )}
                  </Descriptions.Item>

                  <Descriptions.Item label="Password" span={3}>
                    {editMode ? (
                      <Input.Password value={password} onChange={handlePasswordChange} />
                    ) : (
                      '******'
                    )}
                  </Descriptions.Item>
                </Descriptions>

                <Descriptions title="Contact Information">
                  <Descriptions.Item label="Full Name" span={3}>
                    {editMode ? (
                      <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    ) : (
                      fullName
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mobile" span={3}>
                    {editMode ? (
                      <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    ) : (
                      mobile
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email" span={3}>
                    {editMode ? (
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                      email
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location" span={3}>
                    {editMode ? (
                      <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                    ) : (
                      location
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Social" span={3}>
                    <a href="#pablo" className="mx-5 px-5">
                      {<FacebookOutlined style={{ color: '#344e86' }} />}
                    </a>
                    <a href="#pablo" className="mx-5 px-5">
                      {<InstagramOutlined style={{ color: '#e1306c' }} />}
                    </a>
                  </Descriptions.Item>
                </Descriptions>

                {editMode && (
                  <div style={{ textAlign: 'right', marginTop: '16px' }}>
                    <Button
                      type="primary"
                      onClick={handleSaveChanges}
                      style={{ marginRight: '8px' }}
                    >
                      Save Changes
                    </Button>
                    <Button onClick={handleCancelChanges}>Cancel</Button>
                  </div>
                )}
              </Card>
            </Col>
            <Col span={24} md={8} className="mb-24">
              <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Conversations</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                {/* <List
                  itemLayout="horizontal"
                  dataSource={data}
                  split={false}
                  className="conversations-list"
                  renderItem={(item) => (
                    <List.Item key={item.id} actions={[<Button type="link">REPLY</Button>]}>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" size={48} src={item.avatar} />}
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                /> */}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title="Confirm Password"
        visible={isConfirmationModalVisible}
        onOk={handleConfirmPassword}
        onCancel={() => setIsConfirmationModalVisible(false)}
      >
        <Input.Password
          placeholder="Enter your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </Modal>
    </PageContainer>
  );
};

export default Profile;

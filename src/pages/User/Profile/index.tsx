import { EditOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Card, Col, Descriptions, Input, Modal, Row } from 'antd';
import React, { useState } from 'react';

import UserCategories from './Categories';
import useEditForm from './hook/useEditForm';

const Profile: React.FC = () => {
  const {
    username,
    password,
    fullName,
    mobile,
    email,
    location,
    confirmPassword,
    handleUsernameChange,
    handlePasswordChange,
    handleFullNameChange,
    handleMobileChange,
    handleEmailChange,
    handleLocationChange,
    handleConfirmPasswordChange,
  } = useEditForm();

  const [editMode, setEditMode] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [category, setCategory] = useState<string>('user_information');
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

  const handleSaveChanges = () => {
    setEditMode(false);
  };

  const handleCancelChanges = () => {
    setEditMode(false);
  };

  return (
    <PageContainer className="w-full max-w-7xl m-auto">
      <Row gutter={[24, 0]} className="py-4">
        <Col
          span={4}
          className="min-w-[209px] max-h-[calc(100vh-88px)] flex flex-col gap-4 sticky top-[72px] overflow-auto"
        >
          {/* Todo: Categories here */}
          <UserCategories setCategory={setCategory} selectedKeys={(() => [category])()} />
        </Col>

        <Col span={20} className="flex flex-col gap-12">
          {/* <div className="profile-nav-bg bg-cover bg-center" style={{ backgroundImage: `url(${BgProfile})` }} /> */}
          <Card className="card-profile-head">
            <Row justify="space-between" align="middle" gutter={[24, 0]} className="px-4">
              <Col className="col-info">
                <Avatar.Group>{/* Avatar group content here */}</Avatar.Group>
              </Col>
              <Col>
                <Col
                  span={24}
                  md={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                ></Col>
              </Col>
            </Row>
          </Card>
          <Row gutter={[24, 0]}>
            <Col span={24} md={16} className="mb-24">
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
                      <Input
                        className="border-teal-5 rounded-[4px] !bg-transparent align-baseline"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                    ) : (
                      username
                    )}
                  </Descriptions.Item>

                  <Descriptions.Item label="Password" span={3}>
                    {editMode ? (
                      <Input.Password
                        className="border-teal-5 rounded-[4px] !bg-transparent align-baseline"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    ) : (
                      '******'
                    )}
                  </Descriptions.Item>
                </Descriptions>

                <Descriptions title="Contact Information">
                  <Descriptions.Item label="Full Name" span={3}>
                    {editMode ? (
                      <Input
                        className="border-teal-5"
                        value={fullName}
                        onChange={handleFullNameChange}
                      />
                    ) : (
                      fullName
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mobile" span={3}>
                    {editMode ? (
                      <Input
                        className="border-teal-5"
                        value={mobile}
                        onChange={handleMobileChange}
                      />
                    ) : (
                      mobile
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email" span={3}>
                    {editMode ? (
                      <Input className="border-teal-5" value={email} onChange={handleEmailChange} />
                    ) : (
                      email
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location" span={3}>
                    {editMode ? (
                      <Input
                        className="border-teal-5"
                        value={location}
                        onChange={handleLocationChange}
                      />
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
                  <div className="flex justify-end">
                    <Button
                      type="primary"
                      onClick={handleSaveChanges}
                      style={{ marginRight: '5px' }}
                      className="btn-medium btn-primary"
                    >
                      Save Changes
                    </Button>
                    <Button onClick={handleCancelChanges} className="btn-medium btn-default">
                      Cancel
                    </Button>
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
                {/* Conversations content here */}
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
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsConfirmationModalVisible(false)}
            className="btn-medium btn-default"
          >
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleConfirmPassword}
            className="btn-medium btn-primary"
          >
            Confirm
          </Button>,
        ]}
      >
        <Input.Password
          placeholder="Enter your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="border-teal-5 rounded-[4px] !bg-transparent align-baseline"
        />
      </Modal>
    </PageContainer>
  );
};

export default Profile;

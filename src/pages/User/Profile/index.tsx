import {
  EditOutlined,
  FacebookOutlined,
  InstagramOutlined,
  SearchOutlined,
  BellTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Input,
  Modal,
  DatePicker,
  Row,
  Badge,
  Form,
  type FormProps,
  Radio,
  type RadioChangeEvent,
  Popconfirm,
  type PopconfirmProps,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import '@/pages/User/Profile/asset/Profile.css';
import UserCategories from '@/pages/User/Categories';
import useEditForm from '@/pages/User/Profile/hook/useEditForm';

const Profile: React.FC = () => {
  const {
    confirmPassword,
    handleConfirmPasswordChange,
    dataConversation,
    dataProfile,
    handleDataProfile,
  } = useEditForm();

  const [gender, setGender] = useState(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
  const [, setCategory] = useState<string>('user_information');
  const handleToggleEditMode = () => {
    setIsConfirmationModalVisible(true);
  };

  type FieldType = {
    usernameForm?: string;
    passwordForm?: string;
    fullNameForm?: string;
    mobileForm?: string;
    emailForm?: string;
    locationForm?: string;
    addressForm?: string;
    detailedAddressForm?: string;
    dobForm?: string;
    roleForm?: string;
    avatar?: string;
    genderForm?: string;
    avatarForm?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    handleDataProfile({
      username: values.usernameForm,
      password: values.passwordForm,
      fullName: values.fullNameForm,
      mobile: values.mobileForm,
      email: values.emailForm,
      location: values.locationForm,
      address: values.addressForm,
      detailedAddress: values.detailedAddressForm,
      dob: moment(values?.dobForm).format('YYYY-MM-DD'),
      role: values.roleForm,
      avatar: values.avatarForm,
      gender: values.genderForm,
    });
    setEditMode(false);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const handleConfirmPassword = () => {
    if (confirmPassword === dataProfile?.password) {
      setIsConfirmationModalVisible(false);
      setEditMode(true);
    } else {
      Modal.error({
        title: 'Incorrect Password',
        content: 'Please enter the correct password to proceed.',
      });
    }
  };

  const itemConversation = (item: any) => {
    return (
      <Row gutter={2} className="flex flex-row my-7">
        <Col span={4}>
          <Avatar shape="square" size={38} icon={<UserOutlined />} />
        </Col>
        <Col span={16}>
          <p className="font-semibold">{item.name}</p>
          <p className="font-medium text-xs text-gray-400">{item.content}</p>
        </Col>
        <Col span={4} className="mt-4">
          <a href="" className="uppercase font-semibold text-xs text-sky-400">
            Reply
          </a>
        </Col>
      </Row>
    );
  };

  const confirm: PopconfirmProps['onConfirm'] = () => {
    setEditMode(false);
  };

  const cancel: PopconfirmProps['onCancel'] = () => {};

  return (
    <PageContainer className="w-full max-w-7xl m-auto">
      <Row gutter={[24, 0]} className="py-4">
        <Col
          span={24}
          md={4}
          className="min-w-[209px] max-h-[calc(100vh-88px)] flex flex-col gap-4 sticky top-[72px] overflow-auto"
        >
          <UserCategories setCategory={setCategory} />
        </Col>

        <Col span={24} md={20} className="flex flex-col gap-12">
          <div className="img__background--profile">
            <div className="header__profile">
              <div className="header__profile--title">
                <div>
                  <p>User/Profile</p>
                </div>
                <p style={{ margin: '10px 0 0 0', fontWeight: 600 }}>Profile</p>
              </div>
              <div className="header__profile--notification">
                <Input
                  className="input__profile"
                  placeholder="Type here..."
                  prefix={<SearchOutlined />}
                />
                <Badge count={5}>
                  <BellTwoTone className="icon__bell" />
                </Badge>
              </div>
            </div>
          </div>
          <Card className="card-profile-head">
            <Row gutter={[24, 0]} className="flex">
              <Avatar
                style={{ margin: '0 10px' }}
                shape="square"
                size={60}
                icon={<UserOutlined />}
              />
              <div>
                <p className="profile__name">{dataProfile.fullName}</p>
                <p className="font-medium text-sm text-gray-400">{dataProfile.email}</p>
              </div>
            </Row>
          </Card>

          <Row gutter={[24, 0]}>
            <Col span={24} md={16} className="mb-4 sm:mb-24">
              <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Profile Information</h6>}
                className="header-solid h-full card-profile-information"
                extra={
                  !editMode ? (
                    <Button type="link" onClick={handleToggleEditMode}>
                      <EditOutlined />
                    </Button>
                  ) : (
                    <div></div>
                  )
                }
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                {!editMode ? (
                  <div>
                    <Descriptions title="Login Information">
                      <Descriptions.Item label="Username" span={3}>
                        {dataProfile.username}
                      </Descriptions.Item>
                      <Descriptions.Item label="Password" span={3}>
                        {'******'}
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Contact Information">
                      <Descriptions.Item label="Full Name" span={3}>
                        {dataProfile.fullName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mobile" span={3}>
                        {dataProfile.mobile}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email" span={3}>
                        {dataProfile.email}
                      </Descriptions.Item>

                      <Descriptions.Item label="Address" span={3}>
                        {dataProfile.address}
                      </Descriptions.Item>
                      <Descriptions.Item label="Detail Address" span={3}>
                        {dataProfile.detailAddress}
                      </Descriptions.Item>
                      <Descriptions.Item label="Date of birth" span={3}>
                        {dataProfile.dob}
                      </Descriptions.Item>
                      <Descriptions.Item label="Role" span={3}>
                        {dataProfile.role}
                      </Descriptions.Item>
                      <Descriptions.Item label="Gender" span={3}>
                        {dataProfile.gender}
                      </Descriptions.Item>

                      <Descriptions.Item label="Location" span={3}>
                        {dataProfile.location}
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
                  </div>
                ) : (
                  <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 700 }}
                    initialValues={{
                      usernameForm: dataProfile?.username,
                      passwordForm: dataProfile?.password,
                      fullNameForm: dataProfile?.fullName,
                      mobileForm: dataProfile?.mobile,
                      emailForm: dataProfile?.email,
                      locationForm: dataProfile?.location,
                      genderForm: 0,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <div className="font-semibold mt-3">Login Information</div>
                    <Form.Item<FieldType>
                      label="Username"
                      name="usernameForm"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Password"
                      name="passwordForm"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <div className="font-semibold">Contact Information</div>
                    <Form.Item<FieldType>
                      label="Email"
                      name="emailForm"
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Full Name" name="fullNameForm">
                      <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Address" name="addressForm">
                      <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Detail Address" name="detailedAddressForm">
                      <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Date of birth" name="dobForm">
                      <DatePicker />
                    </Form.Item>
                    <Form.Item<FieldType> label="Role" name="roleForm">
                      <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Gender" name="genderForm">
                      <Radio.Group onChange={onChange} value={gender}>
                        <Radio value={0}>Nam</Radio>
                        <Radio value={1}>Nữ</Radio>
                        <Radio value={2}>Khác</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item<FieldType> label="Mobile" name="mobileForm">
                      <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Location" name="locationForm">
                      <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                      <div className="flex justify-end">
                        <Button
                          type="primary"
                          style={{ marginRight: '5px' }}
                          className="btn-medium btn-primary"
                          htmlType="submit"
                        >
                          Save Changes
                        </Button>
                        <Popconfirm
                          title="Confirm exit"
                          description="If you exit, you will lose modified data"
                          onConfirm={confirm}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button className="btn-medium btn-default">Cancel</Button>
                        </Popconfirm>
                      </div>
                    </Form.Item>
                  </Form>
                )}
              </Card>
            </Col>

            <Col span={24} md={8} className="mb-4 sm:mb-24">
              <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Conversations</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                {dataConversation.map((item: any) => {
                  return itemConversation(item);
                })}
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

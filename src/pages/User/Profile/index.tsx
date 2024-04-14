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
  Image,
  Row,
  Badge,
  Form,
  type FormProps,
  Popconfirm,
  type PopconfirmProps,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import '@/pages/User/Profile/asset/Profile.css';
import UserCategories from '@/pages/User/Categories';
import { fetchAuthInfo } from '@/services/auth/services';
import { dataConversation } from '@/utils/dataConversation';
dayjs.extend(customParseFormat);

const Profile: React.FC = () => {
  const [dataProfileAPI, setDataProfileAPI] = useState<any>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [, setCategory] = useState<string>('user_information');
  const dateFormat = 'YYYY/MM/DD';
  const handleToggleEditMode = () => {
    setIsConfirmationModalVisible(true);
  };

  useEffect(() => {
    const getData = async () => {
      const currentUser = await fetchAuthInfo();
      setDataProfileAPI(currentUser);
    };
    getData();
  }, []);

  type FieldType = {
    userName?: string;
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    detailedAddress?: string;
    dob?: string;
    avatar?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    let dataTemp = {
      ...values,
      dob: moment(values?.dob).format(dateFormat),
    };
    setDataProfileAPI(dataTemp);
    setEditMode(false);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleConfirmPassword = () => {
    if (confirmPassword === dataProfileAPI?.password) {
      setIsConfirmationModalVisible(false);
      setEditMode(true);
    } else {
      Modal.error({
        title: 'Incorrect Password',
        content: 'Please enter the correct password to proceed.',
        okButtonProps: { className: 'btn-medium btn-primary' },
      });
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
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
          <a href="#" className="uppercase font-semibold text-xs text-sky-400">
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
              <div className="mx-3">
                <Image
                  width={60}
                  height={60}
                  src={dataProfileAPI?.avatar}
                  fallback="data:image/png;base64,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"
                />
              </div>
              <div>
                <p className="profile__name">{dataProfileAPI?.fullName}</p>
                <p className="font-medium text-sm text-gray-400">{dataProfileAPI?.email}</p>
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
                        {dataProfileAPI?.userName}
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Contact Information">
                      <Descriptions.Item label="Full Name" span={3}>
                        {dataProfileAPI?.fullName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mobile" span={3}>
                        {dataProfileAPI?.phoneNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email" span={3}>
                        {dataProfileAPI?.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Address" span={3}>
                        {dataProfileAPI?.address}
                      </Descriptions.Item>
                      <Descriptions.Item label="Detail Address" span={3}>
                        {dataProfileAPI?.detailedAddress}
                      </Descriptions.Item>
                      <Descriptions.Item label="Date of birth" span={3}>
                        {dataProfileAPI?.dob}
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
                      userName: dataProfileAPI?.userName,
                      fullName: dataProfileAPI?.fullName,
                      phoneNumber: dataProfileAPI?.phoneNumber,
                      email: dataProfileAPI?.email,
                      address: dataProfileAPI?.address,
                      detailedAddress: dataProfileAPI?.detailedAddress,
                      dob: dataProfileAPI?.dob ? dayjs(dataProfileAPI?.dob) : dayjs(),
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <div className="font-semibold mt-3">Login Information</div>
                    <Form.Item<FieldType>
                      label="Username"
                      name="userName"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>
                    <div className="font-semibold">Contact Information</div>
                    <Form.Item<FieldType>
                      label="Email"
                      name="email"
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
                    <Form.Item<FieldType> label="Full Name" name="fullName">
                      <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Address" name="address">
                      <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Detail Address" name="detailedAddress">
                      <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Date of birth" name="dob">
                      <DatePicker format={dateFormat} />
                    </Form.Item>
                    <Form.Item<FieldType> label="Phone Number" name="phoneNumber">
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
                          okButtonProps={{ className: 'btn-medium btn-primary' }}
                          cancelButtonProps={{ className: 'btn-medium btn-default' }}
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

import { EditOutlined, SearchOutlined, BellTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Input, Modal, Image, Row, Badge } from 'antd';
import React, { useState } from 'react';
import '@/pages/user/profile/asset/profile.css';
import { useIntl } from 'umi';

import UserCategories from '@/pages/user/categories';
import itemConversation from '@/pages/user/profile/components/Conservation';
import DescriptionsForm from '@/pages/user/profile/components/Description';
import FormInfo from '@/pages/user/profile/components/FormInfo';
import useEditForm from '@/pages/user/profile/hook/useEditForm';
import { dataConversation } from '@/utils/dataConversation';

const Profile: React.FC = () => {
  const { formatMessage } = useIntl();

  const { confirmPassword, handleConfirmPasswordChange, dataProfile, handleEditMode, editMode } =
    useEditForm();

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
  const [, setCategory] = useState<string>('user.category.profile');
  const handleToggleEditMode = () => {
    setIsConfirmationModalVisible(!isConfirmationModalVisible);
  };

  const handleConfirmPassword = () => {
    if (confirmPassword === dataProfile?.password) {
      setIsConfirmationModalVisible(false);
      handleEditMode(true);
    } else {
      Modal.error({
        title: formatMessage({
          id: 'user.profile.incorrectPassword',
          defaultMessage: 'Incorrect Password',
        }),
        content: formatMessage({
          id: 'user.profile.incorrectPassword.content',
          defaultMessage: 'Please enter the correct password to proceed.',
        }),
        okButtonProps: { className: 'btn-medium btn-primary' },
      });
    }
  };

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
                <Image width={60} height={60} src={dataProfile?.avatar} />
              </div>
              <div>
                <p className="profile__name">{dataProfile?.fullName}</p>
                <p className="font-medium text-sm text-gray-400">{dataProfile?.email}</p>
              </div>
            </Row>
          </Card>
          <Row gutter={[24, 0]}>
            <Col span={24} md={16} className="mb-4 sm:mb-24">
              <Card
                bordered={false}
                title={
                  <h6 className="font-semibold m-0">
                    {formatMessage({
                      id: 'user.profile.input.profileInformation',
                      defaultMessage: 'Profile Information',
                    })}
                  </h6>
                }
                className="header-solid h-full card-profile-information"
                extra={
                  !editMode ? (
                    <Button type="link" onClick={handleToggleEditMode}>
                      {' '}
                      <EditOutlined />{' '}
                    </Button>
                  ) : (
                    <div></div>
                  )
                }
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                {!editMode ? <DescriptionsForm /> : <FormInfo />}
              </Card>
            </Col>
            <Col span={24} md={8} className="mb-4 sm:mb-24">
              <Card
                bordered={false}
                title={
                  <h6 className="font-semibold m-0">
                    {formatMessage({
                      id: 'user.profile.conversation',
                      defaultMessage: 'Conversation',
                    })}
                  </h6>
                }
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
        title={formatMessage({
          id: 'user.profile.input.confirmPassword',
          defaultMessage: 'Confirm Password',
        })}
        visible={isConfirmationModalVisible}
        onCancel={() => setIsConfirmationModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsConfirmationModalVisible(false)}
            className="btn-medium btn-default"
          >
            {formatMessage({
              id: 'user.profile.input.cancelBtn',
              defaultMessage: 'Cancel',
            })}
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleConfirmPassword}
            className="btn-medium btn-primary"
          >
            {formatMessage({
              id: 'user.profile.input.confirm',
              defaultMessage: 'Confirm',
            })}
          </Button>,
        ]}
      >
        <Input.Password
          placeholder={formatMessage({
            id: 'user.profile.enterPassword',
            defaultMessage: 'Please Enter Your Password',
          })}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="border-teal-5 rounded-[4px] !bg-transparent align-baseline"
        />
      </Modal>
    </PageContainer>
  );
};

export default Profile;

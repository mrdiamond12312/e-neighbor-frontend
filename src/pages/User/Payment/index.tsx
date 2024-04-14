import { CalendarFilled, DeleteFilled, EditFilled } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Row, Col, Card, Button, Modal, Form, type FormProps, Input } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import UserCategories from '@/pages/User/Categories';

const Payment: React.FC = () => {
  const [, setCategory] = useState<string>('payment');
  const [isModalVisit, setIsModalVisit] = useState(false);

  type FieldType = {
    creditCard?: string;
    name?: string;
    CVV?: string;
    expirationDate?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalVisit(true);
  };

  const handleCancelVisit = () => {
    setIsModalVisit(false);
  };

  const itemTransactions = () => {
    return (
      <Col className="flex justify-between mt-4">
        <div>
          <p className="font-semibold text-xs">Ten san pham</p>
          <p className="text-xs text-slate-400">Loai san pham</p>
        </div>
        <p className="text-red-500 font-medium">50.000</p>
      </Col>
    );
  };

  const itemBill = () => {
    return (
      <Col className="flex justify-between items-center my-5">
        <div className="flex items-center">
          <p className="pr-5">img</p>
          <div>
            <p>Ten san pham</p>
            <p>
              So luong: <span>1</span>
            </p>
            <p>
              Thanh tien: <span>50.000</span>
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex cursor-pointer">
            <DeleteFilled style={{ color: '#dc2626' }} />
            <p className="uppercase text-xs text-red-500 font-medium pl-1">Delete</p>
          </div>
          <div className="flex ml-4 cursor-pointer">
            <EditFilled />
            <p className="uppercase text-xs text-gray-400 font-medium pl-1">edit</p>
          </div>
        </div>
      </Col>
    );
  };

  const itemCardVisit = () => {
    return (
      <Col>
        <Card className="mt-5">
          <div className="flex justify-between items-center">
            <p>img</p>
            <p>**** **** **** 763</p>
            <EditFilled className="cursor-pointer" />
          </div>
        </Card>
      </Col>
    );
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
        <Col span={24} md={20}>
          {/* <Col span={24} className="flex justify-between items-center">
            <Col>
              <p>
                <span className="text-stone-400">User</span> / Billing
              </p>
              <p className="font-semibold pt-1">Billing</p>
            </Col>
          </Col> */}
          <Row gutter={20} className="mt-5">
            <Col span={24} md={15}>
              <Card>
                <div className="flex justify-between">
                  <p className="font-semibold">Billing Information</p>
                  {/* <Button className='btn-medium btn-primary'>ADD NEW PRODUCT</Button> */}
                </div>
                <Col span={24}>
                  {itemBill()}
                  {itemBill()}
                  {itemBill()}
                </Col>
                <div className="text-right">
                  <Button className="btn-medium btn-primary uppercase">payment confirmation</Button>
                </div>
              </Card>
            </Col>
            <Col span={24} md={9}>
              <Card>
                <Col className="flex justify-between items-center" span={24}>
                  <p className="font-semibold">Payment Methods</p>
                  <Button className="btn-medium btn-primary" onClick={showModal}>
                    ADD NEW CARD
                  </Button>
                </Col>
                <Col span={24}>{itemCardVisit()}</Col>
              </Card>
              <Card className="mt-5">
                <Col span={24} className="flex justify-between">
                  <p className="font-semibold">Your Transactions</p>
                  <Col className="flex">
                    <CalendarFilled />
                    <p className="pl-2">{moment().format('MM-DD-YYYY')}</p>
                  </Col>
                </Col>
                {itemTransactions()}
                {itemTransactions()}
                {itemTransactions()}
                {itemTransactions()}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal title="Add Visist Card" open={isModalVisit} onCancel={handleCancelVisit} footer={[]}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Credit Card"
            name="creditCard"
            rules={[{ required: true, message: 'Please input your credit card!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Expiration Date"
            name="expirationDate"
            rules={[{ required: true, message: 'Please input your expiration date!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="CVV"
            name="CVV"
            rules={[{ required: true, message: 'Please input your CVV!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }} className="text-right">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={handleCancelVisit} className="ml-5">
              Cancel
            </Button>
            ,
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
export default Payment;

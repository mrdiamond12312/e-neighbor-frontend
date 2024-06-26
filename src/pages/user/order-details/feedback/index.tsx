import { CheckCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Form, Modal } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import Button from '@/components/Button';
import InputText from '@/components/Input';
import { ImageDragger } from '@/components/Input/ImageDragger';
import { Rate } from '@/components/Input/Rate';
import {
  FEEDBACK_FORM_KEY,
  useFeedbackForm,
} from '@/pages/user/order-details/feedback/hooks/useFeedback';

const { Item } = Form;

const FeedbackModal: React.FC = () => {
  const { orderId, isOpen, setIsOpen, handleFeedback, isLoading, afterClose, control, getValues } =
    useFeedbackForm();
  const size: SizeType = 'large';

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      afterClose={afterClose}
      title={
        <h1 className="text-heading-4 font-sans">
          <FormattedHTMLMessage
            id="user.orders.feedback.header"
            defaultMessage="Add Feedback for Order #{orderId}"
            values={{ orderId }}
          />
        </h1>
      }
      footer={
        <Flex className="flex-row gap-2 border-t pt-3 border-teal-7 justify-end">
          <Button
            type="primary"
            loading={isLoading}
            icon={<CheckCircleOutlined />}
            onClick={() => handleFeedback(getValues())}
          >
            <FormattedHTMLMessage
              id="user.order.feedback.button.submit"
              defaultMessage="Submit Feedback!"
            />
          </Button>
        </Flex>
      }
      className="font-sans text-body-2-medium"
    >
      <FormattedHTMLMessage
        id="user.order.feedback.check.question"
        defaultMessage="Rating this service to make more people know about it"
      />

      <Form
        layout="horizontal"
        rootClassName="custom-antd-form-small pt-6"
        labelCol={{ span: 24, lg: 8 }}
        wrapperCol={{ span: 24, lg: 16 }}
      >
        <Item
          label={
            <FormattedHTMLMessage
              id="user.orders.feedback.fields.star.label"
              defaultMessage="Star Rating"
            />
          }
          required
        >
          <Rate
            control={control}
            name={FEEDBACK_FORM_KEY['star']}
            className="h-10 content-center"
          />
        </Item>
        <Item
          label={
            <FormattedHTMLMessage
              id="user.orders.feedback.fields.content.label"
              defaultMessage="Comment"
            />
          }
          required
        >
          <InputText
            placement="top"
            control={control}
            name={FEEDBACK_FORM_KEY['content']}
            size={size}
          />
        </Item>
        <Item
          label={
            <FormattedHTMLMessage
              id="user.orders.feedback.fields.image.label"
              defaultMessage="Image of Product"
            />
          }
        >
          <ImageDragger
            control={control}
            name={FEEDBACK_FORM_KEY['image']}
            maxCount={1}
            className="custom-ant-upload"
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default FeedbackModal;

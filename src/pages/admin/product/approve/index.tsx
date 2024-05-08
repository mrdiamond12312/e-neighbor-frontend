import { CheckCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Form, Input, Modal } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

import Button from '@/components/Button';
import InputText from '@/components/Input';
import Radio from '@/components/Input/Radio';
import {
  PRODUCT_APPROVAL_FORM_KEY,
  useProductApproval,
} from '@/pages/admin/product/approve/hooks/useProductApproval';
const { Item } = Form;

const RejectModal: React.FC = () => {
  const {
    productId,
    isOpen,
    setIsOpen,
    handleReviewSubmit,
    isLoading,
    afterClose,
    control,
    getValues,
    isApprovedWatcher,
    isApprovedOptions,
  } = useProductApproval();

  const size: SizeType = 'large';

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      afterClose={afterClose}
      title={
        <h1 className="text-heading-4 font-sans">
          <FormattedHTMLMessage
            id="admin.product.approve.header"
            defaultMessage="Reviewing Product #{productId} Approval Request"
            values={{ productId }}
          />
        </h1>
      }
      footer={
        <Flex className="flex-row gap-2 border-t pt-3 border-teal-3 justify-end">
          <Button
            type="primary"
            loading={isLoading}
            icon={<CheckCircleOutlined />}
            onClick={() => handleReviewSubmit(getValues())}
          >
            <FormattedHTMLMessage
              id="admin.product.approve.button.submit"
              defaultMessage="Submit Reviews!"
            />
          </Button>
        </Flex>
      }
      className="font-sans text-body-2-medium"
    >
      <FormattedHTMLMessage
        id="admin.product.approve.check"
        defaultMessage="The product may or may not meet our requirement, please be careful!"
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
              id="admin.product.approve.fields.productId.label"
              defaultMessage="Product ID"
            />
          }
          required
        >
          <Input
            className="custom-input h-[38px]"
            size={size}
            value={productId}
            readOnly
            disabled
          />
        </Item>

        <Item
          label={
            <FormattedHTMLMessage
              id="admin.product.approve.fields.isApproved.label"
              defaultMessage="Approval"
            />
          }
          required
        >
          <Radio
            control={control}
            name={PRODUCT_APPROVAL_FORM_KEY['isApproved']}
            size={size}
            direction="horizontal"
            options={isApprovedOptions}
            className="custom-radio"
          />
        </Item>

        <Item
          label={
            <FormattedHTMLMessage
              id="admin.product.approve.fields.rejectReason.label"
              defaultMessage="Reject Reason"
            />
          }
          required={!isApprovedWatcher}
        >
          <InputText
            placeholder="abcxyz"
            placement="top"
            control={control}
            name={PRODUCT_APPROVAL_FORM_KEY['rejectReason']}
            size={size}
            disabled={isApprovedWatcher}
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default RejectModal;

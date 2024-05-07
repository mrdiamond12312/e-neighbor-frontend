import { LoadingOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage, Link, Outlet } from '@umijs/max';
import { Flex, Modal, Spin } from 'antd/lib';
import React, { Fragment } from 'react';
import urlcat from 'urlcat';

import Button from '@/components/Button';
import {
  PATH_USER_PROFILE_ORDER_CANCELING,
  PATH_USER_PROFILE_ORDER_FEEDBACK,
  PATH_USER_PROFILE_ORDER_IMAGERECEIPT,
} from '@/const/path';
import { ActionButtons } from '@/pages/user/order-details/components/ActionButtons';
import { DeliveryImage } from '@/pages/user/order-details/components/DeliveryImage';
import { DeliveryInfo } from '@/pages/user/order-details/components/DeliveryInfo';
import { OrderSteps } from '@/pages/user/order-details/components/OrderSteps';
import { PricingInfo } from '@/pages/user/order-details/components/PricingInfo';
import { useOrderDetailsModal } from '@/pages/user/order-details/hooks/useOrderDetailsModal';

import './orderDetails.css';

const UserOrderDetails: React.FC = () => {
  const { orderId, isOpen, setIsOpen, handleCancel, data, isLoading } = useOrderDetailsModal();
  return (
    <Fragment>
      <Modal
        open={isOpen}
        className="ripped-paper-modal"
        title={
          <h1 className="text-heading-4 font-sans">
            <FormattedHTMLMessage
              id="order.detail.modal.header"
              defaultMessage="Detail of Order #{orderId}"
              values={{ orderId }}
            />
          </h1>
        }
        afterClose={handleCancel}
        onCancel={() => setIsOpen(false)}
        footer={
          <Flex className="flex-row gap-2 border-t pt-3 border-teal-7 justify-end flex-wrap">
            <Link to={urlcat(PATH_USER_PROFILE_ORDER_FEEDBACK, { orderId })}>
              <Button type="primary" disabled={data?.orderStatus !== 'COMPLETED'}>
                <FormattedHTMLMessage
                  id="order.detail.modal.navigate.feedback"
                  defaultMessage="Add Feedback"
                />
              </Button>
            </Link>
            <Link to={urlcat(PATH_USER_PROFILE_ORDER_IMAGERECEIPT, { orderId })}>
              <Button disabled={data?.orderStatus !== 'APPROVED'}>
                <FormattedHTMLMessage
                  id="order.detail.modal.navigate.receipt"
                  defaultMessage="Add a Receipt Image!"
                />
              </Button>
            </Link>
            <Link to={urlcat(PATH_USER_PROFILE_ORDER_CANCELING, { orderId })}>
              <Button isDanger disabled={data?.orderStatus !== 'PENDING'}>
                <FormattedHTMLMessage
                  id="order.detail.modal.navigate.cancel"
                  defaultMessage="Cancel this Order!"
                />
              </Button>
            </Link>
          </Flex>
        }
        width={'fit-content'}
        style={{ minWidth: '500px', maxWidth: '1280px', padding: '16px' }}
      >
        {isLoading ? (
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24, color: 'teal' }} />}
            spinning={isLoading}
          />
        ) : (
          <Fragment>
            <OrderSteps data={data} />
            <ActionButtons
              productId={data?.product.id}
              lessorId={data?.product.lessor.id}
              shopName={data?.product.lessor.shopName}
            />
            <Flex className="w-full md:flex-row flex-col">
              <DeliveryInfo
                userFullname={data?.user.fullName}
                phoneNumber={data?.user.phoneNumber}
                address={data?.deliveryAddress}
              />
              <DeliveryImage
                imageUponDelivery={data?.imagesUponReceipt?.[0] ?? undefined}
                imageUponReturn={data?.imagesUponReturn?.[0] ?? undefined}
              />
            </Flex>
            <PricingInfo data={data} />
            <Outlet />
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
};

export default UserOrderDetails;

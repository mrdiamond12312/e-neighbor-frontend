import { LoadingOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage, Link, Outlet } from '@umijs/max';
import { Flex, Modal, Spin } from 'antd/lib';
import React, { Fragment } from 'react';
import urlcat from 'urlcat';

import Button from '@/components/Button';
import {
  PATH_LESSOR_ORDERS_APPROVE,
  PATH_LESSOR_ORDERS_DELIVERY_IMAGE,
  PATH_LESSOR_ORDERS_REJECT,
  PATH_LESSOR_ORDERS_RETURN_IMAGE,
} from '@/const/path';
import { DeliveryImage } from '@/pages/lessor/order-details/components/DeliveryImage';
import { DeliveryInfo } from '@/pages/lessor/order-details/components/DeliveryInfo';
import { LessorActionButtons } from '@/pages/lessor/order-details/components/LessorActionButtons';
import { OrderSteps } from '@/pages/lessor/order-details/components/OrderSteps';
import { PricingInfo } from '@/pages/lessor/order-details/components/PricingInfo';
import { useLessorOrderDetailsModal } from '@/pages/lessor/order-details/hooks/useLessorOrderDetailsModal';

import './orderDetails.css';

const LessorOrderDetails: React.FC = () => {
  const { orderId, isOpen, setIsOpen, handleCancel, data, isLoading } =
    useLessorOrderDetailsModal();
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
          <Flex className="flex-row gap-2 border-t pt-3 border-teal-7 justify-end">
            <Link to={urlcat(PATH_LESSOR_ORDERS_APPROVE, { orderId })}>
              <Button type="primary" disabled={data?.orderStatus !== 'PENDING'}>
                <FormattedHTMLMessage
                  id="lessor.order.detail.modal.navigate.approve"
                  defaultMessage="Approve this Order"
                />
              </Button>
            </Link>
            <Link to={urlcat(PATH_LESSOR_ORDERS_DELIVERY_IMAGE, { orderId })}>
              <Button disabled={data?.orderStatus !== 'APPROVED'}>
                <FormattedHTMLMessage
                  id="lessor.order.detail.modal.navigate.deliveryImage"
                  defaultMessage="Add a Proof of Delivery Image"
                />
              </Button>
            </Link>
            <Link to={urlcat(PATH_LESSOR_ORDERS_RETURN_IMAGE, { orderId })}>
              <Button disabled={data?.orderStatus !== 'IN PROGRESS'}>
                <FormattedHTMLMessage
                  id="lessor.order.detail.modal.navigate.returnImage"
                  defaultMessage="Add a Proof of Finish Image"
                />
              </Button>
            </Link>
            <Link to={urlcat(PATH_LESSOR_ORDERS_REJECT, { orderId })}>
              <Button isDanger disabled={data?.orderStatus !== 'PENDING'}>
                <FormattedHTMLMessage
                  id="lessor.order.detail.modal.navigate.reject"
                  defaultMessage="Reject this Order!"
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
            <LessorActionButtons
              productId={data?.product.id}
              userId={data?.user.id}
              userName={data?.user.fullName}
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
          </Fragment>
        )}
      </Modal>
      <Outlet />
    </Fragment>
  );
};

export default LessorOrderDetails;

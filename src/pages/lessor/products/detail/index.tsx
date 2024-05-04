import { FormattedHTMLMessage } from '@umijs/max';
import { Divider, Flex, Table } from 'antd/lib';
import React from 'react';

import Loading from '@/loading';
import UnauthorizedPage from '@/pages/403';
import NoFoundPage from '@/pages/404';
import { useProductOrdersTable } from '@/pages/lessor/products/detail/hooks/useProductOrdersTable';
import ProductDetail from '@/pages/product/detail';

const LessorProductDetails: React.FC = () => {
  const {
    columns,
    ordersPageLoading,
    ordersData,
    handleTableChange,
    take,
    page,
    productId,
    isRetrievingProductError,
    isRetrievingProduct,
    isOwnedByLessor,
    formatMessage,
  } = useProductOrdersTable();

  if (isRetrievingProduct)
    return (
      <Loading
        extra={formatMessage(
          {
            id: 'product.details.loading.description',
            defaultMessage: 'Loading Product #{productId}',
          },
          { productId },
        )}
      />
    );

  if (isRetrievingProductError)
    return (
      <NoFoundPage
        subTitle={
          <p className="font-sans text-body-1-semibold">
            <FormattedHTMLMessage
              id="product.details.error.notExist"
              defaultMessage="The product that you are looking for does not exist!"
            />
          </p>
        }
      />
    );

  if (!isOwnedByLessor)
    return (
      <UnauthorizedPage
        subTitle={
          <p className="font-sans text-body-1-semibold">
            <FormattedHTMLMessage
              id="product.details.error.notOwned"
              defaultMessage="You are not the Lessor that owned this product!"
            />
          </p>
        }
      />
    );

  return (
    <ProductDetail
      extra={
        <Flex className="bg-neutral-1 rounded-lg p-4 flex-col w-full">
          <Divider className="font-sans !text-heading-5 pb-4">
            <FormattedHTMLMessage
              id="lessor.product.detail.order.header"
              defaultMessage="Orders for product #{productId}"
              values={{ productId }}
            />
          </Divider>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={ordersData?.data}
            loading={ordersPageLoading}
            onChange={handleTableChange}
            className="custom-table w-full overflow-auto h-fit"
            pagination={{
              pageSize: take,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: [6, 12],
              current: page,
            }}
          />
        </Flex>
      }
    />
  );
};

export default LessorProductDetails;

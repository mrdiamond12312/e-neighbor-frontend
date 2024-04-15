import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Table } from 'antd/lib';
import { TableProps } from 'antd/lib/table';
import { SorterResult } from 'antd/lib/table/interface';
import React from 'react';

import { ORDER, PRODUCT_PAGE_SORTFIELDS, usePagination } from '@/hooks/usePagination';
import { useProductsTable } from '@/pages/lessor/products/management/hooks/useProductsTable';
import { useProductPage } from '@/services/products/services';

const ProductManagement: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  console.log(initialState);
  const {
    pageHandler,
    takeHandler,
    categoryIdHandler,
    paginationParams,
    sortFieldHandler,
    orderHandler,
    take,
  } = usePagination();

  const { columns } = useProductsTable();
  const { data: productPage, isLoading: productPageLoading } = useProductPage(paginationParams);

  const handleTableChange: TableProps['onChange'] = (
    pagination,
    filters,
    sorter: SorterResult<API.IProductCard> | SorterResult<API.IProductCard>[],
  ) => {
    pageHandler(pagination.current ?? 1);
    takeHandler(pagination.pageSize ?? 10);
    categoryIdHandler(filters.category?.at(-1) ?? undefined);
    if (!Array.isArray(sorter)) {
      orderHandler(
        sorter.order ? (sorter.order === 'ascend' ? ORDER['asc'] : ORDER['des']) : undefined,
      );
      sortFieldHandler(sorter.field as PRODUCT_PAGE_SORTFIELDS);
    }
    console.log(pagination, filters, sorter);
  };

  return (
    <PageContainer
      className="max-h-[calc(100vh-56px)] xl:max-h-[calc(100vh-112px)] w-full overflow-auto p-4 flex-col gap-4 snap-mandatory snap-y snap-page-container"
      header={{ title: '1' }}
    >
      <Table
        columns={columns}
        // rowKey={(record) => record.login.uuid}
        dataSource={productPage?.data}
        // pagination={tableParams.pagination}
        loading={productPageLoading}
        onChange={handleTableChange}
        className="custom-table"
        pagination={{
          pageSize: take,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </PageContainer>
  );
};

export default ProductManagement;

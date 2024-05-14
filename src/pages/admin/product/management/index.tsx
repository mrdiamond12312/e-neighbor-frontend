import { PageContainer } from '@ant-design/pro-components';
import { ConfigProvider, Flex, Segmented } from 'antd/lib';
import React from 'react';

import { ProductsPagination } from '@/components/ProductsPagination';
import { SearchBar } from '@/components/SearchBar';
import AdminProductsPage from '@/pages/admin/product/management/components/AdminProductsPage';
import { useAdminProductsManagement } from '@/pages/admin/product/management/hooks/useAdminProductsManagement';

const AdminProductsManagement: React.FC = () => {
  const {
    sortOptions,
    sortFieldHandler,
    sortField,
    order,
    orderHandler,
    orderOptions,
    page,
    pageHandler,
    productPage,
    productPageLoading,
    formatMessage,
    segmentedOptions,
    activeSegment,
    handleSegments,
    searchBoxHandler,
  } = useAdminProductsManagement();

  return (
    <PageContainer className="w-full p-4 rounded-lg max-w-screen-2xl flex flex-col">
      <ConfigProvider
        theme={{
          token: {
            screenXL: 1280,
            screenXLMin: 1280,
          },
        }}
      >
        <Flex className="flex-col w-full gap-2 pb-2">
          <Flex className="w-full flex-row bg-neutral-1 border gap-2 border-neutral-3 rounded-lg p-4">
            <Segmented
              options={segmentedOptions}
              size="large"
              value={activeSegment}
              onChange={handleSegments}
              className="custom-segment"
            />
            <SearchBar
              className="h-10 text-body-2-semibold"
              placeholder={formatMessage({
                id: 'common.search.placeholder',
                defaultMessage: 'Search',
              })}
              onPressEnter={searchBoxHandler}
            />
          </Flex>
          <ProductsPagination
            sortOptions={sortOptions}
            sortField={sortField}
            sortFieldHandler={sortFieldHandler}
            orderOptions={orderOptions}
            order={order}
            orderHandler={orderHandler}
            page={page}
            pageHandler={pageHandler}
            pageMeta={productPage?.meta}
            isLoading={productPageLoading}
            paginationContainerClassName="border border-neutral-3 rounded-lg"
          />
        </Flex>
        <AdminProductsPage products={productPage} isLoading={productPageLoading} />
      </ConfigProvider>
    </PageContainer>
  );
};

export default AdminProductsManagement;

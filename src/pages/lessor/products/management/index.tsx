import { PageContainer } from '@ant-design/pro-components';
import { getLocale } from '@umijs/max';
import { ConfigProvider, Flex, Table, Tabs } from 'antd/lib';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import React from 'react';

import { SearchBar } from '@/components/SearchBar';
import { useProductsTable } from '@/pages/lessor/products/management/hooks/useProductsTable';

const ProductManagement: React.FC = () => {
  const {
    columns,
    take,
    productPage,
    productPageLoading,
    handleTableChange,
    searchBoxHandler,
    tabsItem,
    defaultActiveTab,
    activeTab,
    handleTabChange,
    formatMessage,
    page,
  } = useProductsTable();

  return (
    <ConfigProvider locale={getLocale() === 'vi-VN' ? viVN : enUS}>
      <PageContainer
        className="max-h-[calc(100vh-56px)] max-w-screen-2xl w-full overflow-auto p-4 flex-col gap-4 snap-mandatory snap-y snap-page-container"
        header={{ title: '1' }}
      >
        <Flex className="flex-col gap-4 bg-neutral-1 p-4 w-full rounded-lg border border-neutral-3 pt-3">
          <Flex className="flex-col md:flex-row gap-4 bg-neutral-1 w-full items-center">
            <Tabs
              items={tabsItem}
              className="custom-tabs w-full md:w-fit"
              defaultActiveKey={defaultActiveTab}
              activeKey={activeTab}
              onChange={handleTabChange}
            />
            <SearchBar
              onPressEnter={searchBoxHandler}
              className="h-10 text-body-2-semibold"
              placeholder={formatMessage({
                id: 'common.search.placeholder',
                defaultMessage: 'Search',
              })}
            />
          </Flex>

          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={productPage?.data}
            loading={productPageLoading}
            onChange={handleTableChange}
            className="custom-table w-full overflow-auto"
            pagination={{
              pageSize: take,
              showSizeChanger: true,
              showQuickJumper: true,
              total: productPage?.meta.itemCount ?? 0,
              pageSizeOptions: [5, 10, 20],
              current: page,
            }}
          />
        </Flex>
      </PageContainer>
    </ConfigProvider>
  );
};

export default ProductManagement;

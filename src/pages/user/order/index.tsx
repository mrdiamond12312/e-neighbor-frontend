import { getLocale, Outlet } from '@umijs/max';
import { ConfigProvider, Divider, Flex, Table } from 'antd/lib';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import React from 'react';

import { SearchBar } from '@/components/SearchBar';
import { useOrderTable } from '@/pages/user/order/hooks/useOrderTable';

const LessorOrders: React.FC = () => {
  const {
    formatMessage,
    columns,
    ordersPageLoading,
    searchBoxHandler,
    ordersData,
    handleTableChange,
    take,
    page,
  } = useOrderTable();
  return (
    <ConfigProvider locale={getLocale() === 'vi-VN' ? viVN : enUS}>
      <Flex className="flex-col gap-4 p-4 w-full">
        <Flex className="flex-col bg-neutral-1 p-4 w-full rounded-lg border border-neutral-3">
          <SearchBar
            onPressEnter={searchBoxHandler}
            className="h-10 text-body-2-semibold"
            placeholder={formatMessage({
              id: 'common.search.placeholder',
              defaultMessage: 'Search',
            })}
          />
          <Divider className="my-4" />
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={ordersData?.data}
            loading={ordersPageLoading}
            onChange={handleTableChange}
            className="custom-table w-full overflow-auto"
            pagination={{
              pageSize: take,
              showSizeChanger: true,
              showQuickJumper: true,
              total: ordersData?.meta.itemCount ?? 0,
              pageSizeOptions: [6, 12],
              current: page,
            }}
          />
        </Flex>
        <Outlet />
      </Flex>
    </ConfigProvider>
  );
};

export default LessorOrders;

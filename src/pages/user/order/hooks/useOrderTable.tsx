import { useIntl, useModel } from '@umijs/max';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { SorterResult } from 'antd/lib/table/interface';

import { ORDER, ORDERS_PAGE_SORTFIELDS, useOrderPagination } from '@/hooks/useOrderPagination';
import { OrderActionsMenu } from '@/pages/user/order/components/OrderActionsMenu';
import { useOrdersPage } from '@/services/orders/services';
import { getDateFormatNormal } from '@/utils/time-format';

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
}

export const useOrderTable = () => {
  const { formatMessage } = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const {
    paginationParams,
    searchBoxHandler,
    pageHandler,
    takeHandler,
    orderHandler,
    sortFieldHandler,
    take,
    page,
  } = useOrderPagination({
    initialTake: 6,
    userId: currentUser?.id,
  });

  const handleTableChange: TableProps['onChange'] = (
    pagination,
    filters,
    sorter: SorterResult<API.IOrdersDetails> | SorterResult<API.IOrdersDetails>[],
  ) => {
    pageHandler(pagination.current ?? 1);
    takeHandler(pagination.pageSize ?? 10);
    console.log(filters)
    if (!Array.isArray(sorter)) {
      orderHandler(
        sorter.order ? (sorter.order === 'ascend' ? ORDER['asc'] : ORDER['des']) : undefined,
      );
      sortFieldHandler(sorter.field as ORDERS_PAGE_SORTFIELDS);
    }
  };

  const { data, isLoading } = useOrdersPage(paginationParams);

  const columns: ColumnsType<API.IOrdersDetails> = [
    {
      title: formatMessage({
        id: 'order.management.table.col.createdAt',
        defaultMessage: 'Created At',
      }),
      dataIndex: 'createdAt',
      sorter: true,
      render: (value, record) => getDateFormatNormal(record.rentalFees[0].createdAt),
    },
    {
      title: formatMessage({
        id: 'order.management.table.col.productName',
        defaultMessage: 'Product Name',
      }),
      dataIndex: 'productName',
    },
    {
      title: formatMessage({
        id: 'order.management.table.col.shopName',
        defaultMessage: 'Shop Name',
      }),
      dataIndex: 'shopName',
    },
    {
      title: formatMessage({
        id: 'order.management.table.col.orderValue',
        defaultMessage: 'Order Value',
      }),
      dataIndex: 'orderValue',
      sorter: true,
      render: (value) => [value, '₫'].join(' '),
    },
    {
      title: formatMessage({
        id: 'order.management.table.col.deliveryAddress',
        defaultMessage: 'Delivery Address',
      }),
      dataIndex: 'deliveryAddress',
    },

    {
      title: formatMessage({
        id: 'order.management.table.col.rentalPeriod',
        defaultMessage: 'Rental Period',
      }),
      dataIndex: 'rentTime',
      render: (value, record) =>
        formatMessage(
          {
            id: 'order.management.table.col.rentalPeriod.from-to',
            defaultMessage: '{rentTime} to {returnTime}',
          },
          {
            rentTime: getDateFormatNormal(value),
            returnTime: getDateFormatNormal(record.returnTime),
          },
        ),
      sorter: true,
    },
    // {
    //   title: formatMessage({
    //     id: 'order.management.table.col.actualRentalPeriod',
    //     defaultMessage: 'Actual Rental Period',
    //   }),
    //   dataIndex: 'realRentTime',
    //   render: (value, record) => (value ? [value, record.realReturnTime].join(' -> ') : '-'),
    //   sorter: true,
    // },
    {
      title: formatMessage({
        id: 'order.management.table.col.status',
        defaultMessage: 'STATUS',
      }),
      dataIndex: 'orderStatus',
      filters: Object.keys(ORDER_STATUS).map((key) => ({
        text: formatMessage({
          id: ['order.management.table.col.status.filter.field', (ORDER_STATUS as any)[key]].join(
            '.',
          ),
        }),
        value: (ORDER_STATUS as any)[key],
      })),
      filterMultiple: false,
    },
    {
      title: formatMessage({
        id: 'order.management.table.col.actions',
        defaultMessage: 'Actions',
      }),
      render: (value, record) => <OrderActionsMenu orderId={record.id} />,
    },
  ];
  return {
    formatMessage,
    columns,
    ordersData: data,
    ordersPageLoading: isLoading,
    searchBoxHandler,
    handleTableChange,
    take,
    page,
  } as const;
};

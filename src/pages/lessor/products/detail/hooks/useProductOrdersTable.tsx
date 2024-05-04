import { useIntl, useModel, useParams } from '@umijs/max';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { SorterResult } from 'antd/lib/table/interface';

import { OrderStatus } from '@/components/OrderStatus';
import {
  ORDER,
  ORDER_STATUS,
  ORDERS_PAGE_SORTFIELDS,
  useOrderPagination,
} from '@/hooks/useOrderPagination';
import { OrderActionsMenu } from '@/pages/lessor/order/components/OrderActionsMenu';
import { useOrdersPage } from '@/services/orders/services';
import { useProductDetails } from '@/services/products/services';
import { getDateFormatNormal } from '@/utils/time-format';

export const useProductOrdersTable = () => {
  const { formatMessage } = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { productId } = useParams();
  const {
    paginationParams,
    searchBoxHandler,
    pageHandler,
    takeHandler,
    orderHandler,
    sortFieldHandler,
    orderStatusHandler,
    take,
    page,
  } = useOrderPagination({
    initialTake: 6,
    lessorId: currentUser?.lessorId,
    productId: Number(productId),
  });

  const handleTableChange: TableProps['onChange'] = (
    pagination,
    filters,
    sorter: SorterResult<API.IOrdersDetails> | SorterResult<API.IOrdersDetails>[],
  ) => {
    pageHandler(pagination.current ?? 1);
    takeHandler(pagination.pageSize ?? 10);
    orderStatusHandler((filters.orderStatus?.[0] as ORDER_STATUS) ?? undefined);
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
        id: 'order.management.table.col.userName',
        defaultMessage: 'User Name',
      }),
      dataIndex: 'user',
      render: (value: API.TAuthProfile) => value.fullName,
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
    {
      title: formatMessage({
        id: 'order.management.table.col.status',
        defaultMessage: 'STATUS',
      }),
      dataIndex: 'orderStatus',
      render: (value) => <OrderStatus orderStatus={value} />,
      filters: Object.keys(ORDER_STATUS).map((key) => ({
        text: formatMessage({
          id: ['order.management.table.col.status.filter.field', (ORDER_STATUS as any)[key]].join(
            '.',
          ),
          defaultMessage: (ORDER_STATUS as any)[key],
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
      render: (value, record) => (
        <OrderActionsMenu orderId={record.id} orderStatus={record.orderStatus} />
      ),
    },
  ];

  const {
    data: productDetail,
    isLoading: isRetrievingProduct,
    isError: isRetrievingProductError,
  } = useProductDetails(productId);
  const isOwnedByLessor = productDetail?.lessor.id === currentUser?.lessorId;

  return {
    formatMessage,
    columns,
    ordersData: data,
    ordersPageLoading: isLoading,
    searchBoxHandler,
    handleTableChange,
    take,
    page,
    productId,
    isRetrievingProductError,
    isRetrievingProduct,
    isOwnedByLessor,
  } as const;
};

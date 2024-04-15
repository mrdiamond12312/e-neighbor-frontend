import { FormattedHTMLMessage, useIntl, useModel } from '@umijs/max';
import { Rate } from 'antd';
import { Image } from 'antd/lib';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { SorterResult } from 'antd/lib/table/interface';

import { ORDER, PRODUCT_PAGE_SORTFIELDS, usePagination } from '@/hooks/usePagination';
import { CategoryFilter } from '@/pages/lessor/products/management/components/CategoryFilter';
import { StatusTag } from '@/pages/lessor/products/management/components/StatusTag';
import { useProductPage } from '@/services/products/services';

export const useProductsTable = () => {
  const { formatMessage } = useIntl();
  const columns: ColumnsType<API.IProductCard> = [
    {
      title: '',
      dataIndex: 'image',
      render: (image) => (
        <Image
          src={image}
          rootClassName="items-center antd-image-nomask"
          className="!w-24 !h-16 object-cover"
        />
      ),
    },
    {
      title: formatMessage({
        id: 'lessor.product.management.table.col.productName',
        defaultMessage: 'Product Name',
      }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({
        id: 'lessor.product.management.table.col.category',
        defaultMessage: 'Category',
      }),
      dataIndex: 'category',
      filterDropdown: ({ confirm, setSelectedKeys, clearFilters, selectedKeys }) => {
        return (
          <CategoryFilter
            setSelectedKeys={setSelectedKeys}
            clearFilters={clearFilters}
            selectedKeys={selectedKeys}
            confirm={confirm}
          />
        );
      },
      render: (value: API.ICategory) => <FormattedHTMLMessage id={value.name} />,
    },
    {
      title: formatMessage({
        id: 'lessor.product.management.table.col.rating',
        defaultMessage: 'Rating',
      }),
      dataIndex: 'rating',
      render: (value: number) => <Rate value={value} disabled />,
      sorter: true,
    },
    {
      title: formatMessage({
        id: 'lessor.product.management.table.col.accessCount',
        defaultMessage: 'Views',
      }),
      dataIndex: 'accessCount',
      sorter: true,
    },
    {
      title: formatMessage({
        id: 'lessor.product.management.table.col.orders',
        defaultMessage: 'Finished Order',
      }),
      dataIndex: 'completedOrder',
      sorter: true,
    },

    {
      title: formatMessage({
        id: 'lessor.product.management.table.col.price',
        defaultMessage: 'Rental Price',
      }),
      dataIndex: 'price',
      sorter: true,
      render: (value: number, record: API.IProductCard) => (
        <p>
          {value} {formatMessage({ id: record.timeUnit, defaultMessage: record.timeUnit })}
        </p>
      ),
    },

    {
      title: formatMessage({
        id: 'lessor.product.management.table.col.value',
        defaultMessage: 'Value',
      }),
      dataIndex: 'value',
      render: (value: number) => <p>{value} ₫</p>,
    },

    {
      title: formatMessage({
        id: 'lessor.product.management.table.col.status',
        defaultMessage: 'Status',
      }),
      dataIndex: 'status',
      sorter: true,
      render: (value: string) => <StatusTag status={value} />,
    },
  ];

  const { initialState } = useModel('@@initialState');
  const {
    pageHandler,
    takeHandler,
    categoryIdHandler,
    paginationParams,
    sortFieldHandler,
    orderHandler,
    keyword,
    searchBoxHandler,
    take,
    isConfirmedByAdmin,
    setIsConfirmedByAdmin,
  } = usePagination({
    initialTake: 5,
    initialPage: 1,
    initialOffset: 0,
    lessorId: initialState?.currentUser?.lessorId ?? undefined,
    initialAdminApproved: false,
  });

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
  };

  const tabsItem = [
    {
      key: 'lessor.products.management.is.not.approved',
      label: (
        <div onClick={() => setIsConfirmedByAdmin(false)} className="cursor-pointer">
          <FormattedHTMLMessage
            id="lessor.products.management.is.not.approved"
            defaultMessage="Waiting for Approval"
          />
        </div>
      ),
    },
    {
      key: 'lessor.products.management.is.approved',
      label: (
        <div onClick={() => setIsConfirmedByAdmin(true)} className="cursor-pointer">
          <FormattedHTMLMessage
            id="lessor.products.management.is.approved"
            defaultMessage="Approved"
          />
        </div>
      ),
    },
    {
      key: 'lessor.products.management.is.rejected',
      label: (
        <div className="cursor-pointer">
          <FormattedHTMLMessage
            id="lessor.products.management.is.rejected"
            defaultMessage="Rejected"
          />
        </div>
      ),
    },
  ];

  const defaultActiveTab = isConfirmedByAdmin
    ? 'lessor.products.management.is.not.approved'
    : 'lessor.products.management.is.not.approved';

  return {
    columns,
    take,
    productPage,
    productPageLoading,
    handleTableChange,
    keyword,
    searchBoxHandler,
    tabsItem,
    formatMessage,
    defaultActiveTab,
  } as const;
};

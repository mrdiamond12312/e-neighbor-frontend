import { Star } from '@phosphor-icons/react';
import { FormattedHTMLMessage, useIntl, useModel, useSearchParams } from '@umijs/max';
import { Flex, Image, Typography } from 'antd/lib';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { SorterResult } from 'antd/lib/table/interface';

import { ProductStatus } from '@/components/ProductStatus';
import { AVAILABILITY, ORDER, PRODUCT_PAGE_SORTFIELDS, usePagination } from '@/hooks/usePagination';
import { CategoryFilter } from '@/pages/lessor/products/management/components/CategoryFilter';
import { ProductActionsMenu } from '@/pages/lessor/products/management/components/ProductActionsMenu';
import {
  PRODUCT_TYPE_SEARCHPARAM,
  PRODUCT_TYPE_TAB_LOCALE,
} from '@/pages/lessor/products/management/helpers/productTypeTabs';
import { useProductPage } from '@/services/products/services';

export const useProductsTable = () => {
  const { formatMessage } = useIntl();

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
    page,
    isConfirmedByAdmin,
  } = usePagination({
    initialTake: 5,
    initialPage: 1,
    initialOffset: 0,
    lessorId: initialState?.currentUser?.lessorId ?? undefined,
    initialAdminApproved: false,
  });

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

  const [searchParams, setEditMode] = useSearchParams();
  const productType = searchParams.get('productType');
  const activeTab = PRODUCT_TYPE_SEARCHPARAM.hasOwnProperty(productType ?? '')
    ? PRODUCT_TYPE_SEARCHPARAM[productType as keyof typeof PRODUCT_TYPE_SEARCHPARAM]
    : PRODUCT_TYPE_TAB_LOCALE.isNotApproved;

  const handleTabChange = (tab: string) => {
    setEditMode(
      new URLSearchParams({
        productType:
          Object.keys(PRODUCT_TYPE_TAB_LOCALE).find(
            (key) => PRODUCT_TYPE_TAB_LOCALE[key as keyof typeof PRODUCT_TYPE_TAB_LOCALE] === tab,
          ) ?? '',
      }),
    );
  };
  const tabsItem = [
    {
      key: PRODUCT_TYPE_TAB_LOCALE.isNotApproved,
      label: (
        <div className="cursor-pointer">
          <FormattedHTMLMessage
            id={PRODUCT_TYPE_TAB_LOCALE.isNotApproved}
            defaultMessage="Waiting for Approval"
          />
        </div>
      ),
    },
    {
      key: PRODUCT_TYPE_TAB_LOCALE.isApproved,
      label: (
        <div className="cursor-pointer">
          <FormattedHTMLMessage id={PRODUCT_TYPE_TAB_LOCALE.isApproved} defaultMessage="Approved" />
        </div>
      ),
    },
    {
      key: PRODUCT_TYPE_TAB_LOCALE.isRejected,
      label: (
        <div className="">
          <FormattedHTMLMessage id={PRODUCT_TYPE_TAB_LOCALE.isRejected} defaultMessage="Rejected" />
        </div>
      ),
      disabled: true,
    },
  ];

  const defaultActiveTab = isConfirmedByAdmin
    ? 'lessor.products.management.is.not.approved'
    : 'lessor.products.management.is.not.approved';

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
      render: (value: number) => (
        <Flex className="flex-row flex-shrink-0 gap-1 items-center">
          <Typography className="font-sans text-body-2-regular">{value ?? 0}</Typography>
          <Star className="text-body-1-regular fill-yellow-300" weight="fill" />
        </Flex>
      ),
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
      render: (value: AVAILABILITY) => <ProductStatus productStatus={value} />,
    },

    {
      title: formatMessage({
        id: 'common.table.col.actions',
        defaultMessage: 'Actions',
      }),
      render: (value, record) => (
        <ProductActionsMenu
          productId={record.id}
          isAdminApproved={isConfirmedByAdmin}
          productStatus={record.status as AVAILABILITY}
        />
      ),
    },
  ];

  const { data: productPage, isLoading: productPageLoading } = useProductPage({
    ...paginationParams,
    isConfirmedByAdmin: productType === 'isApproved',
  });

  return {
    columns,
    take,
    page,
    productPage,
    productPageLoading,
    handleTableChange,
    keyword,
    searchBoxHandler,
    tabsItem,
    formatMessage,
    defaultActiveTab,
    activeTab,
    handleTabChange,
  } as const;
};

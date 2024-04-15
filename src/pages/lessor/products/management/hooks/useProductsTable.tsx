import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Rate } from 'antd';
import { Image } from 'antd/lib';
import { ColumnsType } from 'antd/lib/table';

import { CategoryFilter } from '@/pages/lessor/products/management/components/CategoryFilter';
import { StatusTag } from '@/pages/lessor/products/management/components/StatusTag';

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
      filterOnClose: true,
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

  return { columns } as const;
};

import { useIntl } from '@umijs/max';
import { SelectProps } from 'antd/lib';
import { useState } from 'react';

import { STORE_FILTER } from '@/const/store.filter';
import { usePriceFilter } from '@/hooks/usePriceFilter';

export enum PRODUCT_PAGE_SORTFIELDS {
  accessCount = 'accessCount',
  price = 'price',
  createdAt = 'createdAt',
}

export enum ORDER {
  asc = 'ASC',
  des = 'DESC',
}

export enum ORDER_STATUS {
  pending = 'PENDING',
  approved = 'APPROVED',
  inProgress = 'IN PROGRESS',
  completed = 'COMPLETED',
  canceled = 'CANCELED',
  rejected = 'REJECTED',
}

export type TUseOrderPaginationParams = {
  lessorId?: number;
  userId?: number;
  productId?: number;
  initialPage?: number;
  initialTake?: number;
  initialOffset?: number;
};

export const useOrderPagination = (initialData?: TUseOrderPaginationParams) => {
  const { formatMessage } = useIntl();

  /* Sorter */
  const [sortField, setSortField] = useState<PRODUCT_PAGE_SORTFIELDS>(
    PRODUCT_PAGE_SORTFIELDS.createdAt,
  );

  const sortOptions: SelectProps['options'] = (
    Object.keys(PRODUCT_PAGE_SORTFIELDS) as Array<keyof typeof PRODUCT_PAGE_SORTFIELDS>
  ).map((key) => ({
    label: formatMessage({ id: ['common.sort.options', key].join('.'), defaultMessage: key }),
    value: PRODUCT_PAGE_SORTFIELDS[key],
  }));

  const [order, setOrder] = useState<ORDER | undefined>(ORDER.des);
  const orderOptions: SelectProps['options'] = (
    Object.keys(ORDER) as Array<keyof typeof ORDER>
  ).map((key) => ({
    label: formatMessage({ id: ['common.order.options', key].join('.'), defaultMessage: key }),
    value: ORDER[key],
  }));

  const sortFieldHandler = (value: PRODUCT_PAGE_SORTFIELDS) => setSortField(value);
  const orderHandler = (value?: ORDER) => setOrder(value);

  /* Pagination */
  const [page, setPage] = useState<number>(initialData?.initialPage ?? 1);
  const [take, setTake] = useState<number>(initialData?.initialTake ?? 5);

  const takeHandler = (take: number) => setTake(take);
  const pageHandler = (page: number) => setPage(page);

  /* Search  */
  const [productName, setProductName] = useState<string>();
  const searchBoxHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const currentSearchValue = event.currentTarget.value;
    setProductName(currentSearchValue);
    return;
  };

  /* Filter */
  const [orderStatus, setOrderStatus] = useState<ORDER_STATUS | undefined>();
  const orderStatusHandler = (status: ORDER_STATUS | undefined) => {
    setOrderStatus(status);
  };

  const paymentStatus = 'COMPLETE';

  const { control, watch } = usePriceFilter();

  /* Query Params */
  const paginationParams: any = {
    sortField,
    page,
    order,
    take,

    lessorId: initialData?.lessorId ?? undefined,
    userId: initialData?.userId ?? undefined,
    productId: initialData?.productId,

    productName,
    orderStatus,
    paymentStatus,
    minValue: isNaN(Number(watch(STORE_FILTER.min)))
      ? undefined
      : watch(STORE_FILTER.min) === ''
      ? undefined
      : Number(watch(STORE_FILTER.min)),
    maxValue: isNaN(Number(watch(STORE_FILTER.max)))
      ? undefined
      : watch(STORE_FILTER.max) === ''
      ? undefined
      : Number(watch(STORE_FILTER.max)),
    offset: 0,
  };

  return {
    sortField,
    sortFieldHandler,
    sortOptions,
    order,
    orderOptions,
    orderHandler,

    page,
    pageHandler,
    take,
    takeHandler,

    productName,
    searchBoxHandler,

    orderStatus,
    orderStatusHandler,

    paymentStatus,
    control,
    watch,

    paginationParams,
  } as const;
};

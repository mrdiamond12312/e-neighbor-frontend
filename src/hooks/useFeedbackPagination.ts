import { useIntl } from '@umijs/max';
import { SelectProps } from 'antd/lib';
import { useState } from 'react';

export enum FEEDBACK_PAGE_SORTFIELDS {
  createdAt = 'createdAt',
  star = 'star',
}

export enum ORDER {
  asc = 'ASC',
  des = 'DESC',
}

export type TUseFeedbackPaginationParams = {
  productId: number;
  initialPage?: number;
  initialTake?: number;
  initialOffset?: number;
};

export const useFeedbackPagination = (initialData: TUseFeedbackPaginationParams) => {
  const { formatMessage } = useIntl();
  /* Sorter */
  const [sortField, setSortField] = useState<FEEDBACK_PAGE_SORTFIELDS>(
    FEEDBACK_PAGE_SORTFIELDS.createdAt,
  );

  const sortOptions: SelectProps['options'] = (
    Object.keys(FEEDBACK_PAGE_SORTFIELDS) as Array<keyof typeof FEEDBACK_PAGE_SORTFIELDS>
  ).map((key) => ({
    label: formatMessage({ id: ['common.sort.options', key].join('.'), defaultMessage: key }),
    value: FEEDBACK_PAGE_SORTFIELDS[key],
  }));

  const sortFieldHandler = (value: FEEDBACK_PAGE_SORTFIELDS) => setSortField(value);

  /* Sorter Direction */
  const [order, setOrder] = useState<ORDER | undefined>(ORDER.des);
  const orderOptions: SelectProps['options'] = (
    Object.keys(ORDER) as Array<keyof typeof ORDER>
  ).map((key) => ({
    label: formatMessage({ id: ['common.order.options', key].join('.'), defaultMessage: key }),
    value: ORDER[key],
  }));
  const orderHandler = (value?: ORDER) => setOrder(value);

  /* Pagination */
  const [page, setPage] = useState<number>(initialData?.initialPage ?? 1);
  const [take, setTake] = useState<number>(initialData?.initialTake ?? 5);

  const takeHandler = (take: number) => setTake(take);
  const pageHandler = (page: number) => setPage(page);

  /* Star & Rating */
  const [star, setStar] = useState<number | undefined>();
  const starHandler = (star: number | undefined) => setStar(star);

  const paginationParams: API.IFeedbackPaginationParams = {
    sortField,
    order,
    page,
    take,
    productId: initialData.productId,
    maxStar: star,
    minStar: star,
  };

  return {
    sortField,
    sortOptions,
    sortFieldHandler,
    order,
    orderOptions,
    orderHandler,

    page,
    pageHandler,
    take,
    takeHandler,

    star,
    starHandler,

    paginationParams,
  } as const;
};

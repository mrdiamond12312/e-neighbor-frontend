import { LoadingOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Col, Pagination, Row, Select, SelectProps, Spin } from 'antd/lib';
import classNames from 'classnames';
import React, { Fragment } from 'react';

export interface IProductsPaginationProps {
  isLoading?: boolean;
  sortOptions: SelectProps['options'];
  sortField?: string;
  sortFieldHandler: (value: any) => void;

  orderOptions: SelectProps['options'];
  order?: string;
  orderHandler: (value: any) => void;

  page: number;
  pageHandler: (value: any) => void;
  pageMeta?: IPaginationMeta;
  onlyPagination?: boolean;
  children?: React.ReactNode;
  containerClassName?: string;
  paginationContainerClassName?: string;
}

export const ProductsPagination: React.FC<IProductsPaginationProps> = ({
  isLoading = false,
  sortOptions,
  sortField,
  sortFieldHandler,
  order,
  orderHandler,
  orderOptions,
  page,
  pageHandler,
  pageMeta,
  onlyPagination = false,
  containerClassName,
  paginationContainerClassName,
  children,
}) => {
  const sorterClassname = classNames('flex flex-col gap-2 py-2', {
    hidden: onlyPagination,
  });

  const combinedContainerClassName = classNames('w-full pt-2', containerClassName);
  const combinedPaginationContainerClassName = classNames(
    'items-center bg-neutral-1 px-2 py-2 border-neutral-3 border',
    paginationContainerClassName,
  );
  return (
    <div className="overflow-clip w-full">
      <section>
        <Row
          className={combinedPaginationContainerClassName}
          gutter={12}
          style={{ marginLeft: 0, marginRight: 0 }}
        >
          <Col span={12} md={4} className={sorterClassname}>
            <p className="text-body-2-semibold">
              <FormattedHTMLMessage id="common.pagination.arrange.by" defaultMessage="Arrange By" />
            </p>
            <Select
              value={sortField}
              onChange={(value) => sortFieldHandler(value)}
              className="custom-cascader-select w-full custom-select-border-shadow"
              options={sortOptions}
              popupClassName="custom-select-panel"
            />
          </Col>

          <Col span={12} md={4} className={sorterClassname}>
            <p className="text-body-2-semibold">
              <FormattedHTMLMessage id="common.pagination.order" defaultMessage="Order" />
            </p>
            <Select
              value={order}
              onChange={(value) => orderHandler(value)}
              className="custom-cascader-select w-full custom-select-border-shadow"
              options={orderOptions}
              popupClassName="custom-select-panel"
            />
          </Col>

          <Col span={24} md={16} className="flex flex-col justify-end items-center gap-2 py-2">
            {isLoading ? (
              <Spin
                className="text-teal-5"
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              <Fragment>
                <p className="text-body-2-semibold">
                  <FormattedHTMLMessage id="common.pagination.page" defaultMessage="Page" />
                </p>
                <Pagination
                  className="custom-pagination"
                  showSizeChanger={false}
                  showQuickJumper
                  current={page}
                  onChange={(page) => pageHandler(page)}
                  pageSize={pageMeta?.take}
                  total={pageMeta?.itemCount ?? 0}
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </section>
      {children && <section className={combinedContainerClassName}>{children}</section>}
    </div>
  );
};

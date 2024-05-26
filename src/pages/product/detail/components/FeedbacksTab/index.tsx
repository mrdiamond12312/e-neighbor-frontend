import { FormattedHTMLMessage, useParams } from '@umijs/max';
import { Divider, Flex, Spin } from 'antd/lib';
import { useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import FeedbackCard from '@/components/FeedbackCard';
import { useFeedbackPagination } from '@/hooks/useFeedbackPagination';
import { OverallRating } from '@/pages/product/detail/components/OverallRating';
import { useFeedbacksInfiniteLoad } from '@/services/feedbacks/services';

export type TFeedbackTabProps = {
  productData?: API.IProductDetails;
};

export const FeedbacksTab: React.FC<TFeedbackTabProps> = ({ productData }) => {
  const { productId } = useParams();
  const { paginationParams } = useFeedbackPagination({ productId: Number(productId) });
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFeedbacksInfiniteLoad(paginationParams);

  const loaderRef = useRef(null);
  const isInView = useInView(loaderRef);

  useEffect(() => {
    if (isInView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, isFetchingNextPage]);
  return (
    <Flex className="flex-col p-4 max-h-[calc(100vh-168px)] overflow-auto">
      <OverallRating
        avgRating={productData?.averageStar ?? 0}
        accData={data?.pages[0].extra.statistic}
      />
      {data?.pages.map((page) =>
        page.data.map((feedback) => (
          <Flex className="flex-col" key={feedback.id}>
            <Divider className="my-4" />
            <Flex className="px-4">
              <FeedbackCard {...feedback} />
            </Flex>
          </Flex>
        )),
      )}
      <Flex ref={loaderRef}>
        <Divider className="my-4 font-sans text-body-2-semibold text-teal-4">
          {isFetchingNextPage ? (
            <Flex className="flex-row gap-2 font-sans">
              <Spin />
              <FormattedHTMLMessage
                id="product.details.feedback.loader.loading"
                defaultMessage="Loading Feedbacks!"
              />
            </Flex>
          ) : (
            !hasNextPage && (
              <FormattedHTMLMessage
                id="product.details.feedback.loader.end"
                defaultMessage="End of Feedbacks!"
              />
            )
          )}
        </Divider>
      </Flex>
    </Flex>
  );
};

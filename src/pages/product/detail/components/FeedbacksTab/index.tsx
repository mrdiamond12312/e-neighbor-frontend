import { useParams } from '@umijs/max';
import { Flex } from 'antd/lib';
import React from 'react';

import FeedbackCard from '@/components/FeedbackCard';
import { useFeedbackPagination } from '@/hooks/useFeedbackPagination';
import { useFeedbacksInfiniteLoad } from '@/services/feedbacks/services';

export const FeedbacksTab: React.FC = () => {
  const { productId } = useParams();
  const { paginationParams } = useFeedbackPagination({ productId: Number(productId) });
  const { data } = useFeedbacksInfiniteLoad(paginationParams);

  return (
    <Flex className="flex-col gap-2 p-4 max-h-[calc(100vh-168px)] xl:max-h-[calc(100vh-224px)] overflow-auto">
      {data?.pages.map((page) =>
        page.data.map((feedback) => <FeedbackCard key={feedback.id} {...feedback} />),
      )}
    </Flex>
  );
};

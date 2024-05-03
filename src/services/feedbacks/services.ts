import { useInfiniteQuery, useMutation, useQueryClient } from '@umijs/max';

import { TFeedbackFormFields } from '@/pages/user/order-details/feedback/hooks/useFeedback';
import API_ENDPOINTS from '@/services/feedbacks/api-path';
import { getFeedbacks, postFeedback } from '@/services/feedbacks/api-services';

export const useGiveFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation<any, TMeta, TFeedbackFormFields>(
    [API_ENDPOINTS.FEEDBACKS],
    (feedbackBody: TFeedbackFormFields) => postFeedback(feedbackBody),
    {
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.FEEDBACKS],
        }),
    },
  );
};

export const useFeedbacksInfiniteLoad = (
  feedbacksPaginationParams: API.IFeedbackPaginationParams,
) => {
  return useInfiniteQuery({
    queryKey: [API_ENDPOINTS.FEEDBACKS, feedbacksPaginationParams],
    queryFn: ({ pageParam = 1 }) => getFeedbacks({ ...feedbacksPaginationParams, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const { hasNextPage } = lastPage.meta;
      return hasNextPage ? allPages.length + 1 : undefined;
    },
  });
};

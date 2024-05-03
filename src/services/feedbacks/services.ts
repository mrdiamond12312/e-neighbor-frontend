import { useMutation, useQueryClient } from '@umijs/max';

import { TFeedbackFormFields } from '@/pages/user/order-details/feedback/hooks/useFeedback';
import API_ENDPOINTS from '@/services/feedbacks/api-path';
import { postFeedback } from '@/services/feedbacks/api-services';

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

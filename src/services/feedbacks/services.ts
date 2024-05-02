import { useMutation } from '@umijs/max';

import { TFeedbackFormFields } from '@/pages/user/order-details/feedback/hooks/useFeedback';
import API_ENDPOINTS from '@/services/feedbacks/api-path';
import { postFeedback } from '@/services/feedbacks/api-services';

export const useGiveFeedback = () => {
  return useMutation<any, TMeta, TFeedbackFormFields>(
    [API_ENDPOINTS.FEEDBACKS],
    (feedbackBody: TFeedbackFormFields) => postFeedback(feedbackBody),
  );
};

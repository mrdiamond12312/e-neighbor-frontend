import {
  FEEDBACK_FORM_KEY,
  TFeedbackFormFields,
} from '@/pages/user/order-details/feedback/hooks/useFeedback';
import API_ENDPOINTS from '@/services/feedbacks/api-path';
import request from '@/services/interceptor';

export const postFeedback = (feedbackBody: TFeedbackFormFields) =>
  request(API_ENDPOINTS.FEEDBACKS, {
    timeout: 15000,
    method: 'POST',
    data: {
      ...feedbackBody,
      [FEEDBACK_FORM_KEY.image]: feedbackBody[FEEDBACK_FORM_KEY.image]?.map(
        (image) => image.response.url,
      )[0],
    },
  });

export const getFeedbacks = (feedbackParams: API.IFeedbackPaginationParams) =>
  request<IPaginationResponse<API.IFeedback>>(API_ENDPOINTS.FEEDBACKS, {
    timeout: 15000,
    params: feedbackParams,
  });

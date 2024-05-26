import { useIntl, useModel } from '@umijs/max';
import { useState } from 'react';

import {
  useFeedbackStatistic,
  useOverallStatistic,
  useRevenueStatistic,
} from '@/services/lessor/services';

export const useLessorStatistic = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { formatMessage } = useIntl();

  const [revenueDayRange, setRevenueDayRange] = useState<number>(7);

  const { data: revenueStatisticData, isLoading: revenueStatisticLoading } = useRevenueStatistic({
    dayRange: revenueDayRange,
    lessorId: currentUser?.lessorId,
  });

  const [feedbackDayRange, setFeedbackDayRange] = useState<number>(7);

  const { data: feedbackStatisticData, isLoading: feedbackStatisticLoading } = useFeedbackStatistic(
    {
      dayRange: feedbackDayRange,
      lessorId: currentUser?.lessorId,
    },
  );

  const { data: overallStatistic, isLoading: isLoadingOverallData } = useOverallStatistic();

  return {
    revenueDayRange,
    revenueStatisticData,
    revenueStatisticLoading,
    setRevenueDayRange,

    feedbackDayRange,
    setFeedbackDayRange,
    feedbackStatisticData,
    feedbackStatisticLoading,

    overallStatistic,
    isLoadingOverallData,

    formatMessage,
  } as const;
};

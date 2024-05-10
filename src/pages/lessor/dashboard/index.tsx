import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import Loading from '@/loading';
import { FeedbackStatistic } from '@/pages/lessor/dashboard/components/FeedbackStatistic';
import { OverallStatistic } from '@/pages/lessor/dashboard/components/OverallStatistic';
import { RevenueStatistic } from '@/pages/lessor/dashboard/components/RevenueStatistic';
import { useLessorStatistic } from '@/pages/lessor/dashboard/hooks/useLessorStatistic';

const LessorDashboard: React.FC = () => {
  const {
    revenueStatisticData,
    revenueDayRange,
    revenueStatisticLoading,
    setRevenueDayRange,

    feedbackStatisticData,
    feedbackDayRange,
    feedbackStatisticLoading,
    setFeedbackDayRange,

    overallStatistic,
    isLoadingOverallData,

    formatMessage,
  } = useLessorStatistic();

  if (revenueStatisticLoading && feedbackStatisticLoading)
    return (
      <Loading
        extra={formatMessage({
          id: 'lessor.dashboard.loading',
          defaultMessage: 'Calculating Statistics...',
        })}
      />
    );

  return (
    <PageContainer className="w-full max-w-7xl p-4 rounded-lg flex flex-col">
      <FadeIn direction="center" index={0 * 5} className="w-full">
        <OverallStatistic data={overallStatistic} isLoading={isLoadingOverallData} />
      </FadeIn>
      <FadeIn direction="center" index={1 * 5}>
        <RevenueStatistic
          data={revenueStatisticData}
          isLoading={revenueStatisticLoading}
          dayRange={revenueDayRange}
          setDayRange={setRevenueDayRange}
        />
      </FadeIn>
      <FadeIn direction="center" index={2 * 5}>
        <FeedbackStatistic
          data={feedbackStatisticData}
          isLoading={feedbackStatisticLoading}
          dayRange={feedbackDayRange}
          setDayRange={setFeedbackDayRange}
        />
      </FadeIn>
    </PageContainer>
  );
};

export default LessorDashboard;

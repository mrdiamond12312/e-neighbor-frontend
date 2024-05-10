declare namespace API {
  type TUploadFileMutationParam = {
    file: string | Blob | RcFile;
    onProgress?: ((event: UploadProgressEvent) => void) | undefined;
  };

  type TUploadResponse = {
    fileId: string;
    name: string;
    size: number;
    versionInfo: {
      id: string;
      name: string;
    };
    filePath: string;
    url: string;
    fileType: string;
    height: number;
    width: number;
    thumbnailUrl: string;
    AITags: string;
  };

  type TFeedbackStatisticData = {
    averageStar: number;
    totalFeedback: number;
    time: string;
  };
  type TFeedbackStatistic = {
    chartData: TFeedbackStatisticData[];
    totalFeedback: number;
    averageStar: number;
    feedbackByRating: {
      rating: number;
      numberOfFeedback: number;
    }[];
  };

  type TRevenueStatisticData = {
    revenue: number;
    time: string;
  };
  type TRevenueStatistic = {
    chartData: TRevenueStatisticData[];
    totalRevenue: number;
  };

  type TStatisticParams = {
    lessorId?: number;
    dayRange: number;
    productId?: number;
  };

  type TOverallStatistic = {
    orderByStatus: {
      orderStatus: API.ORDER_STATUS;
      numberOfOrder: number;
    }[];
    numberOfProductByCategory: {
      numberOfProduct: number;
      isVehicle: boolean;
    }[];
    totalAccessCount: number;
  };
}

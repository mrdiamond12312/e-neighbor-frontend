declare namespace API {
  interface IFeedbackPaginationParams {
    sortField?: 'createdAt' | 'star';
    order?: 'ASC' | 'DESC';
    page?: number;
    take?: number;
    productId: number;
    offset?: number;
    maxStar?: number;
    minStar?: number;
  }
  interface IFeedbackUser {
    fullName: string;
    avatar: string;
  }
  interface IFeedback {
    id: number;
    content: string;
    image: string;
    star: number;
    orderId: number;
    productId: number;
    createdAt: string;
    user: IFeedbackUser;
  }
}

declare namespace API {
  interface IOrdersPaginationParams {
    sortField?: string;
    order?: string;
    page?: number;
    take?: number;
    userId?: number;
    lessorId?: number;
    productId?: number;
    productName?: string;
    orderStatus?: string;
    paymentStatus?: string;
    maxValue?: number;
    minValue?: number;
    offset?: number;
  }

  interface IRentalFees {
    id: number;
    createdAt: string;
    updateAt: string;
    name: string; // Locale
    description: string;
    amount: number;
  }

  enum PAYMENT_STATUS {
    COMPLETE = 'COMPLETE',
    INCOMPLETE = 'INCOMPLETE',
  }

  enum ORDER_STATUS {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    IN_PROGRESS = 'IN PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    REJECTED = 'REJECTED',
  }

  interface IOrdersDetails {
    id: number;
    productId: number;
    productName: string;
    lessorId: number;
    shopName: string;
    rentTime: string;
    returnTime: string;
    realRentTime: string | null;
    realReturnTime: string | null;
    imagesUponReceipt: string | null;
    deliveryAddress: string;
    orderValue: number;
    orderStatus: ORDER_STATUS;
    paymentStatus: PAYMENT_STATUS;
    rentPrice: number;
    timeUnit: string;
    rejectReason: string | null;
    rentalFees: IRentalFees[];
    // payment?: string
    user: API.TAuthProfile;
  }

  interface IOrdersAllDetails {
    id: number;
    createdAt: string; // Use ISOString for dates
    updatedAt: string; // Use ISOString for dates
    rentTime: string; // Use ISOString for dates
    returnTime: string; // Use ISOString for dates
    realRentTime: string; // Use ISOString for dates
    realReturnTime: string; // Use ISOString for dates
    conditionUponReceipt: string;
    imagesUponReceipt: string[];
    conditionUponReturn: string;
    imagesUponReturn: string[];
    deliveryAddress: string;
    orderValue: number;
    orderStatus: ORDER_STATUS;
    paymentStatus: PAYMENT_STATUS;
    rentPrice: number;
    timeUnit: string;
    rejectReason: string;
    product: API.IProductDetails;
    feedback: any; // Modify this if you have a specific feedback interface
    rentalFees: IRentalFees[];
    // Modify this if you have a specific payment interface
    paymentAmount: number;
    user: API.TAuthProfile;
  }
}

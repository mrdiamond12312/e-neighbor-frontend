declare namespace TEST {
  interface IDBSanitize {
    productName?: string;
    lessorShopName?: string;
    userName?: string;
  }
  interface IRegisterInfo {
    userName?: string;
    fullName?: string;
    password?: string;
    passwordConfirm?: string;
    email?: string;
    willNavigate: boolean;
  }

  interface IProfileInfo extends IRegisterInfo {
    dob?: string;
    address?: string;
    phoneNumber?: string;
    citizenId?: string;
    citizenCardBack?: string;
    citizenCardFront?: string;
    avatar?: string;
    fullName?: string;
  }
  interface IProfileInfo extends IRegisterInfo {
    dob?: string;
    address?: string;
    phoneNumber?: string;
    citizenId?: string;
    citizenCardBack?: string;
    citizenCardFront?: string;
    avatar?: string;
    fullName?: string;
  }

  interface ILessorInfo extends IProfileInfo {
    shopName?: string;
    warehouseAddress?: string;
    location?: string;
    shopDescription?: string;
  }

  interface IProduct {
    name?: string;
    images?: string[];
    description?: string;
    price?: string;
    timeUnit?: '₫ / day' | '₫ / week' | '₫ / month';

    category?: 'Furnitures' | 'Vehicles';
    subCategory?: string;
    brand?: string;
    size?: string;
    weight?: string;
    quantity?: string;

    value?: string;
    mortgage?: 'Motorcycle mortgage' | 'No mortgage required';
    reqDocs?:
      | 'No documents required'
      | "Compare driver's license & keep passport"
      | "Compare citizen ID card and driver's license";

    haveInsurance?: boolean;
    insuranceHolder?: string;
    insurancePhoto?: string;
    insuranceDesc?: string;
    insuranceIssuedDate?: string;
    insuranceExpDate?: string;
  }

  interface IProductApproval {
    approval: 'Approved' | 'Rejected';
    rejectReason?: string;
  }

  interface IRentalPaymentInfo {
    deliveryAddress: string;
    startDate: string;
    endDate: string;

    cardNumber: '9704198526191432198';
    cardHolder: 'NGUYEN VAN A';
    issueDate: '07/15';
    otp: '123456';
  }

  interface IDeliveryPayload {
    findString: string;
    punctuation?: 'On time' | 'Late';
    condition?: string;
    evidence?: string;
  }
  interface IFeedbackPayload {
    findString: string;
    rating?: number;
    comment?: string;
    image?: string;
  }
}

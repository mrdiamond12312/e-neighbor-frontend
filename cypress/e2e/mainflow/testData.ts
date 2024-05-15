import dayjs from 'dayjs';

export const lessorInfo: TEST.ILessorInfo = {
  willNavigate: true,
  email: 'testMainFlowLessor@123.com',
  fullName: 'Testing Main Flow Lessor',
  password: '12345678',
  passwordConfirm: '12345678',
  userName: 'testUserMainFlowLessor',
  dob: '2002-12-24',
  address: 'Address',
  phoneNumber: '123444544',
  citizenId: '035229769266',
  avatar: './cypress/support/images/avatar.jpg',
  citizenCardBack: './cypress/support/images/citizenCardBack.png',
  citizenCardFront: './cypress/support/images/citizenCardFront.jpg',

  location: 'Ho Chi Minh City',
  shopDescription: 'A Main Flow Testing Lessor Shop',
  shopName: 'Test Lessor Main Flow',
  warehouseAddress: 'Test Main Flow Address',
};

export const rentalInfo: TEST.IRentalPaymentInfo = {
  cardHolder: 'NGUYEN VAN A',
  cardNumber: '9704198526191432198',
  issueDate: '07/15',
  otp: '123456',
  deliveryAddress: 'Main Flow Test Address',
  endDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
  startDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
};

export const adminInfo: TEST.IRegisterInfo = {
  willNavigate: true,
  userName: 'admin',
  password: '12345678',
};

export const userInfo: TEST.IProfileInfo = {
  willNavigate: true,
  email: 'testMainFlowUser@123.com',
  fullName: 'Testing Main Flow User',
  password: '12345678',
  passwordConfirm: '12345678',
  userName: 'testUserMainFlowUser',
  dob: '2002-12-24',
  address: 'Address',
  phoneNumber: '123444545',
  citizenId: '035229769267',
  avatar: './cypress/support/images/avatar.jpg',
  citizenCardBack: './cypress/support/images/citizenCardBack.png',
  citizenCardFront: './cypress/support/images/citizenCardFront.jpg',
};

export const testProduct: TEST.IProduct = {
  name: 'Test Product Main Flow',
  images: ['./cypress/support/images/product-image.jpg'],
  description: 'Test Main Flow Product Descriptions',
  price: '30000',
  timeUnit: '₫ / day',

  category: 'Furnitures',
  subCategory: 'Table',
  brand: 'Test Main Flow Product Brand',
  size: 'Test Main Flow Product Size',
  weight: 'Test Main Flow Product Weight',
  quantity: 'Test Main Flow Product Quantity 0',

  value: '1200000',
  mortgage: 'Motorcycle mortgage',
  reqDocs: "Compare citizen ID card and driver's license",
  haveInsurance: true,
  insuranceHolder: 'Tester KC',
  insurancePhoto: './cypress/support/images/avatar.jpg',
  insuranceDesc: 'Main Flow Product Insurance Test',
  insuranceIssuedDate: '2023-12-24',
  insuranceExpDate: '2029-12-24',
};

export const testFeedbackInfo: TEST.IFeedbackPayload = {
  findString: lessorInfo.shopName ?? '',
  comment: 'Main Flow Test Feedback Comment',
  image: './cypress/support/images/avatar.jpg',
  rating: Math.floor(Math.random() * 5) + 1,
};

export const testReturnInfo: TEST.IDeliveryPayload = {
  findString: userInfo.fullName ?? '',
  condition: 'Main Flow Test Condition',
  evidence: './cypress/support/images/avatar.jpg',
  punctuation: 'On time',
};

export const testDeliveryInfo: TEST.IDeliveryPayload = {
  findString: lessorInfo.shopName ?? '',
  condition: 'Main Flow Test Condition',
  evidence: './cypress/support/images/avatar.jpg',
  punctuation: 'On time',
};

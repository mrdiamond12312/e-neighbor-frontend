export enum ADD_PRODUCT_FORM_KEY {
  // Basic Info
  name = 'name',
  images = 'images',
  category = 'category',
  description = 'description',

  // Detail Info
  characteristics = 'characteristics',

  // Rental Info
  value = 'value',
  policies = 'policies',
  mortgage = 'mortgage',
  requiredDocuments = 'requiredDocuments',
  price = 'price',
  timeUnit = 'timeUnit',
  surcharge = 'surcharge',
  insurance = 'insurance',
}

export enum PRODUCT_CHARACTERISTICS_KEY {
  localeId = 'localeId',
  description = 'description',
}

export enum SURCHARGE_KEY {
  surchargeId = 'surchargeId',
  price = 'price',
}

export enum MORTGAGE {
  NONE = 'product.mortgage.none',
  OPTION_1 = 'product.mortgage.motorbike.deposite',
}

export enum REQUIRED_DOCUMENTS {
  NONE = 'product.reqDocs.none',
  OPTION1 = 'product.reqDocs.need.citizenCard.with.driverLicense',
  OPTION2 = 'product.reqDocs.keep.passport',
}

export enum TIME_UNIT {
  DAY = 'product.price.time.unit.day',
  WEEK = 'product.price.time.unit.week',
  MONTH = 'product.price.time.unit.month',
}

export enum INSURANCE_KEY {
  holderName = 'name',
  description = 'description',
  images = 'images',
  issueDate = 'issueDate',
  expiryDate = 'expirationDate',
}

export type TProductCharacteristic = {
  [PRODUCT_CHARACTERISTICS_KEY.localeId]: string;
  [PRODUCT_CHARACTERISTICS_KEY.description]?: string;
};

export type TSurcharge = {
  [SURCHARGE_KEY.surchargeId]: string;
  [SURCHARGE_KEY.price]: number;
};

export type TInsurance = {
  [INSURANCE_KEY.holderName]: string;
  [INSURANCE_KEY.images]?: any[];
  [INSURANCE_KEY.description]?: string;
  [INSURANCE_KEY.issueDate]: string;
  [INSURANCE_KEY.expiryDate]: string;
};

export type TProductFormField = {
  [ADD_PRODUCT_FORM_KEY.name]: string;
  [ADD_PRODUCT_FORM_KEY.images]: any[];
  [ADD_PRODUCT_FORM_KEY.category]: number;
  [ADD_PRODUCT_FORM_KEY.description]: string;

  [ADD_PRODUCT_FORM_KEY.characteristics]?: TProductCharacteristic[];

  [ADD_PRODUCT_FORM_KEY.value]: number;
  [ADD_PRODUCT_FORM_KEY.policies]?: string[];
  [ADD_PRODUCT_FORM_KEY.mortgage]: keyof typeof MORTGAGE;
  [ADD_PRODUCT_FORM_KEY.requiredDocuments]: keyof typeof REQUIRED_DOCUMENTS;
  [ADD_PRODUCT_FORM_KEY.price]: number;
  [ADD_PRODUCT_FORM_KEY.timeUnit]: keyof typeof TIME_UNIT;
  [ADD_PRODUCT_FORM_KEY.surcharge]: TSurcharge[];
  [ADD_PRODUCT_FORM_KEY.insurance]?: TInsurance;
};

declare namespace API {
  interface IProductLessor {
    id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    lastResponse: string;
    acceptRate: string;
    rating: string;
  }

  interface IProductCharacteristic {
    localeId: string;
    description: string | number;
  }
  interface IProductDetails {
    id: number | string;
    createdAt: string;
    updatedAt: string;
    name: string;
    status: string;
    mortgage: string;
    description: string;
    category: IProductCategory;
    subCategory: string;
    value: number;
    policies: string[];
    images: string[];
    characteristics: IProductCharacteristic[];
    price: number;
    requiredDocuments: string;
    location: string;
    timeUnit: string;
    tags: string[]; // Category type can be further defined if known
    productSurcharges: string[];
    isConfirmed: boolean;
    rejectReason: string[];
    averageStar: number;
    lessor: IProductLessor; // Lessor type can be further defined if known
    insurance: object; // Insurance type can be further defined if known
  }

  interface IProductCategory {
    id: number | string;
    createdAt: string;
    updatedAt: string;
    name: string;
    isVehicle: boolean;
    characteristics: string[];
  }

  interface IProductCard {
    id: number | string;
    name: string;
    price: number;
    timeUnit: string;
    value: number | string;
    status: string;
    turnOver: number;
    rating: number;
    category: {
      name: string;
    };
    lessorId: number;
    lessorImage: string;
    image: string;
  }
}

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
    value: string | number;
  }
  interface IProductDetails {
    id: number | string;
    createdAt: string;
    updatedAt: string;
    name: string;
    status: string;
    mortgage: string;
    description: string;
    category: string;
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
    lessor: IProductLessor; // Lessor type can be further defined if known
    insurance: object; // Insurance type can be further defined if known
  }

  interface IProductPaginationParams {
    sortField?: string;
    order?: string;
    page?: number;
    take?: number;
    isConfirmedByAdmin: boolean;
    name?: string;
    categoryId?: number;
    isVehicle: boolean;
    lessorId?: number;
    status?: string;
    offset?: number;
    rating?: number;
    priceUpperBound?: number;
    priceLowerBound?: number;
    locations?: string[];
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

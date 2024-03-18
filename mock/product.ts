import { Request, Response } from 'express';

const mockCarProducts: API.IProductDetails[] = [
  {
    id: 1,
    createdAt: '2024-03-18T00:00:00.000Z',
    updatedAt: '2024-03-18T00:00:00.000Z',
    name: '2020 Toyota Camry LE',
    status: 'available',
    mortgage: 'none',
    description: 'A reliable and fuel-efficient mid-size sedan with plenty of features.',
    value: 25000,
    policies: ['no smoking', 'no pets'],
    images: ['https://example.com/car1.jpg', 'https://example.com/car1_interior.jpg'],
    characteristics: [
      { localeId: 'en', value: 'Sedan' },
      { localeId: 'en', value: 4 }, // Doors
      { localeId: 'en', value: 'Automatic' }, // Transmission
    ],
    price: 50, // Daily price
    requiredDocuments: "driver's license, insurance",
    location: 'Los Angeles, CA',
    timeUnit: 'day',
    category: ['car', 'sedan'],
    productSurcharges: ['late return fee'],
    isConfirmed: true,
    rejectReason: [],
    lessor: {
      id: 2,
      avatar: 'https://example.com/lessor1.jpg',
      firstName: 'John',
      lastName: 'Doe',
      lastResponse: '2024-03-17T10:00:00.000Z',
      acceptRate: '90%',
      rating: '4.8',
    },
    insurance: {
      // Add details about insurance coverage here
    },
  },
  {
    id: 2,
    createdAt: '2024-03-18T00:00:00.000Z',
    updatedAt: '2024-03-18T00:00:00.000Z',
    name: '2022 Ford F-150 XLT',
    status: 'available',
    mortgage: 'lien',
    description: 'A powerful and capable pickup truck for work or play.',
    value: 40000,
    policies: ['no off-roading'],
    images: ['https://example.com/truck1.jpg'],
    characteristics: [
      { localeId: 'en', value: 'Truck' },
      { localeId: 'en', value: 4 }, // Doors
      { localeId: 'en', value: 'Automatic' }, // Transmission
    ],
    price: 75, // Daily price
    requiredDocuments: "driver's license, insurance, proof of income",
    location: 'Austin, TX',
    timeUnit: 'day',
    category: ['car', 'truck'],
    productSurcharges: ['cleaning fee', 'mileage fee'],
    isConfirmed: true,
    rejectReason: [],
    lessor: {
      id: 2,
      avatar: 'https://example.com/lessor1.jpg',
      firstName: 'John',
      lastName: 'Doe',
      lastResponse: '2024-03-17T10:00:00.000Z',
      acceptRate: '90%',
      rating: '4.8',
    },
    insurance: {
      // Add details about insurance coverage here
    },
  },

  {
    id: 3,
    createdAt: '2024-03-18T00:00:00.000Z',
    updatedAt: '2024-03-18T00:00:00.000Z',
    name: '2018 Honda CR-V LX',
    status: 'available',
    mortgage: 'paid',
    description: 'A spacious and versatile SUV for families or outdoor adventures.',
    value: 20000,
    policies: ['no smoking inside'],
    images: ['[invalid URL removed]', '[invalid URL removed]'],
    characteristics: [
      { localeId: 'en', value: 'SUV' },
      { localeId: 'en', value: 5 }, // Doors
      { localeId: 'en', value: 'Automatic' }, // Transmission
    ],
    price: 40, // Daily price
    requiredDocuments: "driver's license, insurance",
    location: 'Seattle, WA',
    timeUnit: 'day',
    category: ['car', 'suv'],
    productSurcharges: [],
    isConfirmed: true,
    rejectReason: [],
    lessor: {
      id: 4,
      avatar: '[invalid URL removed]',
      firstName: 'Jane',
      lastName: 'Smith',
      lastResponse: '2024-03-17T15:00:00.000Z',
      acceptRate: '85%',
      rating: '4.7',
    },
    insurance: {
      // Add details about insurance coverage here
    },
  },
  {
    id: 4,
    createdAt: '2024-03-18T00:00:00.000Z',
    updatedAt: '2024-03-18T00:00:00.000Z',
    name: '2023 Tesla Model 3',
    status: 'available',
    mortgage: 'none',
    description:
      'A sleek and technologically advanced electric car for a luxurious driving experience.',
    value: 55000,
    policies: ['no smoking', 'supercharging fees apply'],
    images: ['[invalid URL removed]', '[invalid URL removed]'],
    characteristics: [
      { localeId: 'en', value: 'Sedan' },
      { localeId: 'car.properties.seats', value: 4 }, // Doors
      { localeId: 'en', value: 'Automatic' }, // Transmission
    ],
    price: 150, // Daily price
    requiredDocuments: "driver's license, insurance",
    location: 'San Francisco, CA',
    timeUnit: 'day',
    category: ['car', 'electric vehicle'],
    productSurcharges: [],
    isConfirmed: true,
    rejectReason: [],
    lessor: {
      id: 1, // Same lessor as product 1 for demonstration
      avatar: 'https://example.com/lessor1.jpg',
      firstName: 'John',
      lastName: 'Doe',
      lastResponse: '2024-03-17T10:00:00.000Z',
      acceptRate: '90%',
      rating: '4.8',
    },
    insurance: {
      // Add details about insurance coverage here
    },
  },
];

const productDetails = (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = mockCarProducts.find((element) => element.id === parseInt(productId));

  if (product)
    res.status(200).json({
      meta: {
        statusCode: 200,
        message: '',
        error: '',
      },
      result: { data: product },
    });
  else
    res.status(404).json({
      meta: {
        statusCode: 404,
        message: 'Not Found!',
        error: 'SYS_004',
      },
      result: { data: undefined },
    });
};

export default {
  'GET /products/:productId': productDetails,
};

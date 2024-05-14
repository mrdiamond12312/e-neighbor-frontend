describe('lessor-add-product', () => {
  const lessorInfo: TEST.ILessorInfo = {
    willNavigate: true,
    email: 'testUserLessorAddProduct@123.com',
    fullName: 'Testing Add Product',
    password: '12345678',
    passwordConfirm: '12345678',
    userName: 'testUserLessorAddProduct',
    dob: '2002-12-24',
    address: 'Address',
    phoneNumber: '123444542',
    citizenId: '035229769264',
    avatar: './cypress/support/images/avatar.jpg',
    citizenCardBack: './cypress/support/images/citizenCardBack.png',
    citizenCardFront: './cypress/support/images/citizenCardFront.jpg',

    location: 'Ho Chi Minh City',
    shopDescription: 'A Testing Lessor Shop',
    shopName: 'Test Lessor',
    warehouseAddress: 'Testing Address',
  };

  const testProduct: TEST.IProduct = {
    name: 'Test Add Product',
    images: [
      './cypress/support/images/product-image.jpg',
      './cypress/support/images/product-image-1.jpg',
    ],
    description: 'Test Product Descriptions',
    price: '30000',
    timeUnit: '₫ / day',

    category: 'Furnitures',
    subCategory: 'Table',
    brand: 'Test Brand',
    size: 'Test Size',
    weight: 'Test Weight',
    quantity: 'Test Quantity 0',

    value: '1200000',
    mortgage: 'Motorcycle mortgage',
    reqDocs: "Compare citizen ID card and driver's license",
    haveInsurance: false,
    insuranceHolder: 'Tester KC',
    insurancePhoto: './cypress/support/images/avatar.jpg',
    insuranceDesc: 'Insurance Test',
    insuranceIssuedDate: '2023-12-24',
    insuranceExpDate: '2029-12-24',
  };

  before(() => {
    cy.sanitizeDatabase({
      productName: testProduct.name,
      userName: lessorInfo.userName,
      lessorShopName: lessorInfo.shopName,
    });
    cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/auth/register').as('register');
    cy.register(lessorInfo);
    cy.waitForNetworkIdle(`@register`, 1500);
    cy.navigateToLessor(lessorInfo.fullName);

    cy.contains('Welcome to Lessor Channel').should('exist');
    cy.getButton('OK').click();

    cy.lessorFillStep1OfOnboardingForm(lessorInfo);
    cy.lessorFillStep2OfOnboardingForm(lessorInfo);
    cy.lessorFillStep3OfOnboardingForm(lessorInfo);
    cy.visit('/');
    cy.logout(lessorInfo.fullName);
  });

  beforeEach(() => {
    cy.login(lessorInfo);
    cy.waitForNetworkIdle(`@login`, 1500);
    cy.navigateToLessor(lessorInfo.fullName);
    cy.navigateToAddProduct();
  });

  it('should yield step 1 basic info field error', () => {
    cy.getButton('Continue').click();
    cy.get('p[class^="px-3 pt-2 text-red-500"]:not(:empty)').should('have.length', 5);
  });

  it('should fill basic info and yield field error of step 2', () => {
    cy.lessorFillStep1OfAddProductForm(testProduct);
    cy.getButton('Continue').click();
    cy.get('p[class^="px-3 pt-2 text-red-500"]:not(:empty)').should('have.length', 1);
  });

  it('should fill detailed info and yield field error of step 3', () => {
    cy.lessorFillStep1OfAddProductForm(testProduct);
    cy.lessorFillStep2OfAddProductForm(testProduct);

    cy.contains('Continue').click({ force: true });
    cy.get('p[class^="px-3 pt-2 text-red-500"]:not(:empty)').should('have.length', 3);
  });

  it('should fill rental info and yield field error of step 4', () => {
    cy.lessorFillStep1OfAddProductForm(testProduct);
    cy.lessorFillStep2OfAddProductForm(testProduct);
    cy.lessorFillStep3OfAddProductForm(testProduct);

    cy.contains('Submit').click({ force: true });
    cy.get('p[class^="px-3 pt-2 text-red-500"]:not(:empty)').should('have.length', 1);
  });

  it('should generate a new product', () => {
    cy.lessorFillStep1OfAddProductForm(testProduct);
    cy.lessorFillStep2OfAddProductForm(testProduct);
    cy.lessorFillStep3OfAddProductForm(testProduct);
    cy.lessorFillStep4OfAddProductForm(testProduct);

    cy.waitForNetworkIdle('@addProduct', 2000);

    if (testProduct.name) cy.contains(testProduct.name).should('exist');
    if (testProduct.subCategory) cy.contains(testProduct.subCategory).should('exist');
    if (testProduct.timeUnit) cy.contains(testProduct.timeUnit).should('exist');
    if (testProduct.value) cy.contains(testProduct.value).should('exist');
    if (testProduct.price) cy.contains(testProduct.price).should('exist');
  });
});

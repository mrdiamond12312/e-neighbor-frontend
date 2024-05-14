import dayjs from 'dayjs';

describe('main-flow-order', () => {
  const lessorInfo: TEST.ILessorInfo = {
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

  const rentalInfo: TEST.IRentalPaymentInfo = {
    cardHolder: 'NGUYEN VAN A',
    cardNumber: '9704198526191432198',
    issueDate: '07/15',
    otp: '123456',
    deliveryAddress: 'Main Flow Test Address',
    endDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
    startDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  };

  const adminInfo: TEST.IRegisterInfo = {
    willNavigate: true,
    userName: 'admin',
    password: '12345678',
  };

  const userInfo: TEST.IProfileInfo = {
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

  const testProduct: TEST.IProduct = {
    name: 'Test Product Main Flow',
    images: [
      './cypress/support/images/product-image.jpg',
      './cypress/support/images/product-image-1.jpg',
    ],
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

  before(() => {
    cy.sanitizeDatabase({
      productName: testProduct.name,
      userName: lessorInfo.userName,
      lessorShopName: lessorInfo.shopName,
    });

    cy.sanitizeDatabase({
      userName: userInfo.userName,
    });
    cy.register(lessorInfo);
    cy.wait('@register').its('response.statusCode').should('eq', 201);
    cy.navigateToLessor(lessorInfo.fullName);

    cy.contains('Welcome to Lessor Channel').should('exist');
    cy.getButton('OK').click();

    cy.lessorFillStep1OfOnboardingForm(lessorInfo);
    cy.lessorFillStep2OfOnboardingForm(lessorInfo);
    cy.lessorFillStep3OfOnboardingForm(lessorInfo);
    cy.visit('/');
    cy.logout(lessorInfo.fullName);

    cy.wait(1000);
    cy.register(userInfo);
    cy.wait('@register').its('response.statusCode').should('eq', 201);
    cy.wait(1000);
    cy.navigateToProfile(userInfo.fullName);
    cy.getButton('Edit').click({ force: true });
    cy.fillProfile(userInfo);
    cy.getButton('Submit').click();
    cy.submitProfileChange(userInfo.password);
    cy.wait('@profileUpdate').its('response.statusCode').should('eq', 200);
  });

  beforeEach(() => {
    cy.task(
      'queryDb',
      `DELETE FROM orders WHERE product_id IN (SELECT id FROM products WHERE name = '${testProduct.name}');`,
    );
    cy.task(
      'queryDb',
      `DELETE FROM product_surcharge WHERE product_id IN (SELECT id FROM products WHERE name = '${testProduct.name}');`,
    );
    cy.task('queryDb', `DELETE FROM products WHERE name = '${testProduct.name}'`);
    cy.login(lessorInfo);
    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.navigateToLessor(lessorInfo.fullName);
    cy.navigateToAddProduct();
    cy.lessorFillStep1OfAddProductForm(testProduct);
    cy.lessorFillStep2OfAddProductForm(testProduct);
    cy.lessorFillStep3OfAddProductForm(testProduct);
    cy.lessorFillStep4OfAddProductForm(testProduct);
    cy.wait('@addProduct').its('response.statusCode').should('eq', 201);
    cy.wait(2000);
    cy.adminLogin(adminInfo);
    cy.wait(1000);
    cy.navigateToApproveProduct();

    cy.getInputByPlaceholder('Search')
      .click({ force: true })
      .type(testProduct.name ?? '{backspace}')
      .type('{enter}');

    cy.wait('@getProducts');

    if (testProduct.name) cy.contains(testProduct.name).click();
    cy.wait('@getProductDetails');

    cy.contains('Review this Approval Request').click();
    cy.wait(500);
    const reviewPayload: TEST.IProductApproval = {
      approval: 'Approved',
    };
    cy.reviewProductApproval(reviewPayload);
    cy.wait('@approveProduct').its('response.statusCode').should('eq', 200);
    cy.logout(adminInfo.userName);
  });

  it('should do sth', () => {
    cy.login(userInfo);
    cy.wait('@login').its('response.statusCode').should('eq', 200);

    cy.wait(1500);
    cy.visit('/store');
    cy.wait('@getProducts');
    cy.getInputByPlaceholder('Search')
      .type(testProduct.name ?? '{backspace}')
      .type('{enter}');
    cy.wait('@getProducts');

    cy.contains(testProduct.category ?? '').click();

    cy.contains(testProduct.name ?? '').click();
    cy.scrollTo('top', { ensureScrollable: false });
    cy.contains('Rent Now').click().wait(500);
    cy.mainFlowUserRenting(rentalInfo);
  });
});

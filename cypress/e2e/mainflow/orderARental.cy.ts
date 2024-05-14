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

  before(() => {
    cy.sanitizeDatabase({
      productName: testProduct.name,
    });
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
    cy.waitForNetworkIdle(`@login`, 1500);
    cy.navigateToLessor(lessorInfo.fullName);
    cy.navigateToAddProduct();
    cy.lessorFillStep1OfAddProductForm(testProduct);
    cy.lessorFillStep2OfAddProductForm(testProduct);
    cy.lessorFillStep3OfAddProductForm(testProduct);
    cy.lessorFillStep4OfAddProductForm(testProduct);
    cy.waitForNetworkIdle('@addProduct', 1500);
    cy.adminLogin(adminInfo);
    cy.navigateToApproveProduct();

    cy.getInputByPlaceholder('Search')
      .click({ force: true })
      .type(testProduct.name ?? '{backspace}')
      .type('{enter}');

    cy.waitForNetworkIdle('@getProducts', 300);

    if (testProduct.name) cy.contains(testProduct.name).click();
    cy.waitForNetworkIdle('@getProductDetails', 300);

    cy.contains('Review this Approval Request').click();
    cy.wait(500);
    const reviewPayload: TEST.IProductApproval = {
      approval: 'Approved',
    };
    cy.reviewProductApproval(reviewPayload);
    cy.waitForNetworkIdle('@approveProduct', 1500);
    cy.logout(adminInfo.userName);
  });

  it('should do sth', () => {
    cy.login(userInfo);
    cy.waitForNetworkIdle(`@login`, 1500);
    cy.visit('/store');
    cy.wait(1500);
    cy.waitForNetworkIdle('@getProducts', 300);
    cy.getInputByPlaceholder('Search')
      .type(testProduct.name ?? '{backspace}')
      .type('{enter}');
    cy.waitForNetworkIdle('@getProducts', 300);

    cy.contains(testProduct.category ?? '').click();

    cy.contains(testProduct.name ?? '').click();
    cy.waitForNetworkIdle('@getProductDetails', 300);
    cy.scrollTo('top', { ensureScrollable: false });
    cy.contains('Rent Now').click().wait(500);
    cy.mainFlowUserRenting(rentalInfo);

    cy.visit('/');
    cy.logout(userInfo.fullName);
    cy.login(lessorInfo);
    cy.waitForNetworkIdle(`@login`, 1500);
    cy.navigateToLessor(lessorInfo.fullName);
    cy.navigateToOrders();
    cy.waitForNetworkIdle(1500, {
      log: false,
    });
    cy.waitForNetworkIdle('@getOrders', 300);
    cy.mainFlowLessorApproveOrder(userInfo.fullName);

    const testDeliveryInfo: TEST.IDeliveryPayload = {
      findString: lessorInfo.shopName ?? '',
      condition: 'Main Flow Test Condition',
      evidence: './cypress/support/images/avatar.jpg',
      punctuation: 'On time',
    };
    cy.visit('/');
    cy.logout(lessorInfo.fullName);
    cy.login(userInfo);
    cy.waitForNetworkIdle(`@login`, 1500);
    cy.navigateToProfileOrders(userInfo.fullName);
    cy.waitForNetworkIdle(300, {
      log: false,
    });
    cy.waitForNetworkIdle('@getOrders', 300);
    cy.mainFlowUserReceiptOrder(testDeliveryInfo);

    const testReturnInfo: TEST.IDeliveryPayload = {
      findString: userInfo.fullName ?? '',
      condition: 'Main Flow Test Condition',
      evidence: './cypress/support/images/avatar.jpg',
      punctuation: 'On time',
    };
    cy.visit('/');
    cy.logout(userInfo.fullName);
    cy.login(lessorInfo);
    cy.waitForNetworkIdle(`@login`, 1500);
    cy.navigateToLessor(lessorInfo.fullName);
    cy.navigateToOrders();
    cy.waitForNetworkIdle(1500, {
      log: false,
    });
    cy.waitForNetworkIdle('@getOrders', 300);
    cy.mainFlowLessorReturnOrder(testReturnInfo);
  });
});

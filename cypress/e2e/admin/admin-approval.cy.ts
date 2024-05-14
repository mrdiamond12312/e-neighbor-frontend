describe('admin-approve-product', () => {
  const lessorInfo: TEST.ILessorInfo = {
    willNavigate: true,
    email: 'testApprovingProduct@123.com',
    fullName: 'Testing Approving Product',
    password: '12345678',
    passwordConfirm: '12345678',
    userName: 'testUserApprovingProduct',
    dob: '2002-12-24',
    address: 'Address',
    phoneNumber: '123444544',
    citizenId: '035229769266',
    avatar: './cypress/support/images/avatar.jpg',
    citizenCardBack: './cypress/support/images/citizenCardBack.png',
    citizenCardFront: './cypress/support/images/citizenCardFront.jpg',

    location: 'Ho Chi Minh City',
    shopDescription: 'An Approving Product Testing Lessor Shop',
    shopName: 'Test Lessor Approving Product ',
    warehouseAddress: 'Test Approving Product Address',
  };

  const adminInfo: TEST.IRegisterInfo = {
    willNavigate: true,
    userName: 'admin',
    password: '12345678',
  };

  const testProduct: TEST.IProduct = {
    name: 'Test Product to Approve',
    images: [
      './cypress/support/images/product-image.jpg',
      './cypress/support/images/product-image-1.jpg',
    ],
    description: 'Test Product to Approve Descriptions',
    price: '30000',
    timeUnit: '₫ / day',

    category: 'Furnitures',
    subCategory: 'Table',
    brand: 'Test Product to Approve Brand',
    size: 'Test Product to Approve Size',
    weight: 'Test Product to Approve Weight',
    quantity: 'Test Product to Approve Quantity 0',

    value: '1200000',
    mortgage: 'Motorcycle mortgage',
    reqDocs: "Compare citizen ID card and driver's license",
    haveInsurance: true,
    insuranceHolder: 'Tester KC',
    insurancePhoto: './cypress/support/images/avatar.jpg',
    insuranceDesc: 'Product to Approve Insurance Test',
    insuranceIssuedDate: '2023-12-24',
    insuranceExpDate: '2029-12-24',
  };

  before(() => {
    cy.sanitizeDatabase({
      productName: testProduct.name,
      userName: lessorInfo.userName,
      lessorShopName: lessorInfo.shopName,
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
  });

  beforeEach(() => {
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
  });

  it('should approve a product', () => {
    const reviewPayload: TEST.IProductApproval = {
      approval: 'Approved',
    };
    cy.reviewProductApproval(reviewPayload);
    cy.wait('@approveProduct').its('response.statusCode').should('eq', 200);
  });

  it('should reject a product', () => {
    const reviewPayload: TEST.IProductApproval = {
      approval: 'Rejected',
      rejectReason: 'Testing Rejection',
    };
    cy.reviewProductApproval(reviewPayload);
    cy.wait('@approveProduct').its('response.statusCode').should('eq', 200);
  });

  it('should yield field error', () => {
    const reviewPayload: TEST.IProductApproval = {
      approval: 'Rejected',
    };
    cy.reviewProductApproval(reviewPayload);
    cy.get('p[class^="px-3 pt-2 text-red-500"]:not(:empty)').should('have.length', 1);
  });
});

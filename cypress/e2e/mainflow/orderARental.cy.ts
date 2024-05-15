import { testFeedbackInfo } from './testData';

import {
  adminInfo,
  lessorInfo,
  rentalInfo,
  testDeliveryInfo,
  testProduct,
  testReturnInfo,
  userInfo,
} from 'cypress/e2e/mainflow/testData';

describe('main-flow-order', () => {
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

  it('should try finishing mainflow', () => {
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

    cy.visit('/');
    cy.logout(lessorInfo.fullName);
    cy.login(userInfo);
    cy.waitForNetworkIdle(`@login`, 1500);
    cy.navigateToProfileOrders(userInfo.fullName);
    cy.waitForNetworkIdle(300, {
      log: false,
    });
    cy.waitForNetworkIdle('@getOrders', 300);
    cy.mainFlowUserFeedback(testFeedbackInfo);
  });
});

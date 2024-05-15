/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import 'cypress-network-idle';
// export const fn = () => {};

before(() => {
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: 'https://upload.imagekit.io/api/v1/files/upload*',
    alias: 'uploadImage',
  });

  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/auth/register',
    alias: 'register',
  });
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/auth/login',
    alias: 'login',
  });

  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/auth/admin-login',
    alias: 'adminLogin',
  });

  // Profile Update
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/user/update',
    alias: 'profileUpdate',
  });

  // Lessor Onboarding
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/lessor/onboard',
    alias: 'lessorOnboarding',
  });

  // Get Categories (wildcard for "isVehicle*")
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/categories?isVehicle*',
    alias: 'getCategories',
  });

  // Get Category Details (wildcard for any category ID)
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/categories/*',
    alias: 'getCategoryDetails',
  });

  // Add Product
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/products',
    alias: 'addProduct',
  });

  // Get Products
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/products',
    alias: 'getProducts',
  });

  // Get Product Details (wildcard for any product ID)
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/products/*',
    alias: 'getProductDetails',
  });

  // Approve Product
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/products/admin-confirm',
    alias: 'approveProduct',
  });

  // Create Order
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/thirdparty-payment/create-transaction',
    alias: 'createOrder',
  });

  // Get Orders
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders?*',
    alias: 'getOrders',
  });

  // Get Order Details
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/*',
    alias: 'getOrderDetails',
  });

  // User Cancel Order
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/pending/user-update',
    alias: 'userCancelOrder',
  });

  // Lessor Approve Order
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/pending/lessor-update',
    alias: 'lessorApproveOrder',
  });

  // User Receipt Order
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/approved/user-update',
    alias: 'userReceiptOrder',
  });

  // Lessor Order Return
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/in-progress/lessor-update',
    alias: 'lessorOrderReturn',
  });
});
beforeEach(() => {
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: 'https://upload.imagekit.io/api/v1/files/upload*',
    alias: 'uploadImage',
  });

  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/auth/register',
    alias: 'register',
  });
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/auth/login',
    alias: 'login',
  });

  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/auth/admin-login',
    alias: 'adminLogin',
  });

  // Profile Update
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/user/update',
    alias: 'profileUpdate',
  });

  // Lessor Onboarding
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/lessor/onboard',
    alias: 'lessorOnboarding',
  });

  // Get Categories (wildcard for "isVehicle*")
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/categories?isVehicle*',
    alias: 'getCategories',
  });

  // Get Category Details (wildcard for any category ID)
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/categories/*',
    alias: 'getCategoryDetails',
  });

  // Add Product
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/products',
    alias: 'addProduct',
  });

  // Get Products
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/products',
    alias: 'getProducts',
  });

  // Get Product Details (wildcard for any product ID)
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/products/*',
    alias: 'getProductDetails',
  });

  // Approve Product
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/products/admin-confirm',
    alias: 'approveProduct',
  });

  // Create Order
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('ENEIGHBOR_API') + '/thirdparty-payment/create-transaction',
    alias: 'createOrder',
  });

  // Get Orders
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders?*',
    alias: 'getOrders',
  });

  // Get Order Details
  cy.waitForNetworkIdlePrepare({
    method: 'GET',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/*',
    alias: 'getOrderDetails',
  });

  // User Cancel Order
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/pending/user-update',
    alias: 'userCancelOrder',
  });

  // Lessor Approve Order
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/pending/lessor-update',
    alias: 'lessorApproveOrder',
  });

  // User Receipt Order
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/approved/user-update',
    alias: 'userReceiptOrder',
  });

  // Lessor Order Return
  cy.waitForNetworkIdlePrepare({
    method: 'PATCH',
    pattern: Cypress.env('ENEIGHBOR_API') + '/orders/in-progress/lessor-update',
    alias: 'lessorOrderReturn',
  });
});
declare global {
  namespace Cypress {
    interface Chainable {
      adminLogin(loginInfo: TEST.IRegisterInfo): Chainable<void>;
      login(loginInfo: TEST.IRegisterInfo): Chainable<void>;
      register(registerInfo: TEST.IRegisterInfo): Chainable<void>;
      logout(fullName?: string): Chainable<void>;

      navigateToProfile(fullName?: string): Chainable<void>;
      navigateToProfileOrders(fullName?: string): Chainable<void>;
      fillProfile(profileInfo: TEST.IProfileInfo): Chainable<void>;
      submitProfileChange(password?: string): Chainable<void>;

      navigateToLessor(fullName?: string): Chainable<void>;
      lessorFillStep1OfOnboardingForm(generalInformation: TEST.IProfileInfo): Chainable<void>;
      lessorFillStep2OfOnboardingForm(lessorInfo: TEST.ILessorInfo): Chainable<void>;
      lessorFillStep3OfOnboardingForm(lessorInfo: TEST.ILessorInfo): Chainable<void>;

      navigateToAddProduct(): Chainable<void>;
      navigateToOrders(): Chainable<void>;
      navigateToAllProducts(): Chainable<void>;
      lessorFillStep1OfAddProductForm(productInfo: TEST.IProduct): Chainable<void>;
      lessorFillStep2OfAddProductForm(productInfo: TEST.IProduct): Chainable<void>;
      lessorFillStep3OfAddProductForm(productInfo: TEST.IProduct): Chainable<void>;
      lessorFillStep4OfAddProductForm(productInfo: TEST.IProduct): Chainable<void>;

      navigateToApproveProduct(): Chainable<void>;
      reviewProductApproval(payload?: TEST.IProductApproval): Chainable<void>;
      mainFlowUserRenting(payload?: TEST.IRentalPaymentInfo): Chainable<void>;
      mainFlowUserCancelOrder(): Chainable<void>;
      mainFlowUserReceiptOrder(payload: TEST.IDeliveryPayload): Chainable<void>;

      mainFlowLessorApproveOrder(userFullName?: string): Chainable<void>;
      mainFlowLessorRejectOrder(userFullName?: string, reason?: string): Chainable<void>;
      mainFlowLessorReturnOrder(payload: TEST.IDeliveryPayload): Chainable<void>;
      mainFlowUserFeedback(payload: TEST.IFeedbackPayload): Chainable<void>;
      nextStep(): Chainable<void>;
      prevStep(): Chainable<void>;

      sanitizeDatabase(payload: TEST.IDBSanitize): Chainable<void>;

      getInputByLabel(label: string): Chainable<JQuery<HTMLInputElement>>;
      getInputByPlaceholder(placeholder: string): Chainable<JQuery<HTMLInputElement | HTMLElement>>;
      getButton(label: string): Chainable<JQuery<HTMLButtonElement>>;

      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;

      printLog(msg: any): Chainable<Element>;
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

/**
 * Ant Design Form components
 */

Cypress.Commands.add('getInputByLabel', (label: string) => {
  return cy.contains('label', label).parent().parent().find('input, textarea');
});

Cypress.Commands.add('getInputByPlaceholder', (placeholder: string) => {
  return cy.get(`input[placeholder*="${placeholder}"]`);
});
/**
 * Ant Design Button
 */
Cypress.Commands.add('getButton', (text: string) => {
  return cy.get('button:visible').contains(text).filter(':visible');
});

/**
 * SANITIZE DATABASE
 */
Cypress.Commands.add('sanitizeDatabase', (payload: TEST.IDBSanitize) => {
  if (payload.productName) {
    cy.task(
      'queryDb',
      `UPDATE orders SET feedback_id = NULL WHERE product_id IN (SELECT id FROM products WHERE name = '${payload.productName}');`,
    );
    cy.task(
      'queryDb',
      `DELETE FROM "feedbacks" WHERE order_id IN (SELECT id FROM orders WHERE product_id IN (SELECT id FROM products WHERE name = '${payload.productName}'));`,
    );
    cy.task(
      'queryDb',
      `DELETE FROM "thirdparty-payment" WHERE order_id IN (SELECT id FROM orders WHERE product_id IN (SELECT id FROM products WHERE name = '${payload.productName}'));`,
    );
    cy.task(
      'queryDb',
      `DELETE FROM rental_fee WHERE order_id IN (SELECT id FROM orders WHERE product_id IN (SELECT id FROM products WHERE name = '${payload.productName}'));`,
    );
    cy.task(
      'queryDb',
      `DELETE FROM orders WHERE product_id IN (SELECT id FROM products WHERE name = '${payload.productName}');`,
    );
    cy.task(
      'queryDb',
      `DELETE FROM product_surcharge WHERE product_id IN (SELECT id FROM products WHERE name = '${payload.productName}');`,
    );
    cy.task('queryDb', `DELETE FROM products WHERE name = '${payload.productName}'`);
  }
  if (payload.lessorShopName)
    cy.task('queryDb', `DELETE FROM lessors WHERE shop_name = '${payload.lessorShopName}'`);
  if (payload.userName)
    cy.task('queryDb', `DELETE FROM users WHERE user_name LIKE '${payload.userName}'`);
});

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
before(() => {
  cy.task(
    'queryDb',
    `DELETE FROM product_surcharge WHERE product_id IN (SELECT id FROM products WHERE name LIKE 'Test %');`,
  );
  cy.task('queryDb', "DELETE FROM public.products WHERE name LIKE 'Test %'");
  cy.task('queryDb', "DELETE FROM public.lessors WHERE shop_name LIKE 'Test Lessor%'");
  cy.task('queryDb', "DELETE FROM public.users WHERE user_name LIKE 'testUser%'");
  cy.intercept('GET', '/services/doctor/by-symptoms?+(ids=*&|)search=*').as('doctorBySymptoms');
  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/auth/register').as('register');
  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/auth/login').as('login');
  cy.intercept('PATCH', Cypress.env('ENEIGHBOR_API') + '/user/update').as('profileUpdate');
  cy.intercept('POST', 'https://upload.imagekit.io/api/v1/files/upload*').as('uploadImage');
  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/lessor/onboard').as('lessorOnboarding');
  cy.intercept('GET', Cypress.env('ENEIGHBOR_API') + '/categories?isVehicle*').as('getCategories');
  cy.intercept('GET', Cypress.env('ENEIGHBOR_API') + '/categories/*').as('getCategoryDetails');

  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/products').as('addProduct');
});
beforeEach(() => {
  cy.intercept('GET', '/services/doctor/by-symptoms?+(ids=*&|)search=*').as('doctorBySymptoms');
  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/auth/register').as('register');
  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/auth/login').as('login');
  cy.intercept('PATCH', Cypress.env('ENEIGHBOR_API') + '/user/update').as('profileUpdate');
  cy.intercept('POST', 'https://upload.imagekit.io/api/v1/files/upload*').as('uploadImage');
  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/lessor/onboard').as('lessorOnboarding');
  cy.intercept('GET', Cypress.env('ENEIGHBOR_API') + '/categories?isVehicle*').as('getCategories');
  cy.intercept('GET', Cypress.env('ENEIGHBOR_API') + '/categories/*').as('getCategoryDetails');

  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/products').as('addProduct');
});
declare global {
  namespace Cypress {
    interface Chainable {
      login(loginInfo: TEST.IRegisterInfo): Chainable<void>;
      register(registerInfo: TEST.IRegisterInfo): Chainable<void>;
      logout(fullName?: string): Chainable<void>;

      navigateToProfile(fullName?: string): Chainable<void>;
      fillProfile(profileInfo: TEST.IProfileInfo): Chainable<void>;
      submitProfileChange(password?: string): Chainable<void>;

      navigateToLessor(fullName?: string): Chainable<void>;
      lessorFillStep1OfOnboardingForm(generalInformation: TEST.IProfileInfo): Chainable<void>;
      lessorFillStep2OfOnboardingForm(lessorInfo: TEST.ILessorInfo): Chainable<void>;
      lessorFillStep3OfOnboardingForm(lessorInfo: TEST.ILessorInfo): Chainable<void>;

      navigateToAddProduct(): Chainable<void>;
      navigateToAllProducts(): Chainable<void>;
      lessorFillStep1OfAddProductForm(productInfo: TEST.IProduct): Chainable<void>;
      lessorFillStep2OfAddProductForm(productInfo: TEST.IProduct): Chainable<void>;
      lessorFillStep3OfAddProductForm(productInfo: TEST.IProduct): Chainable<void>;
      lessorFillStep4OfAddProductForm(productInfo: TEST.IProduct): Chainable<void>;

      nextStep(): Chainable<void>;
      prevStep(): Chainable<void>;

      getInputByLabel(label: string): Chainable<JQuery<HTMLInputElement>>;

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
/**
 * Ant Design Button
 */
Cypress.Commands.add('getButton', (text: string) => {
  return cy.get('button:visible').contains(text).filter(':visible');
});

export const checkCurrentStep = (step: number) => {
  return cy
    .get('div.ant-steps-item-active')
    .invoke('text')
    .then((text) => {
      console.log(text);
    })
    .should('contain', step);
};

/**
 * LOGIN - SIGNUP
 */

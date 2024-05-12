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

beforeEach(() => {
  cy.intercept('GET', '/services/symptoms?search=*').as('searchSymptoms');
  cy.intercept('GET', '/services/doctor/by-symptoms?+(ids=*&|)search=*').as('doctorBySymptoms');
  cy.intercept('POST', '/api/appointments').as('getAppointments');
  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/auth/register').as('register');
  cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/auth/login').as('login');
});
declare global {
  namespace Cypress {
    interface Chainable {
      login(loginInfo: TEST.IRegisterInfo): Chainable<void>;
      register(registerInfo: TEST.IRegisterInfo): Chainable<void>;
      logout(fullName: string): Chainable<void>;

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
  return cy.get('button').contains(text);
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

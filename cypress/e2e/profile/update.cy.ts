import { expect } from 'chai';

describe('profile-update', () => {
  const userInfo: TEST.IRegisterInfo = {
    willNavigate: true,
    email: 'test@123.com',
    fullName: 'Testing User',
    password: '12345678',
    passwordConfirm: '12345678',
    userName: 'testUserProfile',
  };

  const extraInfo: TEST.IProfileInfo = {
    ...userInfo,
    dob: '2002-12-24',
    address: 'address',
    phoneNumber: '123444544',
    citizenId: '035229769266',
    fullName: 'Testing User Change',
  };
  before(() => {
    cy.sanitizeDatabase({
      userName: userInfo.userName,
    });
    cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/auth/register').as('register');
    cy.register(userInfo);
    cy.waitForNetworkIdle(`@register`, 1500);
    cy.logout(userInfo.fullName);
  });

  beforeEach(() => {
    cy.login(userInfo);
    cy.waitForNetworkIdle(`@login`, 1500);
    cy.navigateToProfile(userInfo.fullName);
  });
  it('should contain user info', () => {
    cy.getInputByLabel('Email').should('have.value', userInfo.email);
    cy.getInputByLabel('Full name').should('have.value', userInfo.fullName);
    cy.getInputByLabel('Username').should('have.value', userInfo.userName);
  });
  it('should generate field errors', () => {
    cy.getButton('Edit').click({ force: true });
    cy.location().should((loc) => {
      expect(loc.search).to.equal('?mode=edit-mode');
    });

    cy.getButton('Submit').click();
    cy.get('p[class^="px-3 pt-2 text-red-500"]:not(:empty)').should('have.length', 4);
  });
  it('should update user', () => {
    cy.getButton('Edit').click({ force: true });
    cy.location().should((loc) => {
      expect(loc.search).to.equal('?mode=edit-mode');
    });
    cy.fillProfile(extraInfo);
    cy.getButton('Submit').click();
    cy.submitProfileChange(extraInfo.password);

    cy.waitForNetworkIdle('@profileUpdate', 1500);
    cy.navigateToProfile(userInfo.fullName);
    cy.getInputByLabel('Email').should('have.value', extraInfo.email);
    cy.getInputByLabel('Full name').should('have.value', extraInfo.fullName);
    cy.getInputByLabel('Username').should('have.value', extraInfo.userName);
    cy.getInputByLabel('Address').should('have.value', extraInfo.address);
    cy.getInputByLabel('Phone Number').should('have.value', extraInfo.phoneNumber);
    cy.getInputByLabel('Citizen ID').should('have.value', extraInfo.citizenId);
  });

  it('should prevent user update on wrong password', () => {
    cy.getButton('Edit').click({ force: true });
    cy.location().should((loc) => {
      expect(loc.search).to.equal('?mode=edit-mode');
    });
    cy.fillProfile(extraInfo);
    cy.getButton('Submit').click();
    cy.submitProfileChange('12344444');
    cy.waitForNetworkIdle('@profileUpdate', 1500);
    cy.location('pathname').should('eq', '/user/login');
  });
});

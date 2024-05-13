describe('lessor-onboard', () => {
  const userInfo: TEST.IRegisterInfo = {
    willNavigate: true,
    email: 'testUserLessorOnboard@123.com',
    fullName: 'Testing User',
    password: '12345678',
    passwordConfirm: '12345678',
    userName: 'testUserLessorOnboard',
  };

  const extraInfo: TEST.IProfileInfo = {
    ...userInfo,
    dob: '2002-12-24',
    address: 'Address',
    phoneNumber: '123444544',
    citizenId: '035229769266',
    fullName: 'Testing User Change',
    avatar: './cypress/support/images/avatar.jpg',
    citizenCardBack: './cypress/support/images/citizenCardBack.png',
    citizenCardFront: './cypress/support/images/citizenCardFront.jpg',
  };

  const lessorInfo: TEST.ILessorInfo = {
    ...extraInfo,
    location: 'Ho Chi Minh City',
    shopDescription: 'A Testing Lessor Shop',
    shopName: 'Test Lessor',
    warehouseAddress: 'Testing Address',
  };

  before(() => {
    cy.intercept('POST', Cypress.env('ENEIGHBOR_API') + '/auth/register').as('register');
    cy.register(userInfo);
    cy.wait('@register').its('response.statusCode').should('eq', 201);
    cy.logout(userInfo.fullName);
  });

  beforeEach(() => {
    cy.login(userInfo);
    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.navigateToLessor(userInfo.fullName);
    cy.contains('Welcome to Lessor Channel').should('exist');
    cy.getButton('OK').click();
  });

  it('should yield general information field error', () => {
    cy.getButton('Continue').click();
    cy.get('p[class^="px-3 pt-2 text-red-500"]:not(:empty)').should('have.length', 4);
  });

  it('should field step 1 and generate step 2 error', () => {
    cy.lessorFillStep1OfOnboardingForm(extraInfo);
    cy.getButton('Continue').click({ force: true });
    cy.get('p[class^="px-3 pt-2 text-red-500"]:not(:empty)').should('have.length', 4);
  });

  it('should field step 2 and generate step 3 error', () => {
    cy.lessorFillStep1OfOnboardingForm(extraInfo);
    cy.lessorFillStep2OfOnboardingForm(lessorInfo);
    cy.getButton('Submit').click({ force: true });
    cy.get('p[class^="px-3 pt-2 text-red-500"]:not(:empty)').should('have.length', 3);
  });

  it('should submit successfully and become lessor', () => {
    cy.lessorFillStep1OfOnboardingForm(extraInfo);
    cy.lessorFillStep2OfOnboardingForm(lessorInfo);
    cy.lessorFillStep3OfOnboardingForm(lessorInfo);
    cy.visit('/user/profile');
    cy.getInputByLabel('Email').should('have.value', extraInfo.email);
    cy.getInputByLabel('Full name').should('have.value', extraInfo.fullName);
    cy.getInputByLabel('Username').should('have.value', extraInfo.userName);
    cy.getInputByLabel('Address').should('have.value', extraInfo.address);
    cy.getInputByLabel('Phone Number').should('have.value', extraInfo.phoneNumber);
    cy.getInputByLabel('Citizen ID').should('have.value', extraInfo.citizenId);
    cy.contains('Lessor').should('exist');
  });
});

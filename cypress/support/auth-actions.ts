Cypress.Commands.add('register', (registerInfo: TEST.IRegisterInfo) => {
  if (registerInfo.willNavigate) cy.visit('/signup');

  cy.get('button').contains('Sign Up!').should('be.visible');
  cy.getInputByLabel('Username').type(registerInfo.userName ?? '{backspace}');
  cy.getInputByLabel('Fullname').type(registerInfo.fullName ?? '{backspace}');
  cy.getInputByLabel('Password').type(registerInfo.password ?? '{backspace}');
  cy.getInputByLabel('Password Confirmation').type(registerInfo.passwordConfirm ?? '{backspace}');
  cy.getInputByLabel('Email').type(registerInfo.email ?? '{backspace}');

  cy.getButton('Sign Up!').click();
});

Cypress.Commands.add('login', (loginInfo: TEST.IRegisterInfo) => {
  if (loginInfo.willNavigate) cy.visit('/user/login');

  cy.get('button').contains('Sign in').should('be.visible');
  cy.getInputByLabel('Username').type(loginInfo.userName ?? '{backspace}');
  cy.getInputByLabel('Password').type(loginInfo.password ?? '{backspace}');

  cy.getButton('Sign in').click();
});

Cypress.Commands.add('logout', (fullName: string) => {
  cy.get('.ant-dropdown-trigger').contains(fullName).trigger('mouseover', { force: true });
  cy.get('.ant-dropdown-menu-title-content').contains('Log out').click({ force: true });
});

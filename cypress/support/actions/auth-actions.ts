Cypress.Commands.add('register', (registerInfo: TEST.IRegisterInfo) => {
  if (registerInfo.willNavigate) cy.visit('/user/sign-up');

  cy.get('button').contains('Sign Up!').should('be.visible');
  cy.getInputByLabel('Username')
    .clear()
    .type(registerInfo.userName ?? '{backspace}');
  cy.getInputByLabel('Fullname')
    .clear()
    .type(registerInfo.fullName ?? '{backspace}');
  cy.getInputByLabel('Password')
    .clear()
    .type(registerInfo.password ?? '{backspace}');
  cy.getInputByLabel('Password Confirmation')
    .clear()
    .type(registerInfo.passwordConfirm ?? '{backspace}');
  cy.getInputByLabel('Email')
    .clear()
    .type(registerInfo.email ?? '{backspace}');

  cy.getButton('Sign Up!').click();
});

Cypress.Commands.add('login', (loginInfo: TEST.IRegisterInfo) => {
  if (loginInfo.willNavigate) cy.visit('/user/login');

  cy.get('button').contains('Sign in').should('be.visible');
  cy.getInputByLabel('Username')
    .clear()
    .type(loginInfo.userName ?? '{backspace}');
  cy.getInputByLabel('Password')
    .clear()
    .type(loginInfo.password ?? '{backspace}');

  cy.getButton('Sign in').click();
});

Cypress.Commands.add('logout', (fullName?: string) => {
  cy.get('.ant-dropdown-trigger')
    .contains(fullName ?? '')
    .trigger('mouseover', { force: true });
  cy.get('.ant-dropdown-menu-title-content').contains('Log out').click({ force: true });
});

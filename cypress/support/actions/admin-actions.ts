Cypress.Commands.add('adminLogin', (loginInfo: TEST.IRegisterInfo) => {
  if (loginInfo.willNavigate) cy.visit('/admin/login');
  cy.contains('Administrator Page').should('exist');
  cy.get('button').contains('Sign in').should('be.visible');
  cy.getInputByLabel('Username')
    .clear()
    .type(loginInfo.userName ?? '{backspace}');
  cy.getInputByLabel('Password')
    .clear()
    .type(loginInfo.password ?? '{backspace}');
  cy.getButton('Sign in').click();
  cy.waitForNetworkIdle('@adminLogin', 1500);
});

Cypress.Commands.add('navigateToApproveProduct', () => {
  cy.contains('Administrator Page').should('exist');
  cy.contains('Manage Product').click({ force: true });
  cy.contains('All Products').click({ force: true });
  cy.waitForNetworkIdle('@getProducts', 150);
});

Cypress.Commands.add('reviewProductApproval', (payload?: TEST.IProductApproval) => {
  if (payload) {
    {
      switch (payload.approval) {
        case 'Approved':
          cy.contains(payload.approval).click();
        case 'Rejected':
          cy.contains(payload.approval).click();
          if (payload.rejectReason) cy.getInputByLabel('Reject Reason').type(payload.rejectReason);
      }
    }
  }
  cy.getButton('Submit Reviews!').click();
});

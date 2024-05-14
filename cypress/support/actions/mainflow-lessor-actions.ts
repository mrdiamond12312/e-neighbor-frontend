Cypress.Commands.add('mainFlowLessorApproveOrder', (userFullName?: string) => {
  if (userFullName) {
    cy.contains(userFullName)
      .parent()
      .find('.ant-dropdown-trigger')
      .trigger('mouseover', { force: true });
    cy.contains('View Detail').click({ force: true });
    cy.waitForNetworkIdle('@getOrderDetails', 300);

    cy.getButton('Approve Rental Order').click().wait(500);
    cy.getButton('Approve this Order').click();
    cy.waitForNetworkIdle('@lessorApproveOrder', 1000);

    cy.contains(
      'This order has been APPROVED by you! Please ask the user to upload a receipt image upon this property delivery to proceed',
    ).should('exist');
  }
});

Cypress.Commands.add('mainFlowLessorReturnOrder', (payload: TEST.IDeliveryPayload) => {
  cy.contains(payload.findString)
    .parent()
    .find('.ant-dropdown-trigger')
    .trigger('mouseover', { force: true });

  cy.contains('View Detail').click({ force: true });
  cy.waitForNetworkIdle('@getOrderDetails', 300);

  cy.getButton('Upload Rental Return Images').click().wait(500);

  if (payload.punctuation) cy.contains(payload.punctuation).click();

  if (payload.condition) cy.getInputByLabel('Condition').type(payload.condition);

  if (payload.evidence) {
    cy.getInputByLabel('Evidence').selectFile(payload.evidence, { force: true });
    cy.waitForNetworkIdle('@uploadImage', 1500);
  }
  cy.waitForNetworkIdle(1500);
  cy.contains('Submit evidence and complete this order!').click();
  cy.waitForNetworkIdle('@lessorOrderReturn', 1500);
});

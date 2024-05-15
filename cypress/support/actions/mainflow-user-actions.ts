Cypress.Commands.add('mainFlowUserRenting', (payload?: TEST.IRentalPaymentInfo) => {
  if (payload?.deliveryAddress)
    cy.getInputByLabel('Rental product delivery address').click().type(payload.deliveryAddress);

  if (payload?.startDate && payload.endDate)
    cy.getInputByPlaceholder('Start date')
      .click()
      .type(payload.startDate)
      .type('{enter}')
      .getInputByPlaceholder('End date')
      .click()
      .type(payload.endDate)
      .wait(200)
      .type('{enter}')
      .wait(200);
  cy.contains('VNPAY').click({ force: true });
  cy.waitForNetworkIdle('@createOrder', 200);
  cy.origin('https://sandbox.vnpayment.vn/', { args: payload }, (payload) => {
    Cypress.Commands.add('getInputByPlaceholder', (placeholder: string) => {
      return cy.get(`input[placeholder*="${placeholder}"]`).first();
    });
    cy.getInputByPlaceholder('Searching...').click().type('ngan hang ncb');
    cy.get('button[id="NCB"]').click();
    if (payload?.cardNumber)
      cy.getInputByPlaceholder('Enter card number').click().type(payload.cardNumber);
    if (payload?.cardHolder)
      cy.getInputByPlaceholder('Enter card holder').click().type(payload.cardHolder);
    if (payload?.issueDate) cy.getInputByPlaceholder('MM/YY').click().type(payload.issueDate);

    cy.contains('Continue').click();
    cy.wait(500);
    cy.contains('Agree & Continue').click();
    if (payload?.otp) cy.getInputByPlaceholder('Enter OTP').type(payload.otp);
    cy.contains(new RegExp(`^(Confirm)`, 'g')).click();
  });

  cy.wait(3000);
  cy.location('pathname').should('eq', '/user/profile/orders/thank-you');
});

Cypress.Commands.add('mainFlowUserCancelOrder', () => {
  cy.contains('Cancel Order!').click();
  cy.contains('Confirm Cancellation!').click();
  cy.wait('@userCancelOrder').its('response.statusCode').should('eq', 200);
  cy.wait(1000);
});

Cypress.Commands.add('mainFlowUserReceiptOrder', (payload: TEST.IDeliveryPayload) => {
  cy.contains(payload.findString)
    .parent()
    .find('.ant-dropdown-trigger')
    .trigger('mouseover', { force: true });

  cy.contains('View Order Details').click({ force: true });
  cy.waitForNetworkIdle('@getOrderDetails', 300);
  cy.getButton('Submit Receipt Photos').click().wait(500);

  if (payload.punctuation) cy.contains(payload.punctuation).click();

  if (payload.condition) cy.getInputByLabel('Condition').type(payload.condition);

  if (payload.evidence) {
    cy.getInputByLabel('Evidence')
      .selectFile(payload.evidence, { force: true })
      .waitForNetworkIdle('@uploadImage', 1500);
  }
  cy.waitForNetworkIdle(3000, {
    log: false,
  });
  cy.contains('Submit receipt!').click();
  cy.waitForNetworkIdle('@userReceiptOrder', 1500);
});

Cypress.Commands.add('mainFlowUserFeedback', (payload: TEST.IFeedbackPayload) => {
  cy.contains(payload.findString)
    .parent()
    .find('.ant-dropdown-trigger')
    .trigger('mouseover', { force: true });

  cy.contains('View Order Details').click({ force: true });
  cy.waitForNetworkIdle('@getOrderDetails', 300);
  cy.getButton('Leave a Feedback').click().wait(500);

  if (payload.rating)
    cy.contains('label', 'Rating')
      .parent()
      .parent()
      .find(`div[aria-posinset="${payload.rating}"]`)
      .click();

  if (payload.comment) cy.getInputByLabel('Comment').type(payload.comment);

  if (payload.image) {
    cy.getInputByLabel('Photo')
      .selectFile(payload.image, { force: true })
      .waitForNetworkIdle('@uploadImage', 1500);
  }
  cy.waitForNetworkIdle(1500, {
    log: false,
  });
  cy.contains('Submit Review!').click();
  cy.waitForNetworkIdle('@userReceiptOrder', 1500);
});

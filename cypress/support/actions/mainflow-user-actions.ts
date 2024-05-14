Cypress.Commands.add('mainFlowUserRenting', (payload?: TEST.IRentalPaymentInfo) => {
  if (payload?.deliveryAddress)
    cy.getInputByLabel('Rental product delivery address').click().type(payload.deliveryAddress);

  if (payload?.startDate && payload.endDate)
    cy.getInputByPlaceholder('Start date')
      .click()
      .type(payload.startDate)
      .getInputByPlaceholder('End date')
      .click()
      .type(payload.endDate)
      .wait(200)
      .type('{enter}')
      .wait(200);
  cy.contains('VNPAY').click({ force: true });
  cy.wait('@createOrder');
  cy.wait(2000);
  cy.origin('https://sandbox.vnpayment.vn/', { args: payload }, (payload) => {
    Cypress.Commands.add('getInputByPlaceholder', (placeholder: string) => {
      return cy.get(`input[placeholder*="${placeholder}"]`).first();
    });
    cy.getInputByPlaceholder('Searching...').click().type('ngan hang ncb');
    cy.get('button[id="NCB"]').click();
    // cy.wait(5000);

    if (payload?.cardNumber)
      cy.getInputByPlaceholder('Enter card number').click().type(payload.cardNumber);
    if (payload?.cardHolder)
      cy.getInputByPlaceholder('Enter card holder').click().type(payload.cardHolder);
    if (payload?.issueDate) cy.getInputByPlaceholder('MM/YY').click().type(payload.issueDate);

    cy.contains('Continue').click();
    cy.wait(500);
    cy.contains('Agree & Continue').click();
    // cy.wait(3000);
    if (payload?.otp) cy.getInputByPlaceholder('Enter OTP').type(payload.otp);
    cy.contains(new RegExp(`^(Confirm)`, 'g')).click();
  });

  cy.wait(3000);
  cy.location('pathname').should('eq', '/user/profile/orders/thank-you');
});

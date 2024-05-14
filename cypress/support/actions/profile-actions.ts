Cypress.Commands.add('navigateToProfile', (fullName?: string) => {
  cy.get('.ant-dropdown-trigger')
    .contains(fullName ?? '')
    .trigger('mouseover', { force: true });
  cy.get('.ant-dropdown-menu-title-content').contains('User Info').click({ force: true });
});

Cypress.Commands.add('navigateToProfileOrders', (fullName?: string) => {
  cy.get('.ant-dropdown-trigger')
    .contains(fullName ?? '')
    .trigger('mouseover', { force: true });
  cy.get('.ant-dropdown-menu-title-content').contains('User Info').click({ force: true });
  cy.contains('Orders').click();
});

Cypress.Commands.add('fillProfile', (profileInfo: TEST.IProfileInfo) => {
  if (profileInfo.fullName)
    cy.getInputByLabel('Full name')
      .clear({ force: true })
      .type(profileInfo.fullName ?? '{backspace}');
  if (profileInfo.dob)
    cy.getInputByLabel('Date of birth')
      .click()
      .clear({ force: true })
      .type(profileInfo.dob ?? '{backspace}');

  if (profileInfo.address)
    cy.getInputByLabel('Address')
      .clear({ force: true })
      .type(profileInfo.address ?? '{backspace}');

  if (profileInfo.phoneNumber)
    cy.getInputByLabel('Phone Number')
      .clear({ force: true })
      .type(profileInfo.phoneNumber ?? '{backspace}');

  if (profileInfo.citizenId)
    cy.getInputByLabel('Citizen ID')
      .clear({ force: true })
      .type(profileInfo.citizenId ?? '{backspace}');
});

Cypress.Commands.add('submitProfileChange', (password?: string) => {
  if (password)
    cy.getInputByLabel('Password')
      .clear({ force: true })
      .type(password ?? '{backspace}');
  cy.getButton('Update').click();
});

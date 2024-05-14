Cypress.Commands.add('navigateToLessor', (fullName?: string) => {
  cy.get('.ant-dropdown-trigger')
    .contains(fullName ?? '')
    .trigger('mouseover', { force: true });
  cy.get('.ant-dropdown-menu-title-content').contains('To Lessor Channel').click({ force: true });
});

Cypress.Commands.add('lessorFillStep1OfOnboardingForm', (generalInformation: TEST.IProfileInfo) => {
  if (generalInformation.fullName)
    cy.getInputByLabel('Full Name')
      .clear({ force: true })
      .type(generalInformation.fullName ?? '{backspace}');

  if (generalInformation.email)
    cy.getInputByLabel('Email')
      .clear({ force: true })
      .type(generalInformation.email ?? '{backspace}');

  if (generalInformation.dob)
    cy.getInputByLabel('Date of Birth')
      .click()
      .clear({ force: true })
      .type(generalInformation.dob ?? '{backspace}');

  if (generalInformation.address)
    cy.getInputByLabel('Address')
      .clear({ force: true })
      .type(generalInformation.address ?? '{backspace}');

  if (generalInformation.phoneNumber)
    cy.getInputByLabel('Phone Number')
      .clear({ force: true })
      .type(generalInformation.phoneNumber ?? '{backspace}');

  if (generalInformation.avatar) {
    cy.getInputByLabel('Avatar').selectFile(generalInformation.avatar, { force: true });
    cy.getButton('OK').click({ force: true });
    cy.waitForNetworkIdle('@uploadImage', 1000);
  }
  cy.wait(200);
  cy.contains('Continue').scrollIntoView().click();
});

Cypress.Commands.add('lessorFillStep2OfOnboardingForm', (lessorInfo: TEST.ILessorInfo) => {
  if (lessorInfo.shopName)
    cy.getInputByLabel('Shop Name')
      .clear({ force: true })
      .type(lessorInfo.shopName ?? '{backspace}');

  if (lessorInfo.warehouseAddress)
    cy.getInputByLabel('Warehouse Address')
      .clear({ force: true })
      .type(lessorInfo.warehouseAddress ?? '{backspace}');

  if (lessorInfo.location)
    cy.getInputByLabel('Business Location')
      .click()
      .get('.ant-select-item-option-content')
      .contains(lessorInfo.location)
      .click({ force: true });

  if (lessorInfo.shopDescription)
    cy.getInputByLabel('Shop Description')
      .clear({ force: true })
      .type(lessorInfo.shopDescription ?? '{backspace}');

  cy.contains('Continue').click({ force: true });
});

Cypress.Commands.add('lessorFillStep3OfOnboardingForm', (lessorInfo: TEST.ILessorInfo) => {
  if (lessorInfo.citizenId)
    cy.getInputByLabel('Citizen ID')
      .clear({ force: true })
      .type(lessorInfo.citizenId ?? '{backspace}');

  if (lessorInfo.citizenCardFront) {
    cy.getInputByLabel('Front of Citizen Card').selectFile(lessorInfo.citizenCardFront, {
      force: true,
    });
    cy.getButton('OK').click();
    cy.waitForNetworkIdle('@uploadImage', 1000);
  }

  if (lessorInfo.citizenCardBack) {
    cy.getInputByLabel('Back of Citizen Card').selectFile(lessorInfo.citizenCardBack, {
      force: true,
    });
    cy.getButton('OK').click();
    cy.waitForNetworkIdle('@uploadImage', 1000);
  }
  cy.waitForNetworkIdle(1000);
  cy.contains('Submit').click({ force: true });
  cy.waitForNetworkIdle('@lessorOnboarding', 1500);
});

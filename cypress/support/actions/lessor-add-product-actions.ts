Cypress.Commands.add('navigateToAddProduct', () => {
  cy.contains("Lessor's Channel").should('exist');
  cy.contains('Products Management').click({ force: true });
  cy.contains('Add a Product').click({ force: true });
});

Cypress.Commands.add('navigateToAllProducts', () => {
  cy.contains("Lessor's Channel").should('exist');
  cy.contains('Products Management').click({ force: true });
  cy.contains('All Products').click({ force: true });
});

Cypress.Commands.add('lessorFillStep1OfAddProductForm', (productInfo: TEST.IProduct) => {
  if (productInfo.name)
    cy.getInputByLabel('Product name')
      .clear()
      .type(productInfo.name ?? '{backspace}');

  if (productInfo.images) {
    cy.getInputByLabel('Product photos (5)').selectFile(productInfo.images, { force: true });
    productInfo.images?.forEach(() => cy.wait('@uploadImage'));
  }

  if (productInfo.description)
    cy.getInputByLabel('Descriptions')
      .clear()
      .type(productInfo.description ?? '{backspace}');

  if (productInfo.price)
    cy.getInputByLabel('Rental Price')
      .clear()
      .type(productInfo.price ?? '{backspace}');

  if (productInfo.timeUnit)
    cy.getInputByLabel('Time Unit')
      .click()
      .get('.ant-select-item-option-content')
      .contains(productInfo.timeUnit)
      .click({ force: true });

  cy.getButton('Continue').click();
});

Cypress.Commands.add('lessorFillStep2OfAddProductForm', (productInfo: TEST.IProduct) => {
  if (productInfo.category && productInfo.subCategory) {
    cy.getInputByLabel('Category').click({ force: true });
    cy.get('.ant-cascader-menu-item').contains(productInfo.category).click({ force: true });
    cy.wait('@getCategories');
    cy.get('.ant-cascader-menu-item').contains(productInfo.subCategory).click({ force: true });
    cy.wait('@getCategoryDetails');
  }

  if (productInfo.brand) {
    cy.getInputByLabel('Brand')
      .clear()
      .type(productInfo.brand ?? '{backspace}');
  }

  if (productInfo.size) {
    cy.getInputByLabel('Size')
      .clear()
      .type(productInfo.size ?? '{backspace}');
  }
  if (productInfo.weight) {
    cy.getInputByLabel('Weight')
      .clear()
      .type(productInfo.weight ?? '{backspace}');
  }

  if (productInfo.quantity) {
    cy.getInputByLabel('Quantity')
      .clear()
      .type(productInfo.quantity ?? '{backspace}');
  }

  cy.getButton('Continue').click();
});

Cypress.Commands.add('lessorFillStep3OfAddProductForm', (productInfo: TEST.IProduct) => {
  if (productInfo.value)
    cy.getInputByLabel('Asset Value')
      .clear()
      .type(productInfo.value ?? '{backspace}');

  cy.getInputByLabel('Proper Use of Property').click({ multiple: true });

  if (productInfo.mortgage) cy.contains(productInfo.mortgage).click();

  if (productInfo.reqDocs) cy.contains(productInfo.reqDocs).click();

  cy.contains('Continue').click({ force: true });
});

Cypress.Commands.add('lessorFillStep4OfAddProductForm', (productInfo: TEST.IProduct) => {
  if (productInfo.haveInsurance) {
    cy.contains('Yes').click({ force: true });

    if (productInfo.insuranceDesc)
      cy.getInputByLabel('Description').clear().type(productInfo.insuranceDesc);

    if (productInfo.insurancePhoto) {
      cy.getInputByLabel('Insurance Photos').selectFile(productInfo.insurancePhoto, {
        force: true,
      });
      cy.wait('@uploadImage');
    }

    if (productInfo.insuranceIssuedDate)
      cy.getInputByLabel('Issued Date').click().type(productInfo.insuranceIssuedDate);

    if (productInfo.insuranceExpDate)
      cy.getInputByLabel('Expiration Date').click().type(productInfo.insuranceExpDate);

    if (productInfo.insuranceHolder)
      cy.getInputByLabel('Insurance Holdername').clear().type(productInfo.insuranceHolder);
  } else {
    cy.contains('Not have').click({ force: true });
  }
  cy.contains('Submit').scrollIntoView({ ensureScrollable: false }).trigger('click');
});

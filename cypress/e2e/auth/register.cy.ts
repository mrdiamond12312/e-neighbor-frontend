describe('register', () => {
  const userInfo = {
    willNavigate: false,
    email: 'test@123.com',
    fullName: 'Testing User',
    password: '12345678',
    passwordConfirm: '12345678',
    userName: 'testUser1',
  };

  it('should generate field error', () => {
    cy.visit('/');
    cy.contains('Sign in').should('exist').click();
    cy.getButton('Register!').click();
    cy.get('p[class^="px-3 pt-2 text-red-500"]').should('have.length', 5);
  });

  it('should succesfully create new user', () => {
    cy.visit('/');
    cy.contains('Sign in').should('exist').click();
    cy.getButton('Register!').click();

    cy.register(userInfo);

    cy.wait('@register').its('response.statusCode').should('eq', 201);
  });

  it('should not return 201', () => {
    cy.visit('/');
    cy.contains('Sign in').should('exist').click();
    cy.getButton('Register!').click();

    cy.register(userInfo);

    cy.register(userInfo);

    cy.wait('@register').its('response.statusCode').should('eq', 201);
  });
});

describe('login', () => {
  const userInfo = {
    willNavigate: false,
    userName: 'testUser1',
    password: '12345678',
    fullName: 'Testing User',
  };

  it('should generate field error', () => {
    cy.visit('/');
    cy.contains('Sign in').should('exist').click();
    cy.getButton('Sign in').click();
    cy.get('p[class^="px-3 pt-2 text-red-500"]').should('have.length', 2);
  });

  it('should succesfully log in', () => {
    cy.visit('/');
    cy.contains('Sign in').should('exist').click();

    cy.login(userInfo);

    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.logout(userInfo.fullName);
  });

  it('should not log in', () => {
    cy.visit('/');
    cy.contains('Sign in').should('exist').click();

    cy.login({ ...userInfo, password: '12344444' });

    cy.wait('@login').its('response.statusCode').should('eq', 401);
  });
});

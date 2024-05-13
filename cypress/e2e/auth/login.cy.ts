describe('login', () => {
  const userInfo = {
    willNavigate: true,
    email: 'testUserLogin@123.com',
    fullName: 'Testing User',
    password: '12345678',
    passwordConfirm: '12345678',
    userName: 'testUserLogin',
  };
  before(() => {
    cy.register(userInfo);
    cy.wait('@register').its('response.statusCode').should('eq', 201);
    cy.logout(userInfo.fullName);
  });
  beforeEach(() => {
    cy.visit('/');
  });
  it('should generate field error', () => {
    cy.contains('Sign in').should('exist').click();
    cy.getButton('Sign in').click();
    cy.get('p[class^="px-3 pt-2 text-red-500"]').should('have.length', 2);
  });

  it('should succesfully log in', () => {
    cy.contains('Sign in').should('exist').click();

    cy.login(userInfo);

    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.logout(userInfo.fullName);
  });

  it('should not log in', () => {
    cy.contains('Sign in').should('exist').click();

    cy.login({ ...userInfo, password: '12344444' });

    cy.wait('@login').its('response.statusCode').should('eq', 401);
  });
});

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
    cy.sanitizeDatabase({
      userName: userInfo.userName,
    });
    cy.register(userInfo);
    cy.waitForNetworkIdle('@register', 1000);
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

    cy.waitForNetworkIdle('@login', 1000);
    cy.logout(userInfo.fullName);
  });

  it('should not log in', () => {
    cy.contains('Sign in').should('exist').click();

    cy.login({ ...userInfo, password: '12344444' });

    cy.waitForNetworkIdle('@login', 1000);
    cy.location('pathname').should('eq', '/user/login');
  });
});

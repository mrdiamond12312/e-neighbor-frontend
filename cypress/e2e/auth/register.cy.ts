describe('register', () => {
  const userInfo = {
    willNavigate: false,
    email: 'testUserRegister@123.com',
    fullName: 'Testing User',
    password: '12345678',
    passwordConfirm: '12345678',
    userName: 'testUserRegister',
  };

  before(() => {
    cy.sanitizeDatabase({
      userName: userInfo.userName,
    });
  });

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

    cy.waitForNetworkIdle('@register', 1500);
    cy.location('pathname').should('not.eq', '/user/sign-up');
  });

  it('should not return 201', () => {
    cy.visit('/');
    cy.contains('Sign in').should('exist').click();
    cy.getButton('Register!').click();

    cy.register(userInfo);

    cy.waitForNetworkIdle('@register', 1500);
    cy.location('pathname').should('eq', '/user/sign-up');
  });
});

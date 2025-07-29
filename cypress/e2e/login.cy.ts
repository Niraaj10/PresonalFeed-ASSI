describe('Login Page', () => {
  it('should render the login page correctly', () => {
    cy.visit('/login');
    cy.contains('Sign in').should('be.visible');
    cy.get('button').contains('Sign in with Google').should('exist');
  });

  // Remove or skip this test unless you mock Google login
  it.skip('should initiate Google OAuth flow', () => {
    cy.visit('/login');
    cy.get('button').contains('Sign in with Google').click();
  });
});
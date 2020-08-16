describe('Main Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the main app header', () => {
    cy.get('.main-navbar').should('exist');
  });

  it('shows 404 for invalid routes', () => {
    cy.visit('/bla');

    cy.contains('404').should('exist');
  });
});

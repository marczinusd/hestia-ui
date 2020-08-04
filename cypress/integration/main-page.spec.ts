beforeEach(() => {
  cy.visit('/');
});

it('loads renders the dummy text', () => {
  cy.contains('hestia-ui app is running!');
});

it('renders the main app header', () => {
  cy.get('.main-navbar').should('exist');
});

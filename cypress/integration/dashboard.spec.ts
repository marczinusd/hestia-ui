beforeEach(() => {
  cy.visit('/dashboard');
});

it('shows snapshots header', () => {
  cy.contains('Your snapshots');
});

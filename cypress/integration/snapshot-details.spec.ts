beforeEach(() => {
  cy.visit('/snapshots/1');
});

it('loads the correct snapshot details', () => {
  cy.contains('snapshot-details for 1').should('exist');
});

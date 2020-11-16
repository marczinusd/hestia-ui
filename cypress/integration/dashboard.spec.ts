describe('Dashboard', () => {
  beforeEach(() => {
    cy.server();

    cy.fixture('snapshots.json').as('snapshots');
    cy.fixture('files.json').as('files');
    cy.fixture('file-details.json').as('file-details');

    cy.route('GET', '**/snapshots', '@snapshots');
    cy.route('GET', '**/snapshots/*/files', '@files');
    cy.route('GET', '**/files/*', '@file-details');

    cy.visit('/dashboard');
  });

  it('shows snapshots header', () => {
    cy.contains('Your snapshots');
    cy.get('mat-card').should('have.length', 15);
  });

  it('navigates to snapshot view if open is pressed on a snapshot', () => {
    cy.get('.mat-button').first().click();

    cy.url().should('include', '/snapshots');
  });

  it('clicking on main Hestia link navigates back to dashboard', () => {
    cy.get('.mat-button').first().click();
    cy.contains('Hestia').click();

    cy.url().should('include', '/dashboard');
  });

  it('renders the main app header', () => {
    cy.get('.main-navbar').should('exist');
  });
});

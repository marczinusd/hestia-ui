import { setupDefaultFixtures } from '../support/commands';

describe('Dashboard', () => {
  beforeEach(() => {
    setupDefaultFixtures();

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

  it('shows Hestia link that navigates back to dashboard', () => {
    cy.get('.mat-button').first().click();
    cy.contains('Hestia').click();

    cy.url().should('include', '/dashboard');
  });

  it('renders the main app header', () => {
    cy.get('.main-navbar').should('exist');
  });
});

/// <reference types="cypress"/>

describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/dashboard');

    cy.server();

    cy.route('GET', '/snapshots', 'fixture:snapshots.json');
    cy.route('GET', '/snapshots/*/files', 'fixture:files.json');
    cy.route('GET', '/files/*', 'fixture:file-details.json');
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

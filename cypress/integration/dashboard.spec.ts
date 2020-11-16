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
  });
});

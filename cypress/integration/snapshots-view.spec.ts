import { setupDefaultFixtures } from '../support/commands';

describe('Snapshots view', () => {
  beforeEach(() => {
    setupDefaultFixtures();

    cy.visit('/dashboard');
    cy.get('.mat-button').first().click();
  });

  it('renders the main app header', () => {
    cy.get('.main-navbar').should('exist');
  });

  it('shows 404 for invalid routes', () => {
    cy.visit('/bla');

    cy.contains('404').should('exist');
  });

  it('renders open file details button that navigates to details view', () => {
    cy.contains('Open file details').first().click();

    cy.get('ngx-monaco-editor').should('exist');
  });

  it('clicking on Charts navigates to chart view', () => {
    cy.contains('Charts').click();

    cy.contains('h1', 'Number of changes per file');
  });
});

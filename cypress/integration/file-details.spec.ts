import { setupDefaultFixtures } from '../support/commands';

describe('File details', () => {
  beforeEach(() => {
    setupDefaultFixtures();

    cy.visit('/dashboard');
    cy.get('.mat-button').first().click();
    cy.contains('Open file details').first().click();
  });

  it('renders monaco editor', () => {
    cy.get('ngx-monaco-editor').should('exist');
  });

  it('shows coverage text in the editor correctly', () => {
    cy.contains('// HC: -1 DA: 0 CC: 1');
  });
});

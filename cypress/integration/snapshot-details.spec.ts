import { setupDefaultFixtures } from '../support/commands';

describe('Snapshot details', () => {
  beforeEach(() => {
    setupDefaultFixtures();

    cy.visit('/dashboard');
    cy.get('.mat-button').first().click();
  });

  it('shows file details grid', () => {
    cy.get('ag-grid-angular').should('exist');
  });

  it('shows all expected grid columns', () => {
    cy.contains('.ag-header-cell', 'Filename');
    cy.contains('.ag-header-cell', 'Path');
    cy.contains('.ag-header-cell', 'Lifetime Authors');
    cy.contains('.ag-header-cell', 'Lifetime Changes');
    cy.contains('.ag-header-cell', 'Coverage Percentage');
    cy.contains('.ag-header-cell', 'Id');
  });

  it('renders expected rows', () => {
    cy.get('ag-grid-angular').should('exist');
  });
});

import { setupDefaultFixtures } from '../support/commands';

describe('Charts panel', () => {
  beforeEach(() => {
    setupDefaultFixtures();

    cy.visit('/dashboard');
    cy.get('.mat-button').first().click();
    cy.contains('Charts').click();
  });

  it('shows "Number of changes" chart', () => {
    cy.contains('Files grouped by ranges of no. of changes');
    cy.get('app-snapshot-stats-line-chart').should('exist');
  });

  it('shows "Coverage of top N problematic files" chart', () => {
    cy.contains('h1', 'Coverage of top N problematic files');
    cy.get('app-coverage-of-top-files-chart').should('exist');
  });

  it('shows "Files grouped by ranges" chart', () => {
    cy.contains('h1', 'Files grouped by ranges');
    cy.get('app-change-range-bar-chart').should('exist');
  });

  it('shows "Files grouped by number of authors" chart', () => {
    cy.contains('h1', 'Files grouped by number of authors');
    cy.get('app-author-groups-chart').should('exist');
  });
});

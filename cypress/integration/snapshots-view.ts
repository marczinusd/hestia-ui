describe('Snapshots View', () => {
  beforeEach(() => {
    cy.server();

    cy.fixture('snapshots.json').as('snapshots');
    cy.fixture('files.json').as('files');
    cy.fixture('file-details.json').as('file-details');

    cy.route('GET', '**/snapshots', '@snapshots');
    cy.route('GET', '**/snapshots/*/files', '@files');
    cy.route('GET', '**/files/*', '@file-details');

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

  it('renders open file details button that navigates to details view', () => {
    cy.contains('Open file details').first().click();

    cy.get('ngx-monaco-editor').should('exist');
  });

  it('files view renders text in the editor correctly', () => {
    cy.contains('Open file details').first().click();

    cy.contains('// HC: -1 DA: 0 CC: 1');
  });

  it('clicking on Charts navigates to chart view', () => {
    cy.contains('Charts').click();

    cy.contains('h1', 'Number of changes per file');
  });

  it('Charts view shows "Number of changes" chart', () => {
    cy.contains('Charts').click();

    cy.contains('Files grouped by ranges of no. of changes');
    cy.get('app-snapshot-stats-line-chart').should('exist');
  });

  it('Charts view shows "Coverage of top N problematic files" chart', () => {
    cy.contains('Charts').click();

    cy.contains('h1', 'Coverage of top N problematic files');
    cy.get('app-coverage-of-top-files-chart').should('exist');
  });

  it('Charts view shows "Files grouped by ranges" chart', () => {
    cy.contains('Charts').click();

    cy.contains('h1', 'Files grouped by ranges');
    cy.get('app-change-range-bar-chart').should('exist');
  });

  it('Charts view shows "Files grouped by number of authors" chart', () => {
    cy.contains('Charts').click();

    cy.contains('h1', 'Files grouped by number of authors');
    cy.get('app-author-groups-chart').should('exist');
  });
});

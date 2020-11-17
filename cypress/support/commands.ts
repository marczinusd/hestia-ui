// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
// @ts-check
Cypress.Commands.add('setupDefaultFixtures', () => {
  setupDefaultFixtures();
});

export const setupDefaultFixtures = () => {
  cy.server();

  cy.fixture('snapshots.json').as('snapshots');
  cy.fixture('files.json').as('files');
  cy.fixture('file-details.json').as('file-details');

  cy.route('GET', '**/snapshots', '@snapshots');
  cy.route('GET', '**/snapshots/*/files', '@files');
  cy.route('GET', '**/files/*', '@file-details');
};

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

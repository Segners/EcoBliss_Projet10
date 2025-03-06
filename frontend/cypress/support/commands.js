/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
const apiUrl = Cypress.env("apiUrl")
Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args)
  })

  Cypress.Commands.add('Connect', () => {
    const username= "test2@test.fr"
    const password= "testtest"
    cy.visit('localhost:8080/#//login');
    cy.getBySel('login-input-username').type(username);
    cy.getBySel('login-input-password').type(password);
    cy.getBySel('login-submit').click();
  });



  Cypress.Commands.add('getToken', () => {
    return cy.request({
      method: 'POST',
      url: '/login',
      body: {
        username: Cypress.env('username'),
        password: Cypress.env('password'),
      },
    }).then((response) => {
      return response.body.token;
    });
  });
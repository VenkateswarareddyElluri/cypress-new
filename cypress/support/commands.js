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
Cypress.Commands.add('login', (email, password) => {
    cy.get('.ico-login').click();
    cy.get('#Email').type(email);
    cy.get('#Password').type(password);
    cy.get('form > .buttons > .button-1').click();
  });
  Cypress.Commands.add('addProductToCart', (productName, addToCartButtonId) => {
    cy.get('#small-searchterms').type(`${productName}{enter}`);
    cy.get('.product-item > .picture > a > img').first().click(); // Clicks the first image element
    cy.get(addToCartButtonId).click();
  })   
  
  // Command to navigate to the cart
Cypress.Commands.add('navigateToCart', () => {
    cy.get("a[class='ico-cart'] span[class='cart-label']").click();
  });
  
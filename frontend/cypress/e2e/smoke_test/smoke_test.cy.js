const username = "test2@test.fr"
const password = "testtest"
 
describe('Smoke test', () => {

    it('Présence des champs et boutons de connexion', () => {
        cy.visit('http://localhost:8080/#/');
        cy.getBySel('nav-link-register').should('be.visible');
        cy.getBySel('nav-link-login').should('be.visible').click();
        cy.getBySel('login-input-username').should('be.visible');
        cy.getBySel('login-input-password').should('be.visible');
        cy.getBySel('login-submit').should('be.visible');
      });
      
      it('Présence des boutons d\'ajout au panier quand connecté et présence du champ de disponibilité du produit', () => {
        cy.visit('http://localhost:8080/#/login');
        cy.getBySel('login-input-username').type(username);
        cy.getBySel('login-input-password').type(password);
        cy.getBySel('login-submit').click();
        
        cy.visit('http://localhost:8080/#/products/3');
        cy.getBySel('detail-product-stock').should('be.visible');
        cy.getBySel('detail-product-price').should('be.visible');
        cy.getBySel('detail-product-quantity').should('be.visible');
        cy.getBySel('detail-product-add')
          .should('be.visible')
          .should('not.be.disabled'); // Anomalie, doit etre desactivé
      });
  });
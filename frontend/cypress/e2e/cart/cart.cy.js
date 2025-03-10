import { faker } from '@faker-js/faker'

const negativeNumber = faker.number.int({ 
  min: -10, 
  max: -1 
});

describe('Tests du panier', () => {
  beforeEach(() => {
      cy.Connect()
      cy.url().should('include', '/');
  })
  it('Doit ajouter un produit avec un stock valide dans le panier et mettre à jour le stock', () => {
      cy.getBySel('product-home-link').first().click();
    
      cy.url().then((productPage) => {
        cy.log(productPage);  
        cy.getBySel('detail-product-stock')
          .invoke('text')
          .should('match', /^(0|[1-9][0-9]*) en stock$/)
          .then((text) => {
            const stockText = text.trim();
            const stockNumber = parseInt(stockText.match(/\d+/));
            cy.log(`Stock initial: ${stockNumber}`);
            cy.getBySel('detail-product-add').click(); 
            cy.visit(productPage); 
            cy.reload();      
            const newStock = stockNumber - 1;
            cy.getBySel('detail-product-stock')
              .invoke('text')
              .should('match', new RegExp(`^${newStock} en stock$`));
          });
      });
      cy.visit('http://localhost:8080/#/cart')
      cy.getBySel('cart-line-delete').click({ multiple : true })
    });

  it('Ne doit pas changer le panier avec un nombre négatif', () => {
    cy.getBySel('product-home-link').first().click();
    cy.getBySel('detail-product-quantity').clear().type(negativeNumber);
    cy.getBySel('detail-product-add').click();
    cy.getBySel('detail-product-form').should('have.class', 'ng-invalid');
  });
  
 
  it('Ne devrait pas changer le panier avec un nombre 20+', () => {
    cy.getBySel('product-home-link').first().click()
    cy.getBySel('detail-product-quantity').clear().type(21)
    cy.getBySel('detail-product-add').click()
    cy.getBySel('detail-product-form').should('have.class', 'ng-invalid') // Erreur
  })
})
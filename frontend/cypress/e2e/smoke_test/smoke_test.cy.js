const username = "test2@test.fr"
const password = "testtest"

describe('Login Page', () => {
    it('should navigate to login page and verify elements of login page', () => {
        cy.visit("http://localhost:8080/#/login")
        cy.getBySel('login-input-username').should('exist')
        cy.getBySel('login-input-password').should('exist')
        cy.getBySel('login-submit').should('have.text', "Se connecter")
    })
})

describe('Cart for connected user', () => {
    before( () => {
        cy.visit('http://localhost:8080/#/login')
        cy.getBySel('login-input-username').type(username)
        cy.getBySel('login-input-password').type(password)
        cy.getBySel('login-submit').click()
        cy.visit('http://localhost:8080/#/')
    })
    it('should find an add to cart button on product page', () => {
        cy.contains("Voir les produits").click()
        cy.getBySel('product-home-link').first().click()
        cy.wait(1000)
        cy.getBySel('detail-product-add').click()
        cy.wait(1000)
        cy.location().should((loc) => {
            expect(loc.href).to.include('cart')
        } )
    })

    after( () => {
        cy.getBySel('cart-line-delete').click({ multiple : true})
        cy.getBySel('nav-link-logout').click()
        cy.visit('http://localhost:8080/#/')
    })
})

describe('Availability field', () => {
    it('should exist on product page and report a good number ', () => {
        cy.visit('http://localhost:8080/#/')
        cy.getBySel('product-home-link').first().click()
        cy.getBySel('detail-product-stock').invoke('text').should('match', /^(0|[1-9][0-9]*) en stock$/)
    })


})

describe('Smoke test', () => {

    it('Presence of connection fields and buttons', () => {
      cy.visit('http://localhost:8080/#/');
      cy.get('[data-cy="nav-link-register"]').should('be.visible');
      cy.get('[data-cy="nav-link-login"]').should('be.visible').click();
      cy.get('[data-cy="login-input-username"]').should('be.visible');
      cy.get('[data-cy="login-input-password"]').should('be.visible');
      cy.get('[data-cy="login-submit"]').should('be.visible');
    });
  
    it('Presence of add to cart buttons and product availability field', () => {
      cy.visit('http://localhost:8080/#/login');
      cy.get('[data-cy="login-input-username"]').type(username);
      cy.get('[data-cy="login-input-password"]').type(password);
      cy.get('[data-cy="login-submit"]').click();
      cy.visit('http://localhost:8080/#/products/3');
      cy.get('[data-cy="detail-product-stock"]').should('be.visible');
      cy.get('[data-cy="detail-product-price"]').should('be.visible');
      cy.get('[data-cy="detail-product-quantity"]').should('be.visible');
      cy.get('[data-cy="detail-product-add"]').should('be.visible').should('not.be.disabled');//anomaly - it should be disable 
    });
  });
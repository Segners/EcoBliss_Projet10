const username = "test2@test.fr"
const password = "testtest"

describe('Login and Logout', () => {
    it('Devrait connecter l\'utilisateur', () => {
        cy.visit('http://localhost:8080/#/login')
        cy.getBySel('login-input-username').type(username),
        cy.getBySel('login-input-password').type(password),
        cy.getBySel('login-submit').click()
        cy.getBySel('nav-link-cart').should('have.text', "Mon panier")
        cy.getBySel('nav-link-logout').should('exist')
    })

    it('Devrait déconnecter l\'utilisateur', () => {
        cy.Connect()
        cy.getBySel('nav-link-logout').click()
        cy.getBySel('nav-link-logout').should('not.exist')
    })
})
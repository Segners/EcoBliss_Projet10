
import { faker } from '@faker-js/faker'

describe('Inscription', () => {

    it('shouldnt register a user because he\'s already used', () => {
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type('Test3')
        cy.getBySel('register-input-firstname').type('T3')
        cy.getBySel('register-input-email').type('test3@test.test')
        cy.getBySel('register-input-password').type('testtest')
        cy.getBySel('register-input-password-confirm').type('testtest')
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
    })

}); 

describe('Inscription avec mail invalide', () => {
    it('Ne devrait pas enregistrer un utilisateur avec un mail sans @', () => {
        const password = faker.internet.password();
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-firstname').type(faker.person.firstName())
        cy.getBySel('register-input-email').type('emailinvalide.com')
        cy.getBySel('register-input-password').type(password)
        cy.getBySel('register-input-password-confirm').type(password)
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
    })

    it('Ne devrait pas enregistrer un utilisateur avec un e-mail sans domaine', () => {
        const password = faker.internet.password();
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-firstname').type(faker.person.firstName())
        cy.getBySel('register-input-email').type('email@invalide')
        cy.getBySel('register-input-password').type(password)
        cy.getBySel('register-input-password-confirm').type(password)
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
    })

    it('Ne devrait pas enregistrer un utilisateur avec un mail contenant un caractère spécial', () => {
        const password = faker.internet.password();
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-firstname').type(faker.person.firstName())
        cy.getBySel('register-input-email').type('email!invalide@example.com')
        cy.getBySel('register-input-password').type(password)
        cy.getBySel('register-input-password-confirm').type(password)
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
    })

    it('Ne devrait pas enregistrer un utilisateur avec un mail sans nom', () => {
        const password = faker.internet.password();
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-firstname').type(faker.person.firstName())
        cy.getBySel('register-input-email').type('@invalide.com')
        cy.getBySel('register-input-password').type(password)
        cy.getBySel('register-input-password-confirm').type(password)
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
    })

    it('Ne devrait pas s\'inscrire sans courrier', () => {
        const password = faker.internet.password();
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-firstname').type(faker.person.firstName())
        cy.getBySel('register-input-password').type(password)
        cy.getBySel('register-input-password-confirm').type(password)
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
        cy.contains('Email').invoke('attr', 'class').then((className) => {
            expect(className).to.include('error');
        })
    })
})

describe('Inscription avec mot de passe invalide', () => {
    it('shouldnt register because too short', () => {
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-firstname').type(faker.person.firstName())
        cy.getBySel('register-input-email').type(faker.internet.email())
        cy.getBySel('register-input-password').type("abc12")
        cy.getBySel('register-input-password-confirm').type("abc")
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
    })

    it('Ne devrait pas s\'inscrire sans mot de passe', () => {
        const password = faker.internet.password();
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-email').type(faker.internet.email())
        cy.getBySel('register-input-password-confirm').type(password)
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
        cy.contains('Mot de passe').invoke('attr', 'class').then((className) => {
            expect(className).to.include('error');
        })
    })

    it('Ne devrait pas s\'inscrire sans confirmation de mot de passe', () => {
        const password = faker.internet.password();
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-email').type(faker.internet.email())
        cy.getBySel('register-input-password').type(password)
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
        cy.contains('Confirmation de mot de passe').invoke('attr', 'class').then((className) => {
            expect(className).to.include('error');
        })
    })

    it('Ne doit pas s\'inscrire si le mot de passe et la confirmation du mot de passe ne sont pas identiques', () => {
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-firstname').type(faker.person.firstName())
        cy.getBySel('register-input-email').type(faker.internet.email())
        cy.getBySel('register-input-password').type("tests")
        cy.getBySel('register-input-password-confirm').type("testss")
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
    })
})

describe('Inscription sans prenom', () => {
    it('Ne devrais pas s\'inscrire', () => {
        const password = faker.internet.password();
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-lastname').type(faker.person.lastName())
        cy.getBySel('register-input-email').type(faker.internet.email())
        cy.getBySel('register-input-password').type(password)
        cy.getBySel('register-input-password-confirm').type(password)
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
        cy.contains('Prénom').invoke('attr', 'class').then((className) => {
            expect(className).to.include('error');
        })
    })
})

describe('Inscription sans nom', () => {
    const password = faker.internet.password();
    it('Ne devrais pas s\'inscrire', () => {
        cy.visit('http://localhost:8080/#/register')
        cy.getBySel('register-input-firstname').type(faker.person.firstName())
        cy.getBySel('register-input-email').type(faker.internet.email())
        cy.getBySel('register-input-password').type(password)
        cy.getBySel('register-input-password-confirm').type(password)
        cy.getBySel('register-submit').click()
        cy.getBySel('register-errors').should('exist')
        cy.contains('Nom').invoke('attr', 'class').then((className) => {
            expect(className).to.include('error');
        })
    })
})

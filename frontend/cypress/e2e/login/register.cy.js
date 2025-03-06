
import { faker } from '@faker-js/faker'

describe('registration for user', () => {

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

describe('registration with invalid mail', () => {
    it('shouldnt register a user with a mail without @', () => {
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

    it('shouldnt register a user with a mail without domain', () => {
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

    it('shouldnt register a user with a mail with special caract', () => {
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

    it('shouldnt register a user with a mail without name', () => {
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

    it('shouldnt register without mail', () => {
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

describe('registration with invalid password', () => {
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

    it('shouldnt register without password', () => {
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

    it('shouldnt register without password confirmation', () => {
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

    it('shouldnt register if password and password confirmation arent the same', () => {
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

describe('registration without firstname', () => {
    it('shouldnt register', () => {
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
});

describe('registration without lastname', () => {
    const password = faker.internet.password();
    it('shouldnt register', () => {
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
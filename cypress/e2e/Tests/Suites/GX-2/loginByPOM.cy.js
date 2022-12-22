const { login } = require('@pages/Login.Page')

describe('US Example | Test Page Object Model', () => {
    beforeEach(() => {
        cy.visit("https://demo.testim.io/")
        cy.contains("Log in").click()
        cy.url().should("contain","login")
    });
    it('test the login page', () => {
        login.enterUsername("UPEX")
        login.enterPassword("123456")
        login.submit()
    });
});
describe("SpaceBeyond | Log-In and Log-Out ", () => {
    beforeEach("Precondición: Estar situado en Interactions/selectable", () => {
        cy.visit("https://demo.testim.io/login" ,{failOnStatusCode: false})
        cy.url().should("contain","io")
        cy.clearCookies()
        cy.clearLocalStorage()      
    })
    it("GX-2132| TC1: Assert user logs in the website '(Happy-Path)'.", () => {
        cy.LogIn("Upex2132", "Upex123")
    })
    it("GX-2132| TC2: Assert user forgot to enters an username/password in the login.", () => {
        cy.Empty()       
    })
    it("GX-2132| TC3: Assert user Logout to the website.", () => {
        cy.Out()
    })
})

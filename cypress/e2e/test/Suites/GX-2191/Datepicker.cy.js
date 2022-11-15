describe("SpaceBeyond | DatePicker ", () => {
    beforeEach("Precondition: User have been logged in to the page", () => {
        cy.visit("https://demo.testim.io/login" ,{failOnStatusCode: false})
        cy.url().should("contain","io")
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.LogIn("Upex2132", "Upex123")    
    })
    it("TS 2192| TC1: Assert user searches destination by date of departure, return and type of passenger.'(Happy-Path)'.", () => {
        cy.destinationDD()
        cy.url().should("contain","destinations")
        cy.get('.Gallery__headline-1___2lHj5').should("have.text", "Your next destination")

    })
    it("TS 2192| TC2: Assert user search destination only by 'Departing' and 'Returning'.", () => {
        cy.destinationDD2()
        cy.url().should("contain","destinations")
        cy.get('.Gallery__headline-1___2lHj5').should("have.text", "Your next destination") 
    })
    it("TS 2192| TC3: Assert user searches destination only by number and type of passengers.", () => {
        cy.destinationDD3()
        cy.url().should("contain","destinations")
        cy.get('.Gallery__headline-2___3amRj').should("be.visible")    
    })
    it("TS 2192| TC4: Assert user search destination only by 'Departing' and 'Returning'.", () => {
        cy.destinationDD4()
        cy.get('[type="button"]').should("be.visible")
    })
})

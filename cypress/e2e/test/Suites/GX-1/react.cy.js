describe("Test React elements", () =>
{
    const react = cy.get("[data-react-toolbox='day']")
    beforeEach(() =>
    {
        cy.visit("https://demo.testim.io/")
    })
    it("Workflow", () =>
    {
        cy.React("date-picker","input")[ 0 ] // Date Picker Departing
            .click()
        
        cy.React("day").then((month) => {
            const randomDay = Math.floor(Math.random()) * month.length // Días del mes
            cy.React("day")[randomDay].click()
        })
    })
})
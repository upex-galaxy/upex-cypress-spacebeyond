describe("Test React elements", () =>
{
    let pickedDay
    beforeEach(() =>
    {
        cy.visit("https://demo.testim.io/")
    })
    it("Workflow", () =>
    {
        cy.ReactElement("date-picker", "input").eq(0) // Picker Department
            .click()
        
        cy.ReactHaveNotClass("day","disable").then((days) => {
            const randomDay = Math.floor(Math.random() * (days.length + 1) - 1)
            cy.log(randomDay) // Días del mes
            cy.ReactHaveNotClass("day", "disable").eq(randomDay).then((day) =>
            {
                pickedDay = day.text()
                cy.log(pickedDay)
                cy.wrap(day).click()
            })
        })
        cy.ReactElement("dialog").contains("Ok").click().then(() =>
        {
            cy.log(`Se eligió el día ${pickedDay}`)
        })

        cy.ReactElement("date-picker", "input").eq(1) // Returning Department
            .click()
        
        cy.ReactHaveNotClass("day","disable").then((days) => {
            const randomDay = Math.floor(Math.random() * (days.length + 1) - 1)
            cy.log(randomDay) // Días del mes
            cy.ReactHaveNotClass("day", "disable").eq(randomDay).then((day2) =>
            {
                pickedDay = day2.text()
                cy.log(pickedDay)
                cy.wrap(day2).click()
            })
        })
        cy.ReactElement("dialog").contains("Ok").click().then(() =>
        {
            cy.log(`Se eligió el día ${pickedDay}`)
        })
    })
})
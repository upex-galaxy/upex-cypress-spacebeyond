describe("Test React elements in DatePickers", () =>
{
    let pickedDay
    let pickedDay2
    beforeEach(() =>
    {
        cy.visit("https://demo.testim.io/")
    })
    it("Select random date for each Picker, department and returning", () =>
    {
        // 📅Picker Department:
        cy.ReactElement("date-picker", "input").eq(0) // Picker Department
            .click()
        cy.ReactHaveNotClass("day","disable").then((days) => {
            const randomDay = Math.floor(Math.random() * days.length) -1
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

        // Wait for Dialog be closed
        cy.wait(1000) // Ready to continue...

        // 📅Picker Returning
        cy.ReactElement("date-picker", "input").eq(1) // Picker Department
            .click()
        cy.ReactHaveNotClass("day","disable").then((days) => {
            const randomDay = Math.floor(Math.random() * days.length) -1
            cy.log(randomDay) // Días del mes
            cy.ReactHaveNotClass("day", "disable").eq(randomDay).then((day) =>
            {
                pickedDay2 = day.text()
                cy.log(pickedDay2)
                cy.wrap(day).click()
            })
        })
        cy.ReactElement("dialog").contains("Ok").click().then(() =>
        {
            cy.log(`Se eligió el día ${pickedDay}`)
        })
    })
})
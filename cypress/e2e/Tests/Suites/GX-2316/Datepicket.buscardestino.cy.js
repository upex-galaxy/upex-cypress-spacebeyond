describe("SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros", () =>
{
    beforeEach("Precondición: Usuario debe estar situado en el homepage", () =>
    {
        cy.visit("https://demo.testim.io/")
      //  cy.url().should("contain","LOG IN")
    })
    it("2316|TS 2317| TC01: Verificar que usuario pueda buscar destino solo por fecha valida de partida y retorno", () =>
    {
        cy.fixture("DOM/Datepicker/dataDatePicker.Page").then((the)=>{
            cy.get(the.DatePicker).eq(0).click() //Dp Departing
            cy.get(the.DatePickerOpen).should("be.visible")
            
            /* Seleeciona un dia */
            cy.get(the.DatePickerOpen).within((datePicker)=>{
                cy.get(the.DayVisible).then(($days)=>{
                    const list = $days.length - 1
                    const dayRandom = Math.floor(Math.random() * list)
                    cy.wrap($days).eq(dayRandom).then(($Day)=>{
                        const day = $Day.text()
                        cy.log(day)
                        cy.wrap($Day).click()
                    })
                })
                cy.contains("Ok").click()
            })
            cy.wait(1000)

            /* Seleeciona un Retorno */
            cy.get(the.DatePicker).eq(1).click() //Dp Returning
            /* Seleeciona un dia */
            cy.get(the.DatePickerOpen).within((datePicker)=>{
                cy.get(the.DayVisible).then(($days)=>{
                    const list = $days.length - 1
                    const dayRandom = Math.floor(Math.random() * list)
                    cy.wrap($days).eq(dayRandom).then(($Day)=>{
                        const day = $Day.text()
                        cy.log(day)
                        cy.wrap($Day).click()
                    })
                })
                cy.contains("Ok").click()
            })
            cy.get(the.ButtonSelectDest).eq(0).should('have.text','Select Destination')
            cy.get(the.ButtonSelectDest).eq(0).should("be.visible").click()
        })
    })
    it.only("2316| TS 2317 | TC02: Verificar que usuario pueda buscar destino por fecha valida de partida y retorno y tipo de pasajero Adulto y nino", () =>
    {
        cy.fixture("DOM/Datepicker/dataDatePicker.Page").then((the)=>{
            cy.get(the.DatePicker).eq(0).click() //Dp Departing
            cy.get(the.DatePickerOpen).should("be.visible")
            
            /* Seleeciona un dia */
            cy.get(the.DatePickerOpen).within((datePicker)=>{
                cy.get(the.DayVisible).then(($days)=>{
                    const list = $days.length - 1
                    const dayRandom = Math.floor(Math.random() * list)
                    cy.wrap($days).eq(dayRandom).then(($Day)=>{
                        const day = $Day.text()
                        cy.log(day)
                        cy.wrap($Day).click()
                    })
                })
                cy.contains("Ok").click()
            })
            cy.wait(1000)

            /* Seleeciona un Retorno */
            cy.get(the.DatePicker).eq(1).click() //Dp Returning
            /* Seleeciona un dia */
            cy.get(the.DatePickerOpen).within((datePicker)=>{
                cy.get(the.DayVisible).then(($days)=>{
                    const list = $days.length - 1
                    const dayRandom = Math.floor(Math.random() * list)
                    cy.wrap($days).eq(dayRandom).then(($Day)=>{
                        const day = $Day.text()
                        cy.log(day)
                        cy.wrap($Day).click()
                    })
                })
                cy.contains("Ok").click()
            })
            /* Seleccionar tipo de pasajero Adulto */
            cy.get(the.DPAdults).click()
            cy.contains("ul","Adults (18+)").within(()=>{
                cy.get("li").then(($cantA)=>{
                    const list = $cantA.length - 1
                    const cantARandom = Math.floor(Math.random() * list)
                    cy.wrap($cantA).eq(cantARandom).then(($Valor)=>{
                        const nro = $Valor.text()
                        cy.log(nro)
                        cy.wrap($Valor).click()
                    })
                })
            })

            /* Seleccionar tipo de pasajero Nino */
            cy.get(the.DPChildren).click()
            cy.contains("ul","Children (0-7)").within(()=>{
                cy.get("li").then(($cantA)=>{
                    const listC = $cantA.length - 1
                    const cantARandom = Math.floor(Math.random() * listC)
                    cy.wrap($cantA).eq(cantARandom).then(($Valor)=>{
                        const nro = $Valor.text()
                        cy.log(nro)
                        cy.wrap($Valor).click()
                    })
                })
            })
            cy.get(the.ButtonSelectDest).eq(0).should('have.text','Select Destination')
            cy.get(the.ButtonSelectDest).eq(0).should("be.visible").click()
        })
    })
})
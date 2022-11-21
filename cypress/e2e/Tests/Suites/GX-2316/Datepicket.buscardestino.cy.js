describe("SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros", () =>
{
    
    beforeEach("Precondición: Usuario debe estar situado en el homepage", () =>
    {
        cy.visit("https://demo.testim.io/")
      //  cy.url().should("contain","LOG IN")
    })
    it("2317| TC01: Verificar que usuario pueda buscar destino solo por fecha valida de partida y retorno", () =>
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
    it("2317 | TC02: Verificar que usuario pueda buscar destino por fecha valida de partida y retorno y tipo de pasajero Adulto y nino", () =>
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
    it("2317 | TC03: Verificar que usuario pueda buscar destino solo por tipo de pasajero Adulto y niño", () =>
    {
        cy.fixture("DOM/Datepicker/dataDatePicker.Page").then((the)=>{
            
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
    it("2317 | TC04: Verificar que usuario pueda buscar destino por misma fecha valida de partida y retorno", function()      
    {
        cy.fixture("DOM/Datepicker/dataDatePicker.Page").then((the)=>{
            cy.get(the.DatePicker).eq(0).click() //Dp Departing
            cy.get(the.DatePickerOpen).should("be.visible")
            
            /* Seleeciona un dia */
            cy.get(the.DatePickerOpen).within((datePicker)=>{
                cy.get(the.DayVisible).then(($days)=>{
                    const list = $days.length - 1
                    const dayRandom = Math.floor(Math.random() * list)
                    cy.wrap(dayRandom).as("SelectDia")
                    cy.wrap($days).eq(dayRandom).then(($Day)=>{
                        var day = $Day.text()
                        cy.log(day)
                        cy.wrap($Day).click()
                    })
                    cy.log(this.SelectDia)
                })
                cy.contains("Ok").click()
            })
            cy.wait(1000)
            cy.log(this.SelectDia)
                               /* Seleeciona un Retorno */
        //    cy.get(the.DatePicker).eq(1).click() //Dp Returning
            // /* Seleeciona un dia */
         //   cy.get(the.DatePickerOpen).within((datePicker)=>{
        //        cy.get(the.DayVisible).eq("SelectDia").click()
                     //         // cy.wrap($days).eq(dayRandom).then(($Day)=>{
            //         //    const day = $Day.text()
            //              cy.log(day)
            //             cy.wrap($Day).click()
            //         // })
            //     })
            //     cy.contains("Ok").click()
           //  })
            
            cy.get(the.ButtonSelectDest).eq(0).should('have.text','Select Destination')
            cy.get(the.ButtonSelectDest).eq(0).should("be.visible").click()
        })
    })
    it("2317 | TC05: Verificar que usuario pueda buscar destino solo con pasajeros ninos", () =>
    {
        cy.fixture("DOM/Datepicker/dataDatePicker.Page").then((the)=>{
           
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
            //El sitio web no permite buscar  destinos ,sin al menos un adulto 
            cy.get("[data-react-toolbox='input']").eq(2).children('input').should("have.attr","value",1)
            cy.get("[data-react-toolbox='input']").eq(2).children('input').should("have.attr","value","Adults (18+)")
        })
    })
    it("2317 | TC06: Verificar que usuario pueda buscar destino solo con pasajero adultos", () =>
    {
        cy.fixture("DOM/Datepicker/dataDatePicker.Page").then((the)=>{
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
            cy.get(the.ButtonSelectDest).eq(0).should('have.text','Select Destination')
            cy.get(the.ButtonSelectDest).eq(0).should("be.visible").click()
            //El sitio web no permite buscar  destinos ,sin al menos un adulto 
            //cy.get("[data-react-toolbox='input']").eq(2).children('input').should("have.attr","value",1)
            cy.get("[data-react-toolbox='input']").eq(2).children('input').should("not.have.attr","value","Adults (18+)")
        })
    })
    it("2317 | TC07: Verificar que usuario pueda buscar destino sin seleccionar tipos de pasajeros", () =>
    {
        cy.fixture("DOM/Datepicker/dataDatePicker.Page").then((the)=>{    
            cy.get(the.ButtonSelectDest).eq(0).should('have.text','Select Destination')
            cy.get(the.ButtonSelectDest).eq(0).should("be.visible").click()
            cy.get("[data-react-toolbox='input']").eq(3).children('input').should("have.attr","value","Children (0-7)")
            cy.get("[data-react-toolbox='input']").eq(2).children('input').should("have.attr","value","Adults (18+)")
            
        })
    })
    it("2317 | TC08: Verificar que usuario pueda buscar destino con fecha de partida invalida", () =>
    {

    })
    it("2317 | TC09: Verificar que usuario pueda buscar destino con fecha de retorno invalida", () =>
    {
    })
    it.only("2317 | TC10: Verificar que usuario pueda buscar destino solo por fecha valida de partida", () =>
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

            cy.get(the.ButtonSelectDest).eq(0).should('have.text','Select Destination')
            cy.get(the.ButtonSelectDest).eq(0).should("be.visible").click()
            cy.get("[data-react-toolbox='input']").eq(3).children('input').should("have.attr","value","Children (0-7)")
            cy.get("[data-react-toolbox='input']").eq(2).children('input').should("have.attr","value","Adults (18+)")
        })
    })
    it.only("2317 | TC11: Verificar que usuario pueda buscar destino solo por fecha valida retorno", () =>
    {
        cy.fixture("DOM/Datepicker/dataDatePicker.Page").then((the)=>{
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
            cy.get("[data-react-toolbox='input']").eq(3).children('input').should("have.attr","value","Children (0-7)")
            cy.get("[data-react-toolbox='input']").eq(2).children('input').should("have.attr","value","Adults (18+)")
        })
    })
    
})
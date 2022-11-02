describe("SpaceBeyond | Log-In and Log-Out ", () => {
    beforeEach("Precondición: Estar situado en Interactions/selectable", () => {
        cy.visit("https://demo.testim.io/login" ,{failOnStatusCode: false})
        cy.url().should("contain","io")
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.LogIn("Upex2132", "Upex123")    
    })
    it("GX-2132| TC1: Assert user logs in the website '(Happy-Path)'.", () => {
        cy.get(':nth-child(1) > [data-react-toolbox="date-picker"] > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
        cy.get("#right").click()
        cy.get('.theme__day___3cb3g')
            .each(($el,index,$list)=>{
                let dateName = $el.text()
                if(dateName=='31')
                {
                    cy.wrap($el).click()
                } 
            })
            cy.get('.theme__navigation___3eiS- > :nth-child(2)').click({force: true })
            cy.get('.Hero__form-box___126DY > :nth-child(3) > .theme__input___qUQeP').click()
            cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click()
            cy.get(':nth-child(4) > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
            cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(3)').click({force: true})    
        cy.get(':nth-child(2) > [data-react-toolbox="date-picker"] > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
        cy.get('.theme__day___3cb3g')
            .each(($el,index,$list)=>{
                let dateName1 = $el.text()
                if(dateName1=='6')
                {
                    cy.wrap($el).click({ waitForAnimations: false })
                } 
            })
            cy.get('.theme__navigation___3eiS- > :nth-child(2)').click({force: true })   
            cy.get('.Hero__hero___1FDXn > :nth-child(4) > .theme__button___1iKuo').click() 
    })
    it("GX-2132| TC2: Assert user search destination only by 'Departing' and 'Returning'.", () => {
        
        cy.get(':nth-child(1) > [data-react-toolbox="date-picker"] > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
        cy.get("#right").click()
        cy.get('.theme__day___3cb3g')
            .each(($el,index,$list)=>{
                let dateName = $el.text()
                if(dateName=='31')
                {
                    cy.wrap($el).click()
                } 
            })
            cy.get('.theme__navigation___3eiS- > :nth-child(2)').click({force: true })   
            cy.get('.Hero__hero___1FDXn > :nth-child(4) > .theme__button___1iKuo').click() 
    })
    it("GX-2132| TC3: Assert user searches destination only by number and type of passengers.", () => {
        cy.get('.Hero__form-box___126DY > :nth-child(3) > .theme__input___qUQeP').click()
            cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click()
            cy.get(':nth-child(4) > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
            cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(3)').click({force: true})
            cy.get('.Hero__hero___1FDXn > :nth-child(4) > .theme__button___1iKuo').click()    
    })
    it("GX-2132| TC4: Assert user search destination only by 'Departing' and 'Returning'.", () => {
        cy.get(':nth-child(1) > [data-react-toolbox="date-picker"] > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
        cy.get("#right").click()
        cy.get('.theme__day___3cb3g')
            .each(($el,index,$list)=>{
                let dateName = $el.text()
                if(dateName=='31')
                {
                    cy.wrap($el)
                } 
            })
            cy.get('.theme__navigation___3eiS- > :nth-child(2)').click({force: true })
            cy.get('.Hero__form-box___126DY > :nth-child(3) > .theme__input___qUQeP').click()
            cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click()
            cy.get(':nth-child(4) > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
            cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(3)').click({force: true})    
        cy.get(':nth-child(2) > [data-react-toolbox="date-picker"] > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
        cy.get("#left").click()
        cy.get('.theme__day___3cb3g')
            .each(($el,index,$list)=>{
                let dateName1 = $el.text()
                if(dateName1=='31')
                {
                    cy.wrap($el)
                } 
            })
            cy.get('.theme__navigation___3eiS- > :nth-child(2)').click({force: true })   
            cy.get('.Hero__hero___1FDXn > :nth-child(4) > .theme__button___1iKuo').click()     
    
        // cy.get('.Hero__form-box___126DY > :nth-child(3) > .theme__input___qUQeP').click()
        //     cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click()
        //     cy.get(':nth-child(4) > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
        //     cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(3)').click({force: true})
        //     cy.get('.Hero__hero___1FDXn > :nth-child(4) > .theme__button___1iKuo').click()    
    })
})

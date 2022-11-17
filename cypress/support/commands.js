// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import 'cypress-file-upload'
require('@4tw/cypress-drag-drop')

// 👾🚩🚩🚩NO ESCRIBAS UN NUEVO COMANDO EN ESTA LINEA, DIRÍGETE HASTA LA ÚLTIMA LINEA DISPONIBLE👇🏻👇🏻👇🏻✅

Cypress.Commands.add('ReactElement', (element, $tag) => {
	// Command para buscar elemento de React por primer parent y child.
	if ($tag !== undefined) {
		cy.get(`[data-react-toolbox='${element}']` + ` ${$tag}`)
	} else {
		cy.get(`[data-react-toolbox='${element}']`)
	}
})
Cypress.Commands.add('ReactHaveClass', (element, $class) => {
	// Command para buscar elemento de React que CONTENGA DICHA CLASE
	cy.get(`[data-react-toolbox='${element}'][class*='${$class}']`)
})
Cypress.Commands.add('ReactHaveNotClass', (element, $class) => {
	// Command para buscar elemento de React que NO CONTENTA DICHA CLASE
	cy.get(`[data-react-toolbox='${element}']:not([class*='${$class}'])`)
})
// Command para SpaiceBeyond 
// Command para iniciar sección exitosamente (SpaiceBeyond).
Cypress.Commands.add("LogIn", () => {
    cy.fixture("DOM/SpaceBeyond/LogInOut").then((the) => {
        cy.get(the.username.input)
            .type(the.username.data.valid)
        cy.get(the.password.input)
            .type(the.password.data.valid)
        cy.get(the.LoginButton.In)
            .click()
        cy.get(the.LoginButton.LogOut).should("be.visible")                          
    })
} )
// Command para campos de inicio de sección vacío.
Cypress.Commands.add("Empty", () => {
    cy.fixture("DOM/SpaceBeyond/LogInOut").then((the) => {
        cy.get(the.LoginButton.In)
            .click()
            .should("have.css", "color", "rgb(255, 255, 255)")
            cy.contains("Name is a required field.").should("be.visible")
            cy.contains("Password is a required field.").should("be.visible")                             
    })
} )
// Command para LogOut exitoso.
Cypress.Commands.add("Out", (username, password) => {
    cy.fixture("DOM/SpaceBeyond/LogInOut").then((the) => {
        cy.get(the.username.input)
            .type(the.username.data.valid)
        cy.get(the.password.input)
            .type(the.password.data.valid)
        cy.get(the.LoginButton.In)
            .click()
        cy.get(the.LoginButton.LogOut).should("be.visible")
        cy.get('.mui-btn > :nth-child(1)').click()
        cy.get('li > a').click()
        cy.contains("Log in").should("be.visible")                        
    })
} )
Cypress.Commands.add("destinationDD", ()=> {
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
Cypress.Commands.add("destinationDD2", ()=> {
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
Cypress.Commands.add("destinationDD3", ()=> {
	cy.get('.Hero__form-box___126DY > :nth-child(3) > .theme__input___qUQeP').click()
            cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click()
            cy.get(':nth-child(4) > .theme__input___qUQeP > .theme__inputElement___27dyY').click()
            cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(3)').click({force: true})
            cy.get('.Hero__hero___1FDXn > :nth-child(4) > .theme__button___1iKuo').click()
})
Cypress.Commands.add("destinationDD4", ()=> {
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
    cy.get("#left").click()
    cy.get('.theme__day___3cb3g')
        .each(($el,index,$list)=>{
            let dateName1 = $el.text()
            if(dateName1=='31')
            {
                cy.wrap($el).click({ waitForAnimations: false })
            } 
        })
        cy.get('.theme__navigation___3eiS- > :nth-child(2)').click({force: true })   
        cy.get('.Hero__hero___1FDXn > :nth-child(4) > .theme__button___1iKuo').click() 
})


// 👾🚩🚩🚩☝🏻☝🏻☝🏻COMIENZA A ESCRIBIR TU NUEVO COMMAND AQUÍ! A PARTIR DE ESTA LÍNEA DISPONIBLE☝🏻☝🏻☝🏻✅

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
	cy.fixture('DOM/Account/LoginLogout.Page').then((the) => {
		username && cy.get(the.username.input).type(username)
		password && cy.get(the.password.input).type(password)
		cy.get(the.button.input).click()
	})
})

Cypress.Commands.add('logout', () => {
	cy.fixture('DOM/Account/LoginLogout.Page').then((the) => {
		cy.get(the.buttonDropDownList).click()
		cy.get(the.buttonLogout).click()
	})
})

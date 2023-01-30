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
import 'cypress-wait-until'
import '@4tw/cypress-drag-drop'
import 'cypress-downloadfile/lib/downloadFileCommand'
import {login} from '@pages/Login.Page'
const {authLogin, dashboardIndex} = Cypress.env('endpoint')
import {signin} from '@pages/SignIn.Page.js'

// Cypress.add.Commands("Departing",()=>{
//     cy.get("[data-react-toolbox='date-picker'] input").eq(0).click() // Open Departing: // LISTO
// 		//Select Random Date enabled for this month
// 		cy.get("[data-react-toolbox='dialog']").within((datePicker) => {
// 			cy.get('[data-react-toolbox="day"]:not([class*=disable]):not([class*=active])').then((days) => {
// 				cy.log(days)
// 				if (!expect(days.length).be.greaterThan(0)) {
// 					cy.log('🚩IF days !>=1 => Workaround is Executed')
// 					// Workaround:
// 					cy.get('[data-react-toolbox="day"]').then(($days) => {
// 						const list = $days.length - 1
// 						const dayRandom = Math.floor(Math.random() * list)
// 						cy.get('#right').click()
// 						cy.wrap($days)
// 							.eq(dayRandom)
// 							.then(($Day) => {
// 								const day = $Day.text()
// 								cy.log(day)
// 								cy.wrap($Day).click()
// 							})
// 					})
// 				} else {
// 					// Normal Step:
// 					cy.log('🚩ELSE: days >=1 => Normal Test Path is Executed')
// 					const list = days.length - 1
// 					const dayRandom = Math.floor(Math.random() * list)
// 					cy.wrap(days)
// 						.eq(dayRandom)
// 						.then(($Day) => {
// 							const day = $Day.text()
// 							cy.log(day)
// 							cy.wrap($Day).click()
// 						})
// 				}
// 			})
// 			//Click en On dentro del Departing
// 			cy.get("[data-react-toolbox='button']").contains('Ok').click()
// 		}) // FIN DEL DEPARTING (WITHIN)
// 		cy.wait(400)
// 		cy.get("[data-react-toolbox='date-picker'] input")
// 			.eq(0)
// 			.its('val')
// 			.then((val) => {
// 				Cypress.env('DepartingDate', val)
// 				cy.log(val)
// 			})
// })
// Cypress.add.Commands("Returning",()=>{
//     // Second Datepicker:
// 		cy.get("[data-react-toolbox='date-picker'] input").eq(1).click() // Open Returning:
// 		cy.get("[data-react-toolbox='dialog']")
// 			.first()
// 			.within((datePicker) => {
// 				cy.get('[data-react-toolbox="day"]:not([class*=disable]):not([class*=active])').then((days) => {
// 					cy.log(days)
// 					if (!expect(days.length).be.greaterThan(0)) {
// 						cy.log('🚩IF days !>=1 => Workaround is Executed')
// 						// Workaround:
// 						cy.get('[data-react-toolbox="day"]').then(($days) => {
// 							const list = $days.length - 1
// 							const returnRandom = Math.floor(Math.random() * list)
// 							cy.get('#right').click()
// 							cy.wrap($days)
// 								.eq(returnRandom)
// 								.then(($Day) => {
// 									const day = $Day.text()
// 									cy.log(day)
// 									cy.wrap($Day).click()
// 								})
// 						})
// 					} else {
// 						// Normal Step:
// 						cy.log('🚩ELSE: days >=1 => Normal Test Path is Executed')
// 						const list = days.length - 1
// 						const dayRandom = Math.floor(Math.random() * list)
// 						cy.wrap(days)
// 							.eq(dayRandom)
// 							.then(($Day) => {
// 								const day = $Day.text()
// 								cy.log(day)
// 								cy.wrap($Day).click()
// 							})
// 					}
// 				})
// 				//Click en botón Ok del Date picker
// 				cy.get("[data-react-toolbox='button']").contains('Ok').click()
// 			}) //WITHIN RETURNING
// 		cy.wait(400)
// 		cy.get("[data-react-toolbox='date-picker'] input")
// 			.eq(1)
// 			.its('val')
// 			.then((val) => {
// 				Cypress.env('ReturningDate', val)
// 				cy.log(val)
// 			})
// })
// Cypress.add.Commands("Adults",()=>{
//     cy.get('[data-react-toolbox="dropdown"]').first().click() // Open Dropdown
// 		//Select Random Age for Adult person
// 		cy.get("ul[class*='WhiteDropDown']")
// 			.first()
// 			.children()
// 			.then(($options) => {
// 				cy.log($options)
// 				const adults = $options.length - 1
// 				const randomAge = Math.floor(Math.random() * adults + 1)
// 				Cypress.env('AdultsQty', randomAge)
// 				cy.log(randomAge)
// 				cy.log(adults)
// 				cy.wrap($options)
// 					.eq(randomAge)
// 					.then(($age) => {
// 						cy.wrap($age).click({ force: true })
// 						cy.get('[data-react-toolbox="dropdown"] input').first().should('have.value', randomAge)
// 					})
//         })
// })
// Cypress.add.Commands("Children",()=>{
//     // Select cant for children
//     cy.get('[data-react-toolbox="dropdown"]').eq(1).click() // Open Dropdown
//     //Select Random Age for Children person
//     cy.get("ul[class*='WhiteDropDown']")
//         .last()
//         .children()
//         .then(($options) => {
//             cy.log($options)
//             const children = $options.length - 1
//             const childrenCount = Math.floor(Math.random() * children + 1)
//             Cypress.env('childrenQty', childrenCount)
//             cy.log(childrenCount)
//             cy.log(children)
//             cy.wrap($options)
//                 .eq(childrenCount)
//                 .then(($age) => {
//                     cy.wrap($age).click({ force: true })
//                     cy.get('[data-react-toolbox="dropdown"] input').eq(1).should('have.value', childrenCount)
//                 })
//         })
// })
// Cypress.add.Commands("SEARCH",()=>{
//     cy.get('[class*="CTAButton"]')
// 		.first()
// 		.click()
// })



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

Cypress.Commands.add('Login',(username,password)=>{
    cy.session('login',()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php")
        cy.url().should("contain", authLogin)
        username && login.enterUsername(username)
        password && login.enterPassword(password)
        login.submitLogin()

        cy.url().should("contain", dashboardIndex)
        
    })
})


Cypress.Commands.add('SignIn', ()=>{
    const { username, password } = Cypress.env('user')
    const { signUp } = Cypress.env('endpoint')
    cy.session('signIn',()=>{
        cy.visit(signUp)
        signin.goToLoginTab()
        signin.enterUsername(username)
        signin.enterPassword(password)
        signin.submitLogin()
    })
})
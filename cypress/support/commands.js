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
import { LogInLogOutPage } from '@pages/GX3-4775-Account-login-and-logout.Page'
//Login SpaceBeyond
Cypress.Commands.add('loginSpace', (username, password) => {

	cy.fixture('DOM/space/Login.Page').then((the) => {

		username && cy.get(the.username.input).type(username)
		password && cy.get(the.password.input).type(password)
		cy.get(the.loginButton).click()
	})
})


Cypress.Commands.add('login', (username, password) => {
	LogInLogOutPage.typeUserName(username)
	LogInLogOutPage.typePassword(password)
	LogInLogOutPage.ClickLogIn()
})

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

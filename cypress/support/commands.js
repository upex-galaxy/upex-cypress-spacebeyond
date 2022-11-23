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



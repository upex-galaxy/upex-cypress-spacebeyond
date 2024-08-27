import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { loginSpace } from '@pages/LoginSpace.Page'
import { removeLogs } from '@helper/RemoveLogs'
import { faker } from '@faker-js/faker'
const usernameTC3 = faker.name.firstName()
const passwordTC3 = faker.internet.password()
const data = require('../../../fixtures/data/LoginSpace.json')
removeLogs()
context('SpaceBeyond | Account | Log-In and Log-Out', () => {
	describe('Precondiciones para iniciar sesión', () => {
		Given('el usuario está en la página de inicio de sesión', () => {
			cy.visit('/login', { failOnStatusCode: false })
			cy.url().should('equal', data.LoginEndpoint)
		})
	})
	describe('4844 | TC1: Validar iniciar sesión con datos válidos', () => {
		When('el usuario ingresa un nombre de usuario as {string} y una contraseña as {string} existentes en el formulario', (username, password) => {
			loginSpace.TypeUsernameAndPassword(username, password)
			loginSpace.get.usernameInput().should('have.value', username)
			loginSpace.get.passwordInput().should('have.value', password)
		})
		When('hace clic en el botón "Log In"', () => {
			loginSpace.ClickLoginButton()
		})

		Then('el usuario debe iniciar sesión y moverse a la página de inicio', () => {
			cy.url().should('contain', data.HomeURL)
		})

		Then('el enlace de inicio de sesión de la barra de navegación debe mostrar {string} como bienvenida', (mensaje) => {
			loginSpace.GetLogoutText().then((msj) => {
				expect(msj).to.include(mensaje)
			})
		})
	})

	// describe('4844 | TC2: Validar NO iniciar sesión con datos inválidos', () => {
	// 	When('el usuario olvidó insertar un nombre de usuario as {string} contraseña as {string}', (username, password) => {
	// 		loginSpace.TypeUsernameAndPassword(username, password)
	// 		loginSpace.get.usernameInput().should('have.value', username)
	// 		loginSpace.get.passwordInput().should('have.value', password)
	// 	})
	// 	And('usuario hace clic en el botón "Log In"', () => {
	// 		loginSpace.ClickLoginButton()
	// 	})

	// 	Then(
	// 		'se debe mostrar un mensaje de registro debajo de la entrada correspondiente como: {string} en caso de nombre de usuario as {string} vacío {string} en caso de contraseña as {string} vacía',
	// 		(mensaje, username) => {
	// 			cy.url().should('eq', data.LoginEndpoint)

	// 			loginSpace.get
	// 				.passwordInput()
	// 				.invoke('val')
	// 				.then((passwd) => {
	// 					if (passwd === '' && username === '') {
	// 						loginSpace.GetMsjUsernameError().should('contain', mensaje)
	// 					} else if (passwd === '') {
	// 						loginSpace.GetMsjPasswordError().should('contain', mensaje)
	// 					} else if (passwd === 'a' || passwd === 'ad' || passwd === 'adm' || passwd === 'admi') {
	// 						loginSpace.GetMsjPasswordError().should('contain', mensaje)
	// 					} else if (username === 'A' || username === 'Ad') {
	// 						loginSpace.GetMsjUsernameError().should('contain', mensaje)
	// 					}
	// 				})
	// 		}
	// 	)

	// 	And('el usuario no debe poder iniciar sesión', () => {
	// 		cy.url().should('not.eq', data.HomeURL)
	// 	})
	// })

	describe('4844 | TC3: Validar cerrar sesión exitosamente', () => {
		Given('el usuario ya ha iniciado sesión', () => {
			loginSpace.TypeUsernameAndPassword(usernameTC3, passwordTC3)
			loginSpace.get.usernameInput().should('have.value', usernameTC3)
			loginSpace.get.passwordInput().should('have.value', passwordTC3)
			loginSpace.ClickLoginButton()
			cy.url().should('equal', data.HomeURL)
		})

		When('el usuario hace clic en el botón "Log out"', () => {
			loginSpace.ClickLogoutButton()
		})

		Then('el usuario debe ser desconectado de la sesión inmediatamente', () => {
			loginSpace.GetLoginText().then((Text) => {
				expect(Text).to.contain(data.LoginTxt)
			})
		})
	})
})

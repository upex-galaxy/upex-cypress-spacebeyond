import {faker} from '@faker-js/faker'

describe('SpaceBeyond | Account | Login and Logout', () => {
	let the
	const data = faker.internet

	before('Inicializar la data', () => {
		cy.fixture('DOM/Account/LoginLogout.Page').then((data) => {
			the = data
		})
	})

	beforeEach('Precondición: Usuario debe estar situado en el Login page', () => {
		cy.visit('https://demo.testim.io/')
		cy.contains('Log in').click()
		cy.url().should('contain', 'login')
	})

	it('2293 | TC1: Validar poder iniciar sesión correctamente cuándo todos los campos son válidos', () => {
		cy.login(data.userName().substring(0, 3), data.password(5))
		cy.url().should('eq', 'https://demo.testim.io/')
	})

	it('2293 | TC2: Validar poder cerrar sesión correctamente después de haber iniciado sesión', () => {
		cy.login(data.userName().substring(0, 3), data.password(6))
		cy.logout()
		cy.contains('Log in').should('be.visible')
	})

	it('2293 | TC3: Validar NO poder iniciar sesión correctamente cuándo todos los campos son vacíos', () => {
		cy.login()
		cy.contains(the.username.invalid).should('be.visible')
		cy.contains(the.password.invalid).should('be.visible')
	})

	it('2293 | TC4: Validar NO poder iniciar sesión correctamente cuándo el campo "Username" contiene 2 caracteres', () => {
		cy.login(data.userName().substring(0, 2), data.password(7))
		cy.contains(the.username.invalid).should('be.visible')
	})

	// Este TC está fallando por el defecto ..., mientras tanto estará fuera de scope.
	it.skip('2293 | TC5: Validar NO poder iniciar sesión correctamente cuándo el campo "Password" contiene 4 caracteres', () => {
		cy.login(data.userName().substring(0, 7), data.password(4))
		cy.url().should('not.eq', 'https://demo.testim.io/')
	})

	it('2293 | TC6: Validar poder iniciar sesión correctamente cuándo el campo "Password" contiene 30 caracteres', () => {
		cy.login(data.userName().substring(0, 5), data.password(30))
		cy.url().should('eq', 'https://demo.testim.io/')
	})

	// Este TC está fallando por el defecto ..., mientras tanto estará fuera de scope.
	it.skip('2293 | TC7: Validar NO poder iniciar sesión correctamente cuándo el campo "Password" contiene 31 caracteres', () => {
		cy.login(data.userName().substring(0, 6), data.password(31))
		cy.url().should('not.eq', 'https://demo.testim.io/')
	})
})

// Comando predeterminado para que no ocurran errores de excepciones:
Cypress.on('uncaught:exception', (err, runnable) => {
	// Returning false here prevents Cypress from.
	// Failing the test.
	return false
})

// Comando predeterminado para que no aparezcan los Fetch en el log del Test Runner:
const origLog = Cypress.log

Cypress.log = function (opts, ...other) {
	if (opts.displayName === 'xhr' || (opts.displayName === 'fetch' && opts.url.startsWith('https://'))) {
		return
	}

	return origLog(opts, ...other)
}

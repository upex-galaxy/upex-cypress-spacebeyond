import { faker } from '@faker-js/faker'
import { destinationPage } from '@pages/GX3-4839-destinationPage'
import { LogInLogOutPage } from '@pages/GX3-4775-Account-login-and-logout.Page'

const userName = 'Prueba2'
const password = 'prueba.234'
//segundo  formulario
const inputName = faker.name.firstName()
const inputEmail = faker.internet.email()
const inputPhone = faker.phone.number('##########')
const inputSocialSecurity = faker.phone.number('###-##-####')

describe('GX3-4839 | SpaceBeyond | Booking | Book a Destination in Checkout', () => {
	beforeEach('PRC: El usuario debe estar situado en la pagina Log In de Space-Beyond', () => {
		cy.visit('https://demo.testim.io/')
		cy.contains('Button', 'Log in').click()
		cy.url().should('include', 'login')
		LogInLogOutPage.typeUserName(userName)
		LogInLogOutPage.typePassword(password)
		LogInLogOutPage.ClickLogIn()
	})
	it.skip('4844 | TC1: Validar que se realizo el registro de pago correctamente', () => {
		//No se habilita el Boton de Pay Now y no puede finalizar  el flujo de Checkout
		destinationPage.selectRandomDestino().then((precio) => {
			destinationPage.get
				.labelPriceCheckout()
				.invoke('text')
				.then((prechec) => {
					const preciocheck = prechec.replace(',', '')
					expect(precio).to.equal(preciocheck)
				})
		})
		cy.url().should('include', 'checkout')

		destinationPage.typeName(inputName)
		destinationPage.typEmail(inputEmail)
		destinationPage.typePhone(inputPhone)
		destinationPage.typeSocialSecurity(inputSocialSecurity)
		destinationPage.clickSubmit()
		destinationPage.checkTerms()
		destinationPage.clickPay()
	})

	it('4844 | TC2: Validar que no se registe el pago cuando el campo “Email” no cumpla con el formato.', () => {
		destinationPage.selectRandomDestino()
		cy.url().should('include', 'checkout')
		destinationPage.typeName(inputName)
		destinationPage.typEmail('puma')
		destinationPage.typePhone(inputPhone)
		destinationPage.typeSocialSecurity(inputSocialSecurity)
		destinationPage.clickSubmit()
		destinationPage.checkTerms()
		cy.contains('Enter a valid e-mail address.').should('be.visible')
	})

	it('4844 | TC3: Validar que no se registe el pago cuando el campo “Seguridad Social” no tenga el formato XXX-XX-XXXXX.', () => {
		destinationPage.selectRandomDestino()
		cy.url().should('include', 'checkout')
		destinationPage.typeName(inputName)
		destinationPage.typEmail(inputEmail)
		destinationPage.typePhone(inputPhone)
		destinationPage.typeSocialSecurity('4567')
		destinationPage.clickSubmit()
		destinationPage.checkTerms()
		cy.contains('Enter a valid Social Security number (xxx-xx-xxxx).').should('be.visible')
	})

	it('4844 | TC4: Validar que no se registe el pago cuando el campo “Teléfono” no tenga el formato.', () => {
		destinationPage.selectRandomDestino()
		cy.url().should('include', 'checkout')
		destinationPage.typeName(inputName)
		destinationPage.typEmail(inputEmail)
		destinationPage.typePhone('456u')
		destinationPage.typeSocialSecurity(inputSocialSecurity)
		destinationPage.clickSubmit()
		destinationPage.checkTerms()
		cy.contains('Enter a valid 419 phone number.').should('be.visible')
	})
})

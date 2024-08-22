import { faker } from '@faker-js/faker'
import { destinationPage } from '@pages/GX3-4839-destinationPage'

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
	})
	it('4844 | Validar el registro de pago exitoso cuando los datos sean ingresado correctamente', () => {
		destinationPage.typeUserName(userName)
		destinationPage.typePassword(password)
		destinationPage.clickLogIn()
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
	})
})

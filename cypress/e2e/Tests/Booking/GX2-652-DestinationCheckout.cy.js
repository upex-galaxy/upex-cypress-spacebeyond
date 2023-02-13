const { checkoutPage } = require('@pages/Checkout.Page')
const { homepage } = require('@pages/Home.page')
const { login } = require('@pages/Login.Page')
const { RMloginpage } = require('@pages/RMLogin.page')

describe('US-GX2-652: SpaceBeyond | Booking | Book a Destination in Checkout', () => {
	let the
	beforeEach('Predondicion: El usuario inicia sesion, elige un destino y se encuentra en la pagina de Checkout', () => {
		cy.fixture('data/Booking').then((data) => {
			the = data

			homepage.visit()
			homepage.elements.loginBtn().click()
			RMloginpage.typeUsername(the.username)
			RMloginpage.typePassword(the.password)
			RMloginpage.elements.logInBtn().click()
			homepage.elements.loadMoreBtn().click()
			homepage.chooseRandomDestination()
			checkoutPage.elements.checkoutText().should('be.visible').and('have.text', the.checkoutTitle)
		})
	})

	it('TS-GX2-653 | TC1: Realizar checkout de destino exitoso (Positivo)', () => {
		checkoutPage.typeName(the.name)
		checkoutPage.typeEmail(the.email)
		checkoutPage.typeSocialSecurityNumber(the.socialSecurityNumber)
		checkoutPage.typePhoneNumber(the.phoneNumber)
		checkoutPage.elements.payNowBtn().should('not.be.enabled')
		checkoutPage.elements.termAndConditionsCheckbox().click().should('have.class', the.checkboxClassCheck)
		checkoutPage.elements.healthInsuranceBox().attachFile(the.healthInsurancePath)
		checkoutPage.elements.payNowBtn().should('be.enabled').click()
		checkoutPage.elements.successfulPurchaseMessage().should('have.text', the.successfulMessage)
	})

	it('TS-GX2-653 | TC2: Validar realizar checkout de destino sin llenar el campo “Name” (Negativo)', () => {
		checkoutPage.typeName(the.name)
		checkoutPage.elements.nameInput().clear()
		checkoutPage.typeEmail(the.email)
		checkoutPage.typeSocialSecurityNumber(the.socialSecurityNumber)
		checkoutPage.typePhoneNumber(the.phoneNumber)
		checkoutPage.elements.termAndConditionsCheckbox().click().should('have.class', the.checkboxClassCheck)
		checkoutPage.elements.healthInsuranceBox().attachFile(the.healthInsurancePath)
		checkoutPage.elements.payNowBtn().should('not.be.enabled')
		checkoutPage.elements.nameRequiredMsj().should("be.visible").and("have.text",the.nameRequiedMsj)
	})

	it('TS-GX2-653 | TC3: Validar realizar checkout ingresando  un email address incorrecto/inválido (Negativo)', () => {
		checkoutPage.typeName(the.name)
		checkoutPage.typeEmail(the.invalidEmail)
		checkoutPage.typeSocialSecurityNumber(the.socialSecurityNumber)
		checkoutPage.typePhoneNumber(the.phoneNumber)
		checkoutPage.elements.termAndConditionsCheckbox().click().should('have.class', the.checkboxClassCheck)
		checkoutPage.elements.healthInsuranceBox().attachFile(the.healthInsurancePath)
		checkoutPage.elements.payNowBtn().should('not.be.enabled')
		checkoutPage.elements.invalidEmailMsj().should("be.visible").and("have.text",the.invalidEmailMsj)
	})

	it('TS-GX2-653 | TC4: Validar realizar checkout Ingresando social security number incorrecto/inválido (Negativo)', () => {
		checkoutPage.typeName(the.name)
		checkoutPage.typeEmail(the.email)
		checkoutPage.typeSocialSecurityNumber(the.invalidsocialSecurityNumber)
		checkoutPage.typePhoneNumber(the.phoneNumber)
		checkoutPage.elements.termAndConditionsCheckbox().click().should('have.class', the.checkboxClassCheck)
		checkoutPage.elements.healthInsuranceBox().attachFile(the.healthInsurancePath)
		checkoutPage.elements.payNowBtn().should('not.be.enabled')
		checkoutPage.elements.invalidSocialSecurityNumberMsj().should("be.visible").and("have.text",the.invalidSocialSecurityNumberMsj)
	})

	it('TS-GX2-653 | TC5: Validar realizar checkout ingresando phone number incorrecto/inválido (Negativo)', () => {
		checkoutPage.typeName(the.name)
		checkoutPage.typeEmail(the.email)
		checkoutPage.typeSocialSecurityNumber(the.socialSecurityNumber)
		checkoutPage.typePhoneNumber(the.invalidPhoneNumber)
		checkoutPage.elements.termAndConditionsCheckbox().click().should('have.class', the.checkboxClassCheck)
		checkoutPage.elements.healthInsuranceBox().attachFile(the.healthInsurancePath)
		checkoutPage.elements.payNowBtn().should('not.be.enabled')
		checkoutPage.elements.invalidPhoneNumberMsj().should("be.visible").and("have.text",the.invalidPhoneNumberMsj)
	})

	it('TS-GX2-653 | TC6: Validar realizar checkout sin aceptar los términos y condiciones de la página (Negativo)', () => {
		checkoutPage.typeName(the.name)
		checkoutPage.typeEmail(the.email)
		checkoutPage.typeSocialSecurityNumber(the.socialSecurityNumber)
		checkoutPage.typePhoneNumber(the.phoneNumber)
		checkoutPage.elements.termAndConditionsCheckbox().should('not.have.class', the.checkboxClassCheck)
		checkoutPage.elements.healthInsuranceBox().attachFile(the.healthInsurancePath)
		checkoutPage.elements.payNowBtn().should('not.be.enabled')
	})

	it('TS-GX2-653 | TC7: Validar realizar checkout sin subir la información del health insurance', () => {
		checkoutPage.typeName(the.name)
		checkoutPage.typeEmail(the.email)
		checkoutPage.typeSocialSecurityNumber(the.socialSecurityNumber)
		checkoutPage.typePhoneNumber(the.phoneNumber)
		checkoutPage.elements.termAndConditionsCheckbox().click().should('have.class', the.checkboxClassCheck)
		checkoutPage.elements.payNowBtn().should('be.enabled').click()
	})
})

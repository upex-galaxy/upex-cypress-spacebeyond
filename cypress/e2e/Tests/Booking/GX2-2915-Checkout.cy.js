import { checkout } from '@pages/CheckoutDestinationPage'
import { destinationPage } from '@pages/destinationPage'

describe('GX2-2915 | ✅SpaceBeyond | Booking | Book a Destination in Checkout', () => {
	let data
	before('data', () => {
		cy.fixture('data/data').then((datos) => {
			data = datos
		})
	})
	beforeEach('User must be log in, chosen a destination and be in the checkout page ', () => {
		cy.visit('/')
		checkout.clickLoginHeader()
		checkout.completeUsername(data.login.username)
		checkout.completePassword(data.login.password)
		checkout.clickLoginBtn()
		destinationPage.selectRandomLaunch()
		checkout.clickBookBtn()
		cy.url('https://demo.testim.io/checkout').should('exist')
	})
	it('GX2-2916 | TC1: Validate filled out the form correctly', () => {
		checkout.completeName(data.checkout.name).invoke('val').should('exist').should('have.length.lt', 30)
		checkout.completeEmail(data.checkout.email)
		checkout.completeSocialSecNum(data.checkout.socialSecNum)
		checkout.completePhoneNum(data.checkout.phoneNum)
		checkout.checkAgreeTerms()
		checkout.clickPayNowBtn()

		//BUG: no se muestra mensaje de confirmación de la compra
	})
	it('GX2-2916 | TC2: Validate filled out the form with an empty Name', () => {
		checkout.completeName(data.checkout.name)
		checkout.get.nameInput().clear().should('be.empty')
		checkout.completeEmail(data.checkout.email)
		checkout.completeSocialSecNum(data.checkout.socialSecNum)
		checkout.completePhoneNum(data.checkout.phoneNum)
		checkout.get.healthInsuranceContainer().attachFile('images/upexgalaxy.gif')
		checkout.checkAgreeTerms()
		checkout.clickPayNowBtn()
		checkout.get.errorMsg().should('be.visible').should('have.text', data.checkout.errorMsgName)
	})
	it('GX2-2916 | TC4: Validate filled out the form with an invalid Email ', () => {
		checkout.completeName(data.checkout.name)
		checkout.completeEmail(data.checkout.invalidEmail)
		checkout.completeSocialSecNum(data.checkout.socialSecNum)
		checkout.completePhoneNum(data.checkout.phoneNum)
		checkout.get.healthInsuranceContainer().attachFile('images/upexgalaxy.gif')
		checkout.checkAgreeTerms()
		checkout.clickPayNowBtn()
		checkout.get.errorMsg().should('be.visible').should('have.text', data.checkout.errorMsg)
	})
	it('GX2-2916 | TC5: Validate filled out the form with an invalid Social Security Number', () => {
		checkout.completeName(data.checkout.name)
		checkout.completeEmail(data.checkout.email)
		checkout.completeSocialSecNum(data.checkout.invalidSocialSecNum)
		checkout.completePhoneNum(data.checkout.phoneNum)
		checkout.get.healthInsuranceContainer().attachFile('images/upexgalaxy.gif')
		checkout.checkAgreeTerms()
		checkout.clickPayNowBtn()
		checkout.get.errorMsg().should('be.visible').should('have.text', data.checkout.errorMsgSocialNum)
	})
	it('GX2-2916 | TC6: Validate filled out the form with an invalid Phone Number', () => {
		checkout.completeName(data.checkout.name)
		checkout.completeEmail(data.checkout.email)
		checkout.completeSocialSecNum(data.checkout.socialSecNum)
		checkout.completePhoneNum(data.checkout.invalidPhoneNum)
		checkout.get.healthInsuranceContainer().attachFile('images/upexgalaxy.gif')
		checkout.checkAgreeTerms()
		checkout.clickPayNowBtn()
		checkout.get.errorMsg().should('be.visible').should('have.text', data.checkout.errorMsgPhoneNum)
	})
	it('GX2-2916 | TC6: Validate filled out the form with an invalid Phone Number', () => {
		checkout.completeName(data.checkout.name)
		checkout.completeEmail(data.checkout.email)
		checkout.completeSocialSecNum(data.checkout.socialSecNum)
		checkout.completePhoneNum(data.checkout.invalidPhoneNum)
		checkout.get.healthInsuranceContainer().attachFile('images/upexgalaxy.gif')
		checkout.checkAgreeTerms()
		checkout.clickPayNowBtn()
		checkout.get.errorMsg().should('be.visible').should('have.text', data.checkout.errorMsgPhoneNum)
	})
	it('GX2-2916 | TC7: Validate finish the checkout without accepting "Terms and conditions".', () => {
		checkout.completeName(data.checkout.name)
		checkout.completeEmail(data.checkout.email)
		checkout.completeSocialSecNum(data.checkout.socialSecNum)
		checkout.completePhoneNum(data.checkout.phoneNum)
		checkout.get.healthInsuranceContainer().attachFile('images/upexgalaxy.gif')
		checkout.clickPayNowBtn()
		checkout.get.termsAndCond().should('be.visible').should('contain', data.checkout.termsMsg)
	})

	it('GX2-2916 | TC8: Validate finish the checkout without uploading the health insurance information.', () => {
		checkout.completeName(data.checkout.name)
		checkout.completeEmail(data.checkout.email)
		checkout.completeSocialSecNum(data.checkout.socialSecNum)
		checkout.completePhoneNum(data.checkout.phoneNum)
		checkout.checkAgreeTerms()
		//Bug
		checkout.get.payNowBtn().should('not.be.enabled').click()
	})
})

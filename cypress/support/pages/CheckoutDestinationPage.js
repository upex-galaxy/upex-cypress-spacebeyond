class Checkout {
	get = {
		loginHeaderLink: () => cy.get('button[class^="NavButton__nav"]'),
		usernameLogin: () => cy.get('#login > :nth-child(1)'),
		passwordLogin: () => cy.get('#login > :nth-child(2) > .theme__inputElement___27dyY'),
		loginBtn: () => cy.get('button[form="login"]'),
		bookBtn: () => cy.get('button[class*="BookButton__flat___1i5dr"]'),
		nameInput: () => cy.get('form > :nth-child(1) > .theme__inputElement___27dyY'),
		emailInput: () => cy.get('form > :nth-child(2) > .theme__inputElement___27dyY'),
		socialSecNumInput: () => cy.get(':nth-child(3) > .theme__inputElement___27dyY'),
		phoneNumInput: () => cy.get(':nth-child(4) > .theme__inputElement___27dyY'),
		healthInsuranceContainer: () => cy.get('input[type="file'),
		agreeTerms: () => cy.get('input[type="checkbox"]'),
		payNowBtn: () => cy.get('button[class*="OrderSummary__pay-button___1CG2e"]'),
		errorMsg: () => cy.get('.theme__error___3ilni'),
		termsAndCond: () => cy.get('section[class*="Dialog__body"'),
	}
	clickLoginHeader() {
		this.get.loginHeaderLink().click()
	}
	completeUsername(data) {
		this.get.usernameLogin().type(data)
	}
	completePassword(data) {
		this.get.passwordLogin().type(data)
	}
	clickLoginBtn() {
		this.get.loginBtn().click()
	}
	clickBookBtn() {
		this.get.bookBtn().eq(0).click()
	}
	completeName(data) {
		return this.get.nameInput().type(data)
	}
	completeEmail(data) {
		this.get.emailInput().type(data)
	}
	completeSocialSecNum(data) {
		this.get.socialSecNumInput().type(data)
	}
	completePhoneNum(data) {
		this.get.phoneNumInput().type(data)
	}
	clickPayNowBtn() {
		this.get.payNowBtn().click({ force: true })
	}
	checkAgreeTerms() {
		this.get.agreeTerms().check({ force: true })
	}
}
export const checkout = new Checkout()

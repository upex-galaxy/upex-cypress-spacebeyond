class Destination {
	get = {
		//primer formulario
		selectDestino: () => cy.get('[class*="cardActions"] [class*="button"]'),
		selectPrecio: () => cy.get('[class*="cardActions"] span'),
		//segundo formulario
		inputName1: () => cy.get('div input[type="text"]').eq(4),
		inputEmail1: () => cy.get('div input[type="email"]'),
		inputSecurity1: () => cy.get('div input[type="text"]').eq(5),
		inputPhone1: () => cy.get('div input[type="tel"]'),
		labelPriceCheckout: () => cy.get('[class*="OrderSummary__headline-1"]'),
		//buttonSubmit: () => cy.get('[class*="CustomerInfo__dropzone-icon___1knA"]'),
		buttonSubmit: () => cy.get('input[type="file"]'),
		buttonPay: () => cy.get('[class*="pay-button"]'),
		checkTerms: () => cy.get('[class="theme__check___2B20W"]'),
	}

	selectRandomDestino() {
		return this.get
			.selectDestino()
			.its('length')
			.then((cant) => {
				const randomDest = Cypress._.random(0, cant - 1)
				this.get
					.selectPrecio()
					.eq(randomDest)
					.invoke('text')
					.then((precio) => {
						this.get.selectDestino().eq(randomDest).click()
						return cy.wrap(precio)
					})
			})
	}

	typeName(inputName) {
		this.get.inputName1().type(inputName)
	}
	typEmail(inputEmail) {
		this.get.inputEmail1().type(inputEmail)
	}
	typePhone(inputPhone) {
		this.get.inputPhone1().type(inputPhone)
	}
	typeSocialSecurity(inputSocialSecurity) {
		this.get.inputSecurity1().type(inputSocialSecurity)
	}
	clickSubmit() {
		this.get.buttonSubmit().attachFile('/images/upexlogo.png')
	}

	checkTerms() {
		this.get.checkTerms().click()
	}
	clickPay() {
		this.get.buttonPay().click()
	}
}
export const destinationPage = new Destination()

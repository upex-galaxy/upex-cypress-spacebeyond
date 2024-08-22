class Destination {
	get = {
		//Inicio de se
		inputUserName: () => cy.get('form div input[tabindex="1"]'),
		inputPassword: () => cy.get('form div input[tabindex="2"]'),
		buttonLogIn: () => cy.get('[tabindex="3"]'),
		labelHello: () => cy.get('[class="mui-dropdown "]'),
		//primer formulario
		selectDestino: () => cy.get('[class*="cardActions"] [class*="button"]'),
		selectPrecio: () => cy.get('[class*="cardActions"] span'),
		//segundo formulario
		inputName1: () => cy.get('div input[type="text"]').eq(4),
		//inputName1: () => cy.get('class= "theme__hint___2D9g-"').eq(0),
		inputEmail1: () => cy.get('div input[type="email"]'),
		inputSecurity1: () => cy.get('div input[type="text"]').eq(5),
		inputPhone1: () => cy.get('div input[type="tel"]'),
		labelPriceCheckout: () => cy.get('[class*="OrderSummary__headline-1"]'),
		buttonSubmit: () => cy.get('[class*="CustomerInfo__dropzone-icon___1knA"]'),
		buttonPay: () => cy.get('[class*="pay-button"]'),
	}

	typeUserName(userName) {
		this.get.inputUserName().type(userName)
	}
	typePassword(password) {
		this.get.inputPassword().type(password)
	}
	clickLogIn() {
		this.get.buttonLogIn().click()
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
	clickPay() {
		this.get.buttonPay().click()
	}
}
export const destinationPage = new Destination()

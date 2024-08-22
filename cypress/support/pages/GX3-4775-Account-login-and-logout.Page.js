class LoginLogout {
	get = {
		inputUserName: () => cy.get('form div input[tabindex="1"]'),
		inputPassword: () => cy.get('form div input[tabindex="2"]'),
		buttonLogIn: () => cy.get('[tabindex="3"]'),
		labelHello: () => cy.get('[class="mui-dropdown "]'),
		buttonLogOut: () => cy.get('[class="mui-dropdown__menu mui--is-open"]'),
		buttonBienvenida: () => cy.get('[class="mui-btn mui-btn--primary "]'),
	}

	typeUserName(userName) {
		this.get.inputUserName().type(userName)
	}
	typePassword(password) {
		this.get.inputPassword().type(password)
	}
	ClickLogIn() {
		this.get.buttonLogIn().click()
	}
	ClickLogOut() {
		this.get.buttonBienvenida().click()
		this.get.buttonLogOut().click()
	}
}
export const LogInLogOutPage = new LoginLogout()

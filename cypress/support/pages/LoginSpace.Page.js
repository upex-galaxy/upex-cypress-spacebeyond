class LoginSpaceB {
	get = {
		usernameInput: () => cy.get('[id="login"] [type="text"]'),
		passwordInput: () => cy.get('[id="login"] [type="password"]'),
		loginButton: () => cy.get('[form="login"]'),
		MsjUsernameError: () => cy.get('[class$="3ilni"]'),
		MsjPasswordError: () => cy.get('[class$="3ilni"]').contains('Password is a required field.'),
		HoverButtonLogout: () => cy.get('[type="button"] > span:nth-of-type(1):first-of-type'),
		ElementLoginButton: () => cy.get('[class*="NavButton"]'),
		LogoutButton: () => cy.get('[class$="open"] a'),
	}

	TypeUsernameAndPassword(username, password) {
		username && this.get.usernameInput().type(username)
		password && this.get.passwordInput().type(password)
	}

	ClickLoginButton() {
		this.get.loginButton().click()
	}
	ClickLogoutButton() {
		this.get.HoverButtonLogout().click()
		this.get.LogoutButton().click()
	}

	GetMsjUsernameError() {
		return this.get.MsjUsernameError().invoke('text')
	}
	GetMsjPasswordError() {
		return this.get.MsjPasswordError().invoke('text')
	}
	GetLoginText() {
		return this.get.ElementLoginButton().invoke('text')
	}
	GetLogoutText() {
		return this.get.HoverButtonLogout().invoke('text')
	}
}

export const loginSpace = new LoginSpaceB()

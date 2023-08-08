class login {
	get = {
		Login: () => cy.get('.NavButton__nav-button___34wHC'),
		Username: () => cy.get('[class="theme__inputElement___27dyY"]').eq(0),
		Password: () => cy.get('[class="theme__inputElement___27dyY"]'),
		ButtonLogIn: () => cy.get('[class$="LoginButton__primary___38GOe"]'),
		SaludoLogIn: () => cy.get('[class="mui-btn mui-btn--primary "]'),
	}
	ClickOnLogin() {
		this.get.Login().click()
	}
	TypeUsername(Username) {
		this.get.Username().type(Username)
	}
	TypePassword(Password) {
		this.get.Password().type(Password)
	}
	ClickOnButtonLogin() {
		this.get.ButtonLogIn().click()
	}
}

class Filtro {
	get = {
		Launch: () => cy.get('[class*="BlackDropDown__inputInputElement___3hD6U"]').eq(0),
		LaunchOptions: () => cy.get('[class="theme__values___1jS4g"]').eq(0).children(),
		TitleCards: () => cy.get('[class="theme__title___35Wsy"]'),
	}
	ClickOnLaunch() {
		this.get.Launch().click()
	}
	SelectedOptionLaunch() {
		this.get.LaunchOptions().then((length) => {
			let Index = Cypress._.random(1, length.length - 1)
			this.get.LaunchOptions().eq(Index).click()
			Cypress.env('Index', Index)
		})
	}
}

export const Login = new login()
export const Filtros = new Filtro()

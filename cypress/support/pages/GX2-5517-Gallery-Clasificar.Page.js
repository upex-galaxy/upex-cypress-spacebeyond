import the from 'cypress/fixtures/data/GX2-5517-Gallery-Clasificar.json'

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
		PlanetColor: () => cy.get('[class*="BlackDropDown__inputInputElement___3hD6U"]').eq(1),
		OptionsColor: () => cy.get('[class="theme__values___1jS4g"]').eq(1).children(),
		PlanetVisible: () => cy.get('[data-react-toolbox="card"]:not([class$="GalleryItem__--hidden___DvgH8"])'),
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
	PlanetNameSelected() {
		const planet = the.Destino[Cypress.env('Index')]
		const NamePlanet = planet.name
		return NamePlanet
	}
	NamePlanet() {
		return this.get.TitleCards().invoke('text')
	}
	ClickOnPlanetColor() {
		this.get.PlanetColor().click()
	}
	SelectedOptionColor() {
		this.get.OptionsColor().then((length) => {
			let Index = Cypress._.random(1, length.length - 1)
			this.get.OptionsColor().eq(Index).click()
			Cypress.env('IndexColor', Index)
			this.get
				.PlanetColor()
				.invoke('val')
				.then((ColorSelected) => {
					cy.log(ColorSelected)
					Cypress.env('Color', ColorSelected)
				})
		})
	}
	PlanetsFilteredColor() {
		let NamePlanets = []
		return this.get
			.TitleCards()
			.each((element) => {
				NamePlanets.push(element.text())
			})
			.then(() => {
				return NamePlanets
			})
	}
	SameColorPlanet() {
		const SelectPlanetColor = the.Destino.filter(({ color }) => color === Cypress.env('Color'))
		const NamesOfPlanets = SelectPlanetColor.map(({ name }) => name)
		return NamesOfPlanets
	}
}

export const Login = new login()
export const Filtros = new Filtro()

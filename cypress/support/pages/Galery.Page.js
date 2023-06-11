class GaleryDestination {
	get = {
		//campos login
		user: () => cy.get('[type="text"]').eq(4),
		password: () => cy.get('[type="password"]'),
		submit: () => cy.get('button[type="submit"]'),
		helloJonh: () => cy.get('[class="mui-dropdown "]'),

		dropLaunch: () => cy.get('[role="input"]').eq(4),
		selectedPlanet: () => cy.get('[class^="theme__values"]').eq(2),
		selectedColor: () => cy.get('[class^="theme__values"]').eq(3),
		cardPlanetName: () => cy.get('[class*=cardTitle]'),
		cardPlanetPrice: () => cy.get('[class*=cardActions]'),
		planetCardVisible: () => cy.get('[data-react-toolbox="card"]:not([class*="--hidden"])'),
		Slider: () => cy.get('[class="theme__inputElement___27dyY theme__filled___1UI7Z"]:not([name="name"])'),
	}

	inputUser() {
		this.get.user().type('Lucas')
	}
	inputPassword() {
		this.get.password().type('Casco')
	}

	clickSubmitButton() {
		this.get.submit().click()
	}

	clickDropLaunch() {
		this.get.dropLaunch().click()
	}

	selectLaunchRandom() {
		return this.get
			.selectedPlanet()
			.children()
			.next()
			.then((lengthPlanets) => {
				const randomPlanet = Cypress._.random(0, lengthPlanets.length - 1)
				this.get
					.selectedPlanet()
					.children()
					.next()
					.eq(randomPlanet)
					.click({ force: true })
					.then((planetNameSelect) => {
						const planetName = planetNameSelect.text()
						return planetName
					})
			})
	}

	getPlanetName() {
		let namePlanets = []
		return this.get
			.cardPlanetName()
			.each((names) => {
				namePlanets.push(names.text())
			})
			.then(() => {
				return namePlanets
			})
	}

	selectPlanetColorsRandom() {
		return this.get
			.selectedColor()
			.children()
			.next()
			.then((lengthPlanets) => {
				const randomPlanetColor = Cypress._.random(0, lengthPlanets.length - 1)
				this.get
					.selectedColor()
					.children()
					.next()
					.eq(randomPlanetColor)
					.click({ force: true })
					.then((planetColorSelected) => {
						const planetColor = planetColorSelected.text()
						return planetColor
					})
			})
	}
}

export const galeryDestination = new GaleryDestination()

class DestinationPage {
	get = {
		green: ['Madan'],
		red: ['Shenji', 'Sant Cugat Del Valles'],
		blue: ['Tongli', 'Tayabamba', 'Babahoyo'],
		brown: ['Flagstaff', 'Cuozhou'],
		purple: ['Shaheying'],
		cardPlanetName: () => cy.get('[class*=cardTitle]'),
		cardPlanetPrice: () => cy.get('[class*=cardActions]'),
		planetSelected: () => cy.get('[class*=selected]').contains('Launch').parent(),
		planetColorSelected: () => cy.get('[class*=selected]').contains('Planet color').parent(),
		planetCardVisible: () => cy.get('[data-react-toolbox="card"]:not([class*="--hidden"])'),
		slider: () => cy.get('[class*=PurpleSlider__knob]'),
	}
	selectRandomPlanet() {
		let randomPlanet = []
		let planetName = []
		this.get
			.planetSelected()
			.children()
			.next()
			.then((lengthPlanet) => {
				randomPlanet.push(Cypress._.random(0, lengthPlanet.length - 1))
			})
		this.get
			.planetSelected()
			.children()
			.next()
			.eq(randomPlanet)
			.then((planetNameSelect) => {
				planetName.push(planetNameSelect.text())
			})
			.click({ force: true })
		return planetName
	}
	getPlanetsNameVisibleInDestinationPage() {
		let planetsName = []
		this.get
			.planetCardVisible()
			.children('[class*=cardTitle]')
			.each((planetName) => {
				planetsName.push(planetName.text())
			})
		return planetsName
	}
	getPlanetsPriceVisibleInDestinationPage() {
		let planetsPrice = []
		this.get
			.planetCardVisible()
			.children('[class*=cardTitle]')
			.each((planetPrice) => {
				const priceValue = planetPrice.text()
				planetsPrice.push(priceValue)
				const newPriceValue = priceValue.replace('$', '')
				planetsPrice.push(newPriceValue)
			})
		return planetsPrice
	}
	selectRandomPlanetColor() {
		let randomPlanetColor = []
		let planeColor = []
		this.get
			.planetColorSelected()
			.children()
			.next()
			.then((lengthPlanet) => {
				randomPlanetColor.push(Cypress._.random(0, lengthPlanet.length - 1))
			})
		this.get
			.planetColorSelected()
			.children()
			.next()
			.eq(randomPlanetColor)
			.then((planetColorSelect) => {
				planeColor.push(planetColorSelect.text())
			})
			.click({ force: true })
		return planeColor
	}
	searchGroupPlanetByColor(planetColorSelect) {
		let planetColorGroup = []

		if (planetColorSelect.toString() === 'Green') {
			planetColorGroup = this.get.green
		}
		if (planetColorSelect.toString() === 'Red') {
			planetColorGroup = this.get.red
		}
		if (planetColorSelect.toString() === 'Blue') {
			planetColorGroup = this.get.blue
		}
		if (planetColorSelect.toString() === 'Brown') {
			planetColorGroup = this.get.brown
		}
		if (planetColorSelect.toString() === 'Purple') {
			planetColorGroup = this.get.purple
		}
		return planetColorGroup
	}
	moveSliderPrice(value) {
		let valuePrice = value.toString() - 110 //como el minimo es 100, para evaluar en un real 100% restamos 100 + 10 que representan la dif minima
		let priceConvert = (valuePrice * 100) / 1800
		cy.log(priceConvert)
		this.get.slider().invoke('attr', 'style', `left: ${priceConvert}%`).click()
	}
	selectPlanetRandomInTheGroup(planetColorSelect) {
		let planetName = []
		const planetsGroup = this.searchGroupPlanetByColor(planetColorSelect)
		cy.get('*').then(() => {
			const randomPlanet = Cypress._.random(0, planetsGroup.length - 1)
			this.get.planetSelected().children().next().contains(planetsGroup[randomPlanet]).click({ force: true })
			planetName.push(planetsGroup[randomPlanet])
			cy.log(planetsGroup)
			cy.log(planetsGroup[randomPlanet])
			cy.log(randomPlanet)
		})
		return planetName
	}
	selectPlanetDifferentColor(planetColorSelect) {
		let planetsValue
		if (planetColorSelect.toString() === 'Green') {
			planetsValue = [this.get.purple, this.get.blue, this.get.brown, this.get.red]
		}
		if (planetColorSelect.toString() === 'Red') {
			planetsValue = [this.get.purple, this.get.blue, this.get.brown, this.get.green]
		}
		if (planetColorSelect.toString() === 'Blue') {
			planetsValue = [this.get.purple, this.get.brown, this.get.red, this.get.green]
		}
		if (planetColorSelect.toString() === 'Brown') {
			planetsValue = [this.get.purple, this.get.blue, this.get.red, this.get.green]
		}
		if (planetColorSelect.toString() === 'Purple') {
			planetsValue = [this.get.blue, this.get.brown, this.get.red, this.get.green]
		}
		const fisrtArrayRandomPlanet = Cypress._.random(0, planetsValue.length - 1)
		const randomPlanet = planetsValue[fisrtArrayRandomPlanet]
		cy.log(randomPlanet)
		const secondArrayRandomPlanet = Cypress._.random(0, randomPlanet.length - 1)
		cy.log(randomPlanet[secondArrayRandomPlanet])
		const RandomPlanet = randomPlanet[secondArrayRandomPlanet]
		return RandomPlanet
	}
}
export const destinationPage = new DestinationPage()

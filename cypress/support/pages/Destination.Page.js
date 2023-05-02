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
		planetCard: () => cy.get('[data-react-toolbox="card"]'),
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
			.planetCard()
			.children('[class*=cardTitle]')
			.each((planetName) => {
				planetsName.push(planetName.text())
			})
		return planetsName
	}
	getPlanetsPriceVisibleInDestinationPage() {
		let planetsPrice = []
		this.get
			.planetCard()
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
}
export const destinationPage = new DestinationPage()

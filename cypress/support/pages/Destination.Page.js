class DestinationPage {
	get = {
		cardPlanetName: () => cy.get('[class*=cardTitle]'),
		cardPlanetPrice: () => cy.get('[class*=cardActions]'),
		planetSelected: () => cy.get('[class*=selected]').contains('Launch').parent(),
		planetColorSelected: () => cy.get('[class*=selected]').contains('Planet color').parent(),
		planetCardVisible: () => cy.get('[data-react-toolbox="card"]:not([class*="--hidden"])'),
		slider: () => cy.get('[class*=PurpleSlider__knob]'),
	}

	selectRandomLaunch() {
		return this.get
			.planetSelected()
			.children()
			.next()
			.then((lengthPlanet) => {
				const randomPlanet = Cypress._.random(0, lengthPlanet.length - 1)
				this.get
					.planetSelected()
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
	getVisiblePlanetNames() {
		let names = []
		return this.get
			.planetCardVisible()
			.children('[class*=cardTitle]')
			.each((element) => {
				names.push(element.text())
			})
			.then(() => {
				return names
			})
	}
	getVisiblePlanetPrices() {
		let planetsPrice = []
		return this.get
			.cardPlanetPrice()
			.children('[class*=price-tag]')
			.each((planetPrice) => {
				const priceValue = planetPrice.text()
				const newPriceValue = priceValue.replace('$', '')
				planetsPrice.push(newPriceValue)
			})
			.then(() => {
				return planetsPrice
			})
	}
	selectRandomPlanetColor() {
		return this.get
			.planetColorSelected()
			.children()
			.next()
			.then((lengthPlanet) => {
				const randomPlanetColor = Cypress._.random(0, lengthPlanet.length - 1)
				this.get
					.planetColorSelected()
					.children()
					.next()
					.eq(randomPlanetColor)
					.click({ force: true })
					.then((planetColorSelect) => {
						const planeColor = planetColorSelect.text()
						return planeColor
					})
			})
	}

	moveSliderPrice(value) {
		let valuePrice = value.toString() - 110 //como el minimo es 100, para evaluar en un real 100% restamos 100 + 10 que representan la dif minima
		let priceConvert = (valuePrice * 100) / 1800
		cy.log(priceConvert)
		this.get.slider().invoke('attr', 'style', `left: ${priceConvert}%`).click()
	}
	selectPlanet(planetColorSelect) {
		this.get.planetSelected().children().next().contains(planetColorSelect).click({ force: true })
	}
}
export const destinationPage = new DestinationPage()

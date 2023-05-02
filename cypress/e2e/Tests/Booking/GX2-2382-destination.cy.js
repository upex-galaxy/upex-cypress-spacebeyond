describe('test', () => {
	beforeEach('Precondition', () => {
		cy.visit('https://demo.testim.io/')
	})

	it('2383 | TC1: Validate correct result with Dropdown Launch random selection', () => {
		const planetNameSelect = destinationPage.selectRandomPlanet()
		const planetsNameVisible = destinationPage.getPlanetsNameVisibleInDestinationPage()
		cy.get('*').then(() => {
			expect(planetNameSelect.toString()).to.equal(planetsNameVisible.toString())
		})
	})
	it('2383 | TC2: Validate correct result with Dropdown Planet color random selection', () => {
		//se procede a agregar los planetas agrupados por colores suponiendo que existe una documentacion por detras
		//ya que las cartas no tienen ninguna identificacion por color
		const planetColorSelect = destinationPage.selectRandomPlanetColor()
		const planetsNameVisible = destinationPage.getPlanetsNameVisibleInDestinationPage()
		cy.get('*').then(() => {
			const planetColorGroup = destinationPage.searchGroupPlanetByColor(planetColorSelect)
			expect(planetColorGroup).to.deep.equal(planetsNameVisible)
		})
	})
	it('2383 | TC3: select a random planet and validate that it is not visible by setting a lower maximum price', () => {
		destinationPage.selectRandomPlanet()
		const planetsPriceVisible = destinationPage.getPlanetsPriceVisibleInDestinationPage()
		cy.get('*').then(() => {
			destinationPage.moveSliderPrice(planetsPriceVisible[1])
			destinationPage.get.planetCard().should('not.exist')
		})
	})
})

import { destinationPage } from '@pages/Destination.Page'

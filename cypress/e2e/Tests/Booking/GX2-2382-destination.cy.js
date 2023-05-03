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
			destinationPage.get.planetCardVisible().should('not.exist')
		})
	})
	it('2383 | TC4: select a random planet color validate that is visible one selected planet random and not visible after by setting a lower maximum price', () => {
		const planetColorSelect = destinationPage.selectRandomPlanetColor()
		cy.get('*').then(() => {
			destinationPage.selectPlanetRandomInTheGroup(planetColorSelect)
			destinationPage.get.planetCardVisible().then((card) => {
				//expect only visible one card planet
				expect(card.length).to.equal(1)
			})
			const planetsPriceVisible = destinationPage.getPlanetsPriceVisibleInDestinationPage()
			cy.get('*').then(() => {
				//settings max price
				destinationPage.moveSliderPrice(planetsPriceVisible[1])
				//expect not card visible because price max selected is more lower than its price
				destinationPage.get.planetCardVisible().should('not.exist')
			})
		})
	})
	it('2383 | TC5: select random planet color and validate destination cards empty by selected random planet of different color', () => {
		const planetColorSelect = destinationPage.selectRandomPlanetColor()
		cy.get('*').then(() => {
			const planetDifferentColor = destinationPage.selectPlanetDifferentColor(planetColorSelect)
			destinationPage.get.planetSelected().children().next().contains(planetDifferentColor).click({ force: true })
			//expect not card visible because selected random plant with different color
			destinationPage.get.planetCardVisible().should('not.exist')
		})
	})
})

import { destinationPage } from '@pages/Destination.Page'

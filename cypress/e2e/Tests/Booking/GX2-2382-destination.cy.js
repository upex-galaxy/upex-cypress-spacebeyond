describe('test', () => {
	beforeEach('Precondition', () => {
		cy.visit('https://demo.testim.io/')
	})

	it('2383 | TC1: Validate correct result with Dropdown Launch random selection', () => {
		destinationPage.selectRandomLaunch().then((selectedPlanetName) => {
			cy.log(selectedPlanetName)
			destinationPage.getVisiblePlanetNames().then((planetListNames) => {
				cy.log(planetListNames)
				expect(planetListNames).to.have.length(1)
				expect(planetListNames).include(selectedPlanetName)
			})
		})
	})
	it('2383 | TC2: Validate correct result with Dropdown Planet color random selection', () => {
		//se procede a agregar los planetas agrupados por colores suponiendo que existe una documentacion por detras
		//ya que las cartas no tienen ninguna identificacion por color
		destinationPage.selectRandomPlanetColor().then((planeColor) => {
			cy.log(planeColor)
			cy.fixture('database/planets').then((planetList) => {
				cy.log(planetList)
				const sameColorPlanets = planetList.filter(({ color }) => color === planeColor)
				cy.log(sameColorPlanets)
				const expectedPlanets = sameColorPlanets.map(({ name }) => name)
				cy.log(expectedPlanets)
				destinationPage.getVisiblePlanetNames().then((visiblePlanetNames) => {
					cy.log(visiblePlanetNames)
					expect(visiblePlanetNames).deep.equal(expectedPlanets)
				})
			})
		})
	})
	it('2383 | TC3: select a random planet and validate that it is not visible by setting a lower maximum price', () => {
		destinationPage.selectRandomLaunch().then((selectedPlanetName) => {
			cy.log(selectedPlanetName)
			destinationPage.getVisiblePlanetPrices().then((planetPrices) => {
				cy.log(planetPrices)
				destinationPage.moveSliderPrice(planetPrices)
				destinationPage.get.cardPlanetName().should('not.exist')
			})
		})
	})
	it('2383 | TC4: select a random planet color validate that is visible one selected planet random and not visible after by setting a lower maximum price', () => {
		destinationPage.selectRandomPlanetColor().then((planetColor) => {
			cy.fixture('database/planets').then((planetList) => {
				const sameColorPlanets = planetList.filter(({ color }) => color === planetColor)
				cy.log(sameColorPlanets)
				const planetsByColor = sameColorPlanets.map(({ name }) => name)
				const randomIndex = Cypress._.random(0, planetsByColor.length - 1)
				cy.log(planetsByColor[randomIndex])
				destinationPage.selectPlanet(planetsByColor[randomIndex])
				destinationPage.get.cardPlanetName().then((visibleNamePlanets) => {
					expect(visibleNamePlanets.text()).to.deep.equal(planetsByColor[randomIndex])
					destinationPage.getVisiblePlanetPrices().then((planetPrices) => {
						cy.log(planetPrices)
						destinationPage.moveSliderPrice(planetPrices)
						destinationPage.get.cardPlanetName().should('not.exist')
					})
				})
			})
		})
	})
	it('2383 | TC5: select random planet color and validate destination cards empty by selected random planet of different color', () => {
		destinationPage.selectRandomPlanetColor().then((planetColor) => {
			cy.fixture('database/planets').then((planetList) => {
				const diffColorPlanetsSelected = planetList.filter(({ color }) => color !== planetColor)
				cy.log(diffColorPlanetsSelected)
				const diffPlanetsNameByColorSelected = diffColorPlanetsSelected.map(({ name }) => name)
				cy.log(diffPlanetsNameByColorSelected)
				const randomIndex = Cypress._.random(0, diffPlanetsNameByColorSelected.length - 1)
				cy.log(diffPlanetsNameByColorSelected[randomIndex])
				destinationPage.selectPlanet(diffPlanetsNameByColorSelected[randomIndex])
				destinationPage.get.cardPlanetName().should('not.exist')
			})
		})
	})
})

import { destinationPage } from '@pages/Destination.Page'

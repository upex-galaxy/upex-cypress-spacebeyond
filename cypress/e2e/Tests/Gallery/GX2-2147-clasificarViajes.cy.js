import { galeryDestination } from '@pages/Galary.Page'

describe('', () => {
	beforeEach('', () => {
		cy.visit('https://demo.testim.io/')
		cy.url().should('contain', 'testim')
		cy.contains('Log in').should('be.visible').click()
		cy.url().should('contain', 'login')

		//login
		cy.get('[type="text"]').eq(4).type('Hola')
		cy.get('[type="password"]').type('Lucas')
		cy.get('button[type="submit"]').click()
		cy.get('[class="mui-dropdown "]').contains('Hello, John')
	})

	it('2148|TC01 Validar destino con seleccion random de dropdow Planet Launch', () => {
		cy.get('[role="input"]').eq(4).click()

		cy.get('[class^="theme__values"]').eq(2).as('arrayNumber')
		const arrayNumber = cy.get('[class^="theme__values"]').eq(2).children()
		cy.log(arrayNumber.length)
		cy.log('@arrayNumber')
		randomItem = Cypress._.random(1, arrayNumber.length)
		cy.get('@arrayNumber')
			.children()
			.eq(randomItem)
			.then((planeta) => {
				cy.wrap(planeta).click()
				const traveler = planeta.text()
				cy.log(traveler)
			})
	})

	it('2148|TC01 Validar destino con seleccion random de dropdow Planet Launch', () => {
		galeryDestination.clickDropLaunch()
		galeryDestination.selectLaunchRandom().then((planetName) => {
			galeryDestination.getPlanetName().then((listNamePlanet) => {
				expect(listNamePlanet).include(planetName)
			})
		})
	})

	it('2148|TC02 Validar destino por seleccion random en dropdown planet color', () => {
		galeryDestination.selectPlanetColorsRandom().then((planetColor) => {
			cy.fixture('database/planestsColorNamePrice').then((planetList) => {
				const samePlanetColor = planetList.filter(({ color }) => color === planetColor)
				const namePlanets = samePlanetColor.map(({ name }) => name)
				galeryDestination.getPlanetName().then((listNamePlanet) => {
					expect(listNamePlanet).deep.equal(namePlanets)
				})
			})
		})
	})
	it('2148|TC03 Validar destino seleccionado rango de precio', () => {
		//seleccion random de slider
		const numberRandomSlider = Cypress._.random(101, 1800)
		cy.log(numberRandomSlider)
		cy.get('input[class="theme__inputElement___27dyY theme__filled___1UI7Z"]')
			.eq(1)
			.clear()
			.type(numberRandomSlider + '{enter}')
	})

	it.only('mi logica ', () => {
		const numberRandomSlider = Cypress._.random(101, 1800)
		cy.log(numberRandomSlider)
		cy.get('input[class="theme_inputElement_27dyY themefilled__1UI7Z"]')
			.eq(1)
			.clear()
			.type(numberRandomSlider + '{enter}')
			.then(() => {
				cy.log(numberRandomSlider).then(() => {
					cy.fixture('database/planetsColorNamePrice').then((planetList) => {
						const samePlanetList = planetList.filter(({ color }) => parseFloat(color) < parseFloat(numberRandomSlider))
						expect(planetList).to.include.deep.members(samePlanetList)
					})
				})
			})
	})

	it('2148|TC04 Validar seleccion de planeta random y precio maximo', () => {})

	it('2148|TC04 Validar cards vacias por seleccion de planeta al azar diferente a selecion del color al azar', () => {})
})

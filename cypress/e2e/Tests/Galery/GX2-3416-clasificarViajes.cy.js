import { galeryDestination } from '@pages/Galery.Page'

describe('GX2-3416 Clasificar Viajes por planeta, color y precio', () => {
	beforeEach('Login Spacebeyon', () => {
		cy.visit('https://demo.testim.io/')
		cy.url().should('contain', 'testim')
		cy.contains('Log in').should('be.visible').click()
		cy.url().should('contain', 'login')

		//login con POM solicitado por Dany
		galeryDestination.inputUser()
		galeryDestination.inputPassword()
		galeryDestination.clickSubmitButton()
		galeryDestination.get.helloJonh().should('contain.text', 'Hello, John')
	})

	it('3417|TC01 Validar destino con seleccion random de dropdow Planet Launch', () => {
		galeryDestination.clickDropLaunch()
		galeryDestination.selectLaunchRandom().then((planetName) => {
			galeryDestination.getPlanetName().then((listNamePlanet) => {
				expect(listNamePlanet).include(planetName)
			})
		})
	})

	it('3417|TC02 Validar destino por seleccion random en dropdown planet color', () => {
		galeryDestination.selectPlanetColorsRandom().then((planetColor) => {
			cy.fixture('data/planestsColorNamePrice').then((planetList) => {
				const samePlanetColor = planetList.filter(({ color }) => color === planetColor)
				const namePlanets = samePlanetColor.map(({ name }) => name)
				galeryDestination.getPlanetName().then((listNamePlanet) => {
					expect(listNamePlanet).deep.equal(namePlanets)
				})
			})
		})
	})

	it('3417|TC03 Validar destino seleccionado rango de precio', () => {
		cy.fixture('data/planestsColorNamePrice').then((data) => {
			const numberRandomSlider = Cypress._.random(193, 1800)

			galeryDestination.get
				.Slider()
				.clear()
				.type(numberRandomSlider + '{enter}')

			const preciosProductosFiltrados = data.filter((data) => data.price < numberRandomSlider).map((producto) => producto.price)
			preciosProductosFiltrados.forEach((precio) => {
				expect(precio).to.below(numberRandomSlider)
			})
		})
	})

	it('3417|TC04 Validar cards vacias por seleccion de planeta al azar diferente a seleccion del color al azar', () => {
		//seleccion planeta random
		galeryDestination.selectLaunchRandom().then((planetSelected) => {
			cy.log(planetSelected)
			cy.fixture('data/planestsColorNamePrice').then((planetList) => {
				const namePlanet = planetList.find((objet) => objet.name == planetSelected)
				let colorPlanet = namePlanet.color
				cy.log(colorPlanet)

				//evalua que el color no sea igual al del planeta seleccionado
				galeryDestination.get.selectedColor().click({ force: true })
				galeryDestination.get
					.selectedColor()
					.children()
					.next()
					.each(($el) => {
						if ($el.text() != colorPlanet) {
							cy.wrap($el).click({ force: true })
							return false
						}
					})
				galeryDestination.get.planetCardVisible().should('not.exist')
			})
		})
	})
})

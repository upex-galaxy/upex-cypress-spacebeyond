import the from 'cypress/fixtures/data/GX2-5517-Gallery-Clasificar.json'
import { Login } from '@pages/GX2-5517-Gallery-Clasificar.Page'
import { Filtros } from '@pages/GX2-5517-Gallery-Clasificar.Page'

describe('GX2-5517-✅-space-beyond-gallery-clasificar-viaje-segun-destino-color-y-precio', () => {
	beforeEach('Usuario debe estar situado el sitio web y con acceso', () => {
		cy.visit(the.URLSpaceBeyond)
		cy.url().should('contain', the.NameDom)
		//Login
		Login.ClickOnLogin()
		cy.url().should('contain', the.login)
		Login.TypeUsername(the.User.Username)
		Login.TypePassword(the.User.Password)
		Login.ClickOnButtonLogin()
		cy.url().should('contain', the.URLSpaceBeyond)
		Login.get.SaludoLogIn().should('contain', the.Saludo)
	})
	it('5518 | TC01: Validar  que al seleccionar aleatoriamente una opción de “Launch” se visualiza el destino seleccionado.', () => {
		//Abrimos el Dropdown y seleccionamos una opción aleatoria
		Filtros.ClickOnLaunch()
		Filtros.SelectedOptionLaunch()
		//Validamos que la selección funciona correctamente
		Filtros.get
			.Launch()
			.should('be.visible')
			.invoke('val')
			.then((Planet) => {
				expect(Planet).to.equal(Filtros.PlanetNameSelected())
				Filtros.NamePlanet().then((Title) => {
					expect(Title).to.equal(Planet)
				})
				Filtros.ClickOnLaunch()
				Filtros.get.LaunchOptions().eq(Cypress.env('Index')).should('contain.class', the.ClassSelected).and('be.visible')
			})
	})
	it('5518 | TC02: Validar que al seleccionar aleatoriamente un "Planet Color" se visualizan los plantes de ese color', () => {
		//Abrimos el Dropdown y seleccionamos una opción aleatoria
		Filtros.ClickOnPlanetColor()
		Filtros.SelectedOptionColor()
		// Validamos que la selección funciona correctamente
		Filtros.PlanetsFiltered().then((names) => {
			expect(names).deep.equal(Filtros.SameColorPlanet())
			Filtros.ClickOnPlanetColor()
			Filtros.get.OptionsColor().eq(Cypress.env('IndexColor')).should('contain.class', the.ClassSelected).and('be.visible')
		})
	})
	it('5518 | TC03: Validar que al mover aleatoriamente el rango de “Precios” se visualizan los destinos correspondientes al precio', () => {
		// Hacemos click en Load More para ver todos los Planetas disponibles
		Filtros.ClickOnLoadMore()
		//Seleccionamos un valor random con el Slider
		Filtros.RandomMoveSlider()
		//Validamos que la selección funciona correctamente
		Filtros.PlanetsFiltered().then((Title) => {
			expect(Title).deep.equal(Cypress.env('NameOfPricePlanets'))
		})
	})
})

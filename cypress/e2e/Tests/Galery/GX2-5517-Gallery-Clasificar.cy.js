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
			.invoke('val')
			.then((val) => {
				expect(val).to.equal(the.Destino[Cypress.env('Index')])
				Filtros.get
					.TitleCards()
					.invoke('text')
					.then((text) => {
						expect(text).to.equal(val)
					})
				Filtros.ClickOnLaunch()
				Filtros.get.LaunchOptions().eq(Cypress.env('Index')).should('contain.class', the.ClassSelected)
			})
	})
})

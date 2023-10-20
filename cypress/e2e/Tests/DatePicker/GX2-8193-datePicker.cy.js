import { removeLogs } from '@helper/RemoveLogs'
import { homePage } from '@pages/GX2-8193-datePicker.page'

describe('GX2-8193-SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.url().should('contain', 'demo.testim.io/')
	})
	it('asd', () => {
		homePage.selectDeparting()
	})
})

removeLogs()

import { removeLogs } from '@helper/RemoveLogs'
import { homePage } from '@pages/GX2-8193-datePicker.page'

describe('GX2-8193-SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.url().should('contain', 'demo.testim.io/')
	})
	it('GX2-8194 | TC1: Validar buscar destino por fecha de partida, fecha de retorno y tipo de pasajero.', () => {
		let departingDay, departingMonth, returningMonth, returningDay, adultsPassengers, childrenPassengers

		homePage.selectDepartingDate().then((date) => {
			departingMonth = date[0]
			departingDay = date[1]
		})
		homePage.selectReturningDate().then((date) => {
			returningMonth = date[0]
			returningDay = date[1]
		})
		homePage.selectAdults().then((value) => {
			adultsPassengers = value
		})
		homePage.selectChildren().then((value) => {
			childrenPassengers = value
			console.log(childrenPassengers)
		})
		homePage.clickOnSelectDestination()
	})
})

removeLogs()

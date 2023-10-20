import { removeLogs } from '@helper/RemoveLogs'
import { spaceBeyondPage } from '@pages/GX2-8385-DataPickerPage'
removeLogs()
describe('SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('PRC: usuario está situado en el home del site "Space&Beyond"', () => {
		cy.visit('/')
	})
	it.only('8385 | TC1: Validar clasificar viaje segun departing, returning y pasajeros exitosamente', () => {
		spaceBeyondPage.clickDepartingInput()
		spaceBeyondPage.clickDayOnDepartingInput().then((dayValueDeparting) => {
			spaceBeyondPage.clickButtonOk()
			spaceBeyondPage.get
				.DepartingInput()
				.invoke('val')
				.then((currentTxtDeparting) => {
					expect(currentTxtDeparting.split(' ')[0]).to.eq(dayValueDeparting)
				})
		})
	})
	it('8385 | TC2: Validar autocompletado de pasajero adulto cuando no selecciona pasajeros adultos', () => {})
	it('8385 | TC3: Validar asignación de fecha automáticamente cuando solo se busca destino por pasajeros', () => {})
	it('8385 | TC4: Validar que el día de "derparting" sea un día anterior al de "returning" cuando ambos se seleccionan el mismo día', () => {})
})

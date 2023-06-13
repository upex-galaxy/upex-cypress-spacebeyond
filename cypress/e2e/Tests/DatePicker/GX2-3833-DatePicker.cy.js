import { datepicker } from '@pages/DatePicker'
import { tripDatabase } from '@pages/DatePicker'
import { months } from '@pages/DatePicker'
describe('GX2-3833|✅SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('Preconditions', () => {
		cy.visit('/')
	})
	it('3834 | TC1: Validate that the user searches for destination by departure and return date along with the type of passenger', () => {
		datepicker.clickDeparturepicker()
		datepicker.get.datePickerModal().should('exist')
		datepicker.selectDeparture()
		datepicker.clickOK()
		cy.wait(1000)
		datepicker.clickReturnpicker()
		datepicker.selectReturn()
		datepicker.clickOK()

		datepicker.clickAdultsdropdown()
		datepicker.selectAdultnumber()
		datepicker.clickChildrenDropdown()
		datepicker.selectChildrenumber()

		datepicker.clickSelectDestination()

		cy.wrap(months).then((depmonth, retmonth) => {
			if (months.depmonth != months.retmonth) {
				datepicker.get.customerTripInfo().then((info) => {
					cy.wrap(info)
						.invoke('text')
						.then((info) => {
							cy.wrap(tripDatabase).then((departureDate, returnDate, numberOfchildren, numberOfadults, totalPassengers) => {
								cy.wrap(info).should(
									'equal',
									`${tripDatabase.totalPassengers} travelers, ${tripDatabase.departureDate} – ${tripDatabase.returnDate}`
								)
							})
						})
				})
			} else {
				datepicker.get.customerTripInfo().then((info) => {
					cy.wrap(info)
						.invoke('text')
						.then((info) => {
							cy.wrap(tripDatabase).then(
								(departureDate, returnDate, numberOfchildren, numberOfadults, totalPassengers, returnDateSliced) => {
									cy.wrap(info).should(
										'equal',
										`${tripDatabase.totalPassengers} travelers, ${tripDatabase.departureDate} –${tripDatabase.returnDateSliced}`
									)
								}
							)
						})
				})
			}
		})
	})
})

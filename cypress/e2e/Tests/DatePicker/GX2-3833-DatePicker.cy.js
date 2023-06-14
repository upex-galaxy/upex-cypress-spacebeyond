import { datepicker } from '@pages/DatePicker'
import { tripDatabase } from '@pages/DatePicker'

describe('GX2-3833|✅SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('Preconditions', () => {
		cy.visit('/')
	})
	it('3834 | TC1: Validate that the user searches for destination by departure and return date along with the type of passenger', () => {
		datepicker.clickDeparturepicker()
		datepicker.get.datePickerModal().should('exist')
		datepicker.selectDeparture()
		datepicker.clickOK()
		cy.wait(500)
		datepicker.clickReturnpicker()
		datepicker.get.datePickerModal().should('exist')
		datepicker.selectReturn()
		datepicker.clickOK()
		datepicker.clickAdultsdropdown()
		datepicker.selectAdultnumber()
		datepicker.clickChildrenDropdown()
		datepicker.selectChildrenumber()
		datepicker.get.selectDestinationButton().should('be.enabled').and('exist')
		datepicker.clickSelectDestination()
		datepicker.getWebTripData()
		cy.wrap(tripDatabase).then(() => {
			if (tripDatabase.departureMonth != tripDatabase.returningMonth) {
				expect(tripDatabase.webTripData).contains(tripDatabase.totalPassengers)
				expect(tripDatabase.webTripData).contains(tripDatabase.departureDate)
				expect(tripDatabase.webTripData).contains(tripDatabase.returnDate)
			} else {
				expect(tripDatabase.webTripData).contains(tripDatabase.totalPassengers)
				expect(tripDatabase.webTripData).contains(tripDatabase.departureDate)
				expect(tripDatabase.webTripData).contains(tripDatabase.returnDateSliced)
			}
		})
	})
	it('3834 | TC2: Validate that the user searches for destination by departure and return date.', () => {
		datepicker.clickDeparturepicker()
		datepicker.get.datePickerModal().should('exist')
		datepicker.selectDeparture()
		datepicker.clickOK()
		cy.wait(500)
		datepicker.clickReturnpicker()
		datepicker.get.datePickerModal().should('exist')
		datepicker.selectReturn()
		datepicker.clickOK()
		datepicker.get.selectDestinationButton().should('be.enabled').and('exist')
		datepicker.clickSelectDestination()
		datepicker.getWebTripData()
		cy.wrap(tripDatabase).then(() => {
			if (tripDatabase.departureMonth != tripDatabase.returningMonth) {
				expect(tripDatabase.webTripData).contains(tripDatabase.departureDate)
				expect(tripDatabase.webTripData).contains(tripDatabase.returnDate)
			} else {
				expect(tripDatabase.webTripData).contains(tripDatabase.departureDate)
				expect(tripDatabase.webTripData).contains(tripDatabase.returnDateSliced)
			}
		})
	})
	it('3834 | TC3: Validate that the user searches for destination by quantity and type of passenger', () => {
		datepicker.clickAdultsdropdown()
		datepicker.selectAdultnumber()
		datepicker.clickChildrenDropdown()
		datepicker.selectChildrenumber()
		datepicker.get.selectDestinationButton().should('be.enabled').and('exist')
		datepicker.clickSelectDestination()
		datepicker.retrieveDefaultDates()
		datepicker.getWebTripData()
		cy.wrap(tripDatabase).then(() => {
			if (tripDatabase.departureMonth != tripDatabase.returningMonth) {
				expect(tripDatabase.webTripData).contains(tripDatabase.departureDate)
				expect(tripDatabase.webTripData).contains(`${tripDatabase.totalPassengers} travelers`)
				expect(tripDatabase.webTripData).contains(tripDatabase.returningDate)
			} else {
				expect(tripDatabase.webTripData).contains(`${tripDatabase.totalPassengers} travelers`)
				expect(tripDatabase.webTripData).contains(tripDatabase.departureDate)
				expect(tripDatabase.webTripData).contains(tripDatabase.returningDateSliced)
			}
		})
	})
})

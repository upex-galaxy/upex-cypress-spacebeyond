import { datePicker } from '@pages/GX3-5685-Datepicker.page'

describe('GX3-5685 | ⚡️[Automation] SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach(() => {
		cy.visit('https://demo.testim.io/destinations')
		cy.url().should('include', '/destinations')
	})

	it('GX3-5718 | TC: Validar selección aleatoria en cada DatePicker.', () => {
		let randomDeparting
		let randomReturning
		let randomAdults
		let randomChildren
		const totalTravelers = randomAdults + randomChildren

		datePicker.openSelectDeparting()
		datePicker.get.selectAvailableDays().then(($days) => {
			if ($days.length > 0) {
				const randomDeparting = Math.floor(Math.random() * $days.length)
				cy.wrap($days[randomDeparting]).click()
			}
			datePicker.clickConfirmOkButton()
		})
		datePicker.openSelectReturning()
		datePicker.get.selectAvailableDays().then(($days) => {
			const daysAfterDeparting = $days.slice(randomDeparting + 1)
			if (daysAfterDeparting.length > 0) {
				const randomReturning = Math.floor(Math.random() * daysAfterDeparting.length)
				cy.wrap(daysAfterDeparting[randomReturning]).click()
			}
			datePicker.clickConfirmOkButton()
		})
		datePicker.openSelectAdults()
		datePicker.get.optionsTravelers().then(($options) => {
			const randomAdults = Math.floor(Math.random() * 4) + 2
			cy.wrap($options[randomAdults]).click()
		})
		datePicker.openSelectChildren()
		datePicker.get.optionsTravelers().then(($options) => {
			const randomChildren = Math.floor(Math.random() * 4) + 7
			cy.wrap($options[randomChildren]).click()
		})
		datePicker.clickSelectDestination
		//cy.get('.Gallery__headline-2___3amRj').should('contain.value', 'totalTravelers, randomDeparting-randomReturning')
	})
})

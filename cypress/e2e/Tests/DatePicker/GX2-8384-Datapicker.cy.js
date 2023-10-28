import { removeLogs } from '@helper/RemoveLogs'
import { spaceBeyondPage } from '@pages/GX2-8385-DataPickerPage'
removeLogs()
const departing = () => {
	spaceBeyondPage.clickDepartingInput()
	spaceBeyondPage.clickDayOnDepartingInput().then((dayValueDeparting) => {
		Cypress.env('dayDeparting', dayValueDeparting)
		spaceBeyondPage.clickButtonOk()
		spaceBeyondPage.get
			.DepartingInput()
			.invoke('val')
			.then((currentTxtDeparting) => {
				expect(currentTxtDeparting.split(' ')[0]).to.eq(dayValueDeparting)
			})
	})
}

const returning = () => {
	spaceBeyondPage.ListActiveDay().then((dayRandomReturning) => {
		Cypress.env('dayReturning', dayRandomReturning)
		spaceBeyondPage.clickDayOnReturningInput({ day: dayRandomReturning }).then(() => {
			spaceBeyondPage.clickButtonOk()
			spaceBeyondPage.get
				.ReturningInput()
				.invoke('val')
				.then((currentTxtReturning) => {
					expect(currentTxtReturning.split(' ')[0]).to.eq(dayRandomReturning)
				})
		})
	})
}
const selectAdult = () => {
	spaceBeyondPage.getTxtNumberAdults().then(([txtNumberAdult, index]) => {
		Cypress.env('numberAdult', txtNumberAdult)
		spaceBeyondPage.selectNumberAdults({ index })
		spaceBeyondPage.get
			.DropdownAdults()
			.invoke('val')
			.then((currentNumberOfAdults) => {
				expect(currentNumberOfAdults).to.eq(txtNumberAdult)
			})
	})
}

const selectChildren = () => {
	spaceBeyondPage.getTxtNumberChildren().then(([txtNumberChildren, index]) => {
		Cypress.env('numberChildren', txtNumberChildren)
		spaceBeyondPage.selectNumberChildren({ index })
		spaceBeyondPage.get
			.DropdownChildren()
			.invoke('val')
			.then((currentNumberOfChildren) => {
				expect(currentNumberOfChildren).to.eq(txtNumberChildren)
			})
	})
}

describe('SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('PRC: usuario está situado en el home del site "Space&Beyond"', () => {
		cy.visit('/')
		cy.url().should('deep.contain', 'demo.testim')
	})
	it('8385 | TC1: Validar clasificar viaje segun departing, returning y pasajeros exitosamente', () => {
		departing()
		cy.wait(1000)
		spaceBeyondPage.clickReturningInput()
		spaceBeyondPage.clickButtonRightMonth()
		cy.wait(1000)
		returning()
		selectAdult()
		selectChildren()
		spaceBeyondPage.clickButtonSelectDest()
		spaceBeyondPage.get
			.elementInfoJourneyGallery()
			.invoke('text')
			.then((currentJourneyValues) => {
				let sumTravelers = parseInt(Cypress.env('numberAdult')) + parseInt(Cypress.env('numberChildren'))
				expect(currentJourneyValues).to.contain(Cypress.env('dayDeparting'))
				expect(currentJourneyValues).to.contain(Cypress.env('dayReturning'))
				expect(currentJourneyValues).to.include(sumTravelers)
			})
	})

	it('8385 | TC2: Validar autocompletado de pasajero adulto cuando no selecciona pasajeros adultos', () => {
		departing()
		cy.wait(1000)
		spaceBeyondPage.clickReturningInput()
		spaceBeyondPage.clickButtonRightMonth()
		cy.wait(1000)
		returning()
		spaceBeyondPage.clickButtonSelectDest()
		spaceBeyondPage.get
			.DropdownAdults()
			.invoke('val')
			.then((currentValAdult) => {
				expect(parseInt(currentValAdult)).to.be.greaterThan(0).and.to.eq(1)
			})
	})
	it('8385 | TC3: Validar asignación de fecha automáticamente cuando solo se busca destino por pasajeros', () => {
		selectAdult()
		selectChildren()
		spaceBeyondPage.clickButtonSelectDest()
		spaceBeyondPage.get
			.DepartingInput()
			.invoke('val')
			.then((currentTxtDeparting) => {
				spaceBeyondPage.get
					.ReturningInput()
					.invoke('val')
					.then((currentTxtReturning) => {
						spaceBeyondPage.get
							.elementInfoJourneyGallery()
							.invoke('text')
							.then((currentJourneyValues) => {
								expect(currentJourneyValues).to.contain(currentTxtDeparting.split(' ')[0])
								expect(currentJourneyValues).to.contain(currentTxtReturning.split(' ')[0])
							})
					})
			})
	})
	it('8385 | TC4: Validar que el día de "derparting" sea un día anterior al de "returning" cuando ambos se seleccionan el mismo día', () => {})
})

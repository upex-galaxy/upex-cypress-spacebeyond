let rday
let tripdata
let ranadultnum
let ranchildnum
let numberOfchildInt
let numberOfAdultInt
export let tripDatabase = {}
class DatePicker {
	get = {
		datePickerModal: () => cy.get('[class$="dialog___1RQhu"]'),
		datePickers: () => cy.get('[class$="___RaqVV"]'),
		dates: () => cy.get('[class$="filled___1UI7Z"]'),
		okButton: () => cy.get('button[class~="theme__button___3HGWm"]').eq(1),
		availableDays: () => cy.get('[class="theme__day___3cb3g"]'),
		dateHeader: () => cy.get('[class="theme__date___2R1Ad"]'),
		adultsDropdown: () => cy.get('[class^="theme__dropdown___co-4M"]').first(),
		dropDownvalues: () => cy.get('li:not([class$="selected___3y0b0"])'),
		childrenDropdown: () => cy.get('[class^="theme__dropdown___co-4M"]').eq(1),
		selectDestinationButton: () => cy.get('button[class$="Hero__cta-button___9VskW"]'),
		customerTripInfo: () => cy.get('h3[class="Gallery__headline-2___3amRj"]'),
	}
	clickDeparturepicker() {
		this.get.datePickers().first().click()
	}
	selectDeparture() {
		return this.get
			.availableDays()
			.then((days) => {
				rday = Cypress._.random(0, days.length - 1)
				Cypress.env('rday', rday)
				cy.wrap(days).eq(rday).click()
				this.get
					.dateHeader()
					.then((date) => {
						Cypress.env('depdate', date.text().substring(5))
						tripDatabase.departureMonth = Cypress.env('depmonth', date.text().slice(0, -3).substring(5))
					})
					.then(() => {
						return Cypress.env('depdate')
					})
			})
			.then(() => {
				tripDatabase.departureDate = Cypress.env('depdate')
			})
	}
	clickOK() {
		this.get.okButton().should('be.visible').click()
	}
	clickReturnpicker() {
		this.get.datePickers().last().click()
	}
	selectReturn() {
		return this.get
			.availableDays()
			.then((days) => {
				rday = Cypress._.random(Cypress.env('rday') + 1, days.length - 1)
				cy.wrap(days).eq(rday).click()
				cy.wait(1000)
				this.get.dateHeader().then((date) => {
					Cypress.env('retdate', date.text().substring(5))
					tripDatabase.returningMonth = Cypress.env('retmonth', date.text().slice(0, -3).substring(5))
					tripDatabase.returnDateSliced = date.text().substring(8)
				})
			})
			.then(() => {
				return Cypress.env('retdate')
			})
			.then(() => {
				tripDatabase.returnDate = Cypress.env('retdate')
			})
	}
	clickAdultsdropdown() {
		this.get.adultsDropdown().click()
	}
	selectAdultnumber() {
		return this.get.adultsDropdown().within(() => {
			this.get
				.dropDownvalues()
				.then((values) => {
					ranadultnum = Cypress._.random(0, values.length - 1)
					this.get
						.dropDownvalues()
						.eq(ranadultnum)
						.then((number) => {
							numberOfAdultInt = parseInt(number.text())
							Cypress.env('ranadultnum', numberOfAdultInt)
						})
					this.get.dropDownvalues().eq(ranadultnum).click()
				})
				.then(() => {
					return Cypress.env('ranadultnum')
				})
				.then(() => {
					tripDatabase.numberOfAdults = Cypress.env('ranadultnum')
				})
		})
	}
	clickChildrenDropdown() {
		this.get.childrenDropdown().click()
	}
	selectChildrenumber() {
		return this.get.childrenDropdown().within(() => {
			this.get
				.dropDownvalues()
				.then((values) => {
					ranchildnum = Cypress._.random(0, values.length - 1)
					this.get
						.dropDownvalues()
						.eq(ranchildnum)
						.then((number) => {
							numberOfchildInt = parseInt(number.text())
							Cypress.env('ranchildnum', numberOfchildInt)
						})
					this.get.dropDownvalues().eq(ranchildnum).click()
				})
				.then(() => {
					return Cypress.env('ranchildnum')
				})
				.then(() => {
					tripDatabase.numberOfChildren = Cypress.env('ranchildnum')
					const totalOfpassengers = Cypress.env('ranchildnum') + Cypress.env('ranadultnum')
					tripDatabase.totalPassengers = totalOfpassengers
				})
		})
	}

	clickSelectDestination() {
		this.get.selectDestinationButton().click()
	}
	getWebTripData() {
		this.get.customerTripInfo().then((info) => {
			cy.wrap(info)
				.invoke('text')
				.then((trip) => {
					return Cypress.env('tripdata', trip)
				})
				.then(() => {
					tripDatabase.webTripData = Cypress.env('tripdata')
				})
		})
	}
	retrieveDefaultDates() {
		this.get.datePickers().first().click()
		this.get.dateHeader().then((date) => {
			Cypress.env('depdate', date.text().substring(5))
			tripDatabase.departureDate = Cypress.env('depmonth', date.text().substring(5))
		})
		this.get.okButton().click()
		cy.wait(500)
		this.get.datePickers().last().click()
		this.get.dateHeader().then((date) => {
			tripDatabase.returningDate = Cypress.env('retdate', date.text().substring(5))
			tripDatabase.returningDateSliced = Cypress.env('retdate2', date.text().substring(9))
		})
		this.get.okButton().click()
		cy.log('**The departure and return dates have been selected by default!**')
	}
}
export const datepicker = new DatePicker()

let rday
let tripdata
let ranadultnum
let ranchildnum
let numberOfchildInt
let numberOfAdultInt
export let selectedDayNumber
export let tripDatabase = {}

class DatePicker {
	get = {
		datePickerModal: () => cy.get('[class$="dialog___1RQhu"]'),
		datePickers: () => cy.get('[class$="___RaqVV"]'),
		dates: () => cy.get('[class$="filled___1UI7Z"]'),
		okButton: () => cy.get('button[class~="theme__button___3HGWm"]').eq(1),
		availableDays: () => cy.get('div[class="theme__day___3cb3g"]'),
		dateHeader: () => cy.get('[class="theme__date___2R1Ad"]'),
		adultsDropdown: () => cy.get('[class^="theme__dropdown___co-4M"]').first(),
		dropDownvalues: () => cy.get('li:not([class$="selected___3y0b0"])'),
		childrenDropdown: () => cy.get('[class^="theme__dropdown___co-4M"]').eq(1),
		selectDestinationButton: () => cy.get('button[class$="Hero__cta-button___9VskW"]'),
		customerTripInfo: () => cy.get('h3[class="Gallery__headline-2___3amRj"]'),
		fullSelectedDates: () => cy.get('[class$="theme__filled___1UI7Z"]'),
		monthYearTitle: () => cy.get('[class="theme__title___2Ue3-"]'),
		leftArrowMonth: () => cy.get('[id="left"]'),
		selectedDay: () => cy.get('[class$="theme__active___2k63V"]'),
	}
	clickDeparturepicker() {
		this.get.datePickers().first().click()
		this.get.monthYearTitle().then((title) => Cypress.env('month&yearDepart', title.text()))
	}
	selectDeparture() {
		this.get
			.availableDays()
			.then((days) => {
				rday = Cypress._.random(0, days.length - 1)
				Cypress.env('rday', rday)
				cy.wrap(days).eq(rday).click()
				this.get.selectedDay().then((daynumber) => {
					selectedDayNumber = daynumber.text()
					Cypress.env.selectedNumber = selectedDayNumber
				})

				this.get
					.dateHeader()
					.then((date) => {
						Cypress.env('depdate', date.text().substring(5))
						tripDatabase.departureMonth = Cypress.env('depmonth', date.text().slice(0, -3).substring(5))
					})
					.then(() => {
						Cypress.env('depdate')
					})
			})
			.then(() => {
				tripDatabase.departureDate = Cypress.env('depdate')
			})
	}
	clickOK() {
		this.get.okButton().should('be.visible').click()
	}
	retrieveFullDepartureDate() {
		this.get
			.fullSelectedDates()
			.first()
			.then((fulldate) => {
				cy.wrap(fulldate)
					.invoke('val')
					.then((value) => {
						Cypress.env('fullDepartureDate', value)
						cy.log(Cypress.env('fullDepartureDate'))
						tripDatabase.fullDepartureDate = Cypress.env('fullDepartureDate')
					})
			})
	}
	retrieveFullDepartureDateAfter() {
		this.get
			.fullSelectedDates()
			.first()
			.then((fulldate) => {
				cy.wrap(fulldate)
					.invoke('val')
					.then((value) => {
						Cypress.env('fullDepartureDate', value)
						tripDatabase.fullDepartureDateAfter = Cypress.env('fullDepartureDate')
					})
			})
	}
	clickReturnpicker() {
		this.get.datePickers().last().click()
		this.get.monthYearTitle().then((title) => Cypress.env('month&yearReturn', title.text()))
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
	waitForAsyncOperationsToComplete() {
		return cy.wrap(true) // Dummy Cypress command to wait for completion
	}
	selectReturnSameDate() {
		if (Cypress.env('month&yearDepart') != Cypress.env('month&yearReturn')) {
			this.get.leftArrowMonth().click()
			this.get.availableDays().contains(Cypress.env.selectedNumber).click()
		} else {
			this.get.availableDays().contains(Cypress.env.selectedNumber).click()
		}
	}
}
export const datepicker = new DatePicker()

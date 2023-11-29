class BuscarDestino {
	get = {
		datePicker: () => cy.get('[data-react-toolbox="date-picker"] input'),
		wrapDatePicker: () => cy.get("[data-react-toolbox='dialog']"),
		onlyDaysEnabled: () => cy.get('[data-react-toolbox="day"]:not([class*=disable]):not([class*=active])'),
		buttonRight: () => cy.get('#right'),
		buttonDestination: () => cy.get('[class*="CTAButton__primary"]'),
		elementDatePicker: () => cy.get("[data-react-toolbox='button']"),
		selectAdults: () => cy.get('[data-react-toolbox="dropdown"]'),
		assertSelectAdult: () => cy.get('[data-react-toolbox="dropdown"] input'),
		listDropdown: () => cy.get("ul[class*='WhiteDropDown']"),
	}

	selectDeparting() {
		this.get.datePicker().eq(0).click()
	}
	selectReturning() {
		this.get.datePicker().eq(1).click()
	}
	selectDropAdults() {
		this.get.selectAdults().first().click()
	}
	selectDropChildren() {
		this.get.selectAdults().eq(1).click()
	}
	buttonConfirm() {
		cy.get("[data-react-toolbox='button']").contains('Ok').click()
	}

	selectDay() {
		this.get.onlyDaysEnabled().then(($days) => {
			const numDays = $days.length - 1
			const dayRandom = Math.floor(Math.random() * numDays)
			this.get.buttonRight().click()
			cy.wrap($days)
				.eq(dayRandom)
				.then(($Day) => {
					const textDay = $Day.text()
					cy.log(textDay)
					cy.wrap($Day).click()
				})
		})
	}
	getTextForAssertDeparting() {
		cy.wait(500)
		this.get
			.datePicker()
			.eq(0)
			.its('val')
			.then((val) => {
				Cypress.env('valueDateDeparting', val)
				cy.log(val)
			})
	}
	getTextForAssertReturning() {
		cy.wait(500)
		this.get
			.datePicker()
			.eq(0)
			.its('val')
			.then((val) => {
				Cypress.env('valueDateReturning', val)
				cy.log(val)
			})
	}

	randomDays() {
		this.get.wrapDatePicker().within(() => {
			this.get.buttonRight().click()
			this.get.onlyDaysEnabled().then((days) => {
				cy.log(days)
				if (assert(days.length > 0)) {
					cy.log('>0')
					this.selectDay()
				} 
			})
			this.buttonConfirm()
		})
	}
	randomSelectAdults() {
		this.get
			.listDropdown()
			.first()
			.children()
			.then(($options) => {
				cy.log($options)
				const randomList = Math.floor(Math.random() * ($options.length - 1) + 1)
				Cypress.env('valueSelectAdult', randomList)
				cy.wrap($options)
					.eq(randomList)
					.then(($val) => {
						cy.wrap($val).click({ force: true })
						cy.get('[data-react-toolbox="dropdown"] input').first().should('have.value', randomList)
					})
			})
	}

	randomSelectChildren() {
		this.get
			.listDropdown()
			.last()
			.children()
			.then(($options) => {
				cy.log($options)
				const randomList = Math.floor(Math.random() * ($options.length - 1) + 1)
				Cypress.env('valueSelectChildren', randomList)
				cy.wrap($options)
					.eq(randomList)
					.then(($val) => {
						cy.wrap($val).click({ force: true })
						cy.get('[data-react-toolbox="dropdown"] input').eq(1).should('have.value', randomList)
					})
			})
	}

	totalPassenger() {
		const adults = parseInt(Cypress.env('valueSelectAdult'))
		const children = parseInt(Cypress.env('valueSelectChildren'))
		return adults + children
	}
	setDates() {
		const departingDate = Cypress.env('DepartingDate')
		const returningDate = Cypress.env('ReturningDate')
		let departing = new Date(departingDate)
		let returning = new Date(returningDate)
		let dateDeparting = departing.toLocaleDateString('default', { month: 'short', day: 'numeric' })
		let dateReturning = returning.toLocaleDateString('default', { month: 'short', day: 'numeric' })
		return { dateDeparting, dateReturning };
	}
}
export const buscarDestinoPage = new BuscarDestino()

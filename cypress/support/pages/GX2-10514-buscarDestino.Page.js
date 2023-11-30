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
		titleMonth: () => cy.get('span.theme__title___2Ue3-'),
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

	randomDaysDeparting(num) {
		this.get.wrapDatePicker().within(() => {
			for (let i = 0; i < num; i++) {
				this.get.buttonRight().click()
			}
			cy.wait(500)
			this.get.titleMonth().then(($month) => {
				cy.wrap($month).then(($Month) => {
					const textDate = $Month.text()
					cy.log('el texto del mes es:' + textDate)
					Cypress.env('textOnlyMonthDeparting', textDate)
				})
			})
			this.get.onlyDaysEnabled().then(($days) => {
				const numDays = $days.length - 1
				cy.log('la cantidad de dias es:' + numDays)
				const dayRandom = Math.floor(Math.random() * numDays)
				cy.wrap($days)
					.eq(dayRandom)
					.then(($Day) => {
						const textDay = $Day.text()
						cy.log('el texto del dia es:' + textDay)
						Cypress.env('textOnlyDayDeparting', textDay)
						cy.wrap($Day).click()
					})
			})
			this.buttonConfirm()
		})
	}
	getTextMonthDeparting() {
		const onlyMonthDeparting = Cypress.env('textOnlyMonthDeparting').substring(0, 3)
		return onlyMonthDeparting
	}
	getTextDayDeparting() {
		const dayDeparting = Cypress.env('textOnlyDayDeparting')
		return dayDeparting
	}
	randomDaysReturning(num) {
		this.get
			.wrapDatePicker()
			.first()
			.within(() => {
				for (let i = 0; i < num; i++) {
					this.get.buttonRight().click()
				}
				cy.wait(500)
				this.get.titleMonth().then(($month) => {
					cy.wrap($month).then(($Month) => {
						const textDate = $Month.text()
						cy.log('el texto del mes es:' + textDate)
						const onlyMonth = textDate.substring(0, 3)
						Cypress.env('textOnlyMonthReturning', onlyMonth)
						cy.log('solo el mes es:' + onlyMonth)
					})
				})
				this.get.onlyDaysEnabled().then(($days) => {
					const numDays = $days.length - 1
					cy.log('la cantidad de dias es:' + numDays)
					const dayRandom = Math.floor(Math.random() * numDays)
					cy.wrap($days)
						.eq(dayRandom)
						.then(($Day) => {
							const textDay = $Day.text()
							cy.log('el texto del dia es:' + textDay)
							Cypress.env('textOnlyDayReturning', textDay)
							cy.wrap($Day).click()
						})
				})
				this.buttonConfirm()
			})
	}
	getTextMonthReturning() {
		const onlyMonthReturning = Cypress.env('textOnlyMonthReturning').substring(0, 3)
		return onlyMonthReturning
	}
	getTextDayReturning() {
		const dayReturning = Cypress.env('textOnlyDayReturning')
		return dayReturning
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
}
export const buscarDestinoPage = new BuscarDestino()

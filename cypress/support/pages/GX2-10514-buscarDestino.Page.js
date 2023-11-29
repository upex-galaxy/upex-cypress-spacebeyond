class BuscarDestino {
	get = {
		datePicker: () => cy.get('[data-react-toolbox="date-picker"] input'),
		wrapDatePicker: () => cy.get("[data-react-toolbox='dialog']"),
		onlyDaysEnabled: () => cy.get('[data-react-toolbox="day"]:not([class*=disable]):not([class*=active])'),
		buttonRight: () => cy.get('#right'),
		elementDatePicker: () => cy.get("[data-react-toolbox='button']"),
		selectAdults: () => cy.get('//li[text()="Adults (18+)"]/ancestor::*[@data-react-toolbox="dropdown"]//input'),
		selectChildren: () => cy.get('//*[text()="Children (0-7)"]/ancestor::*[@data-react-toolbox="dropdown"]//input'),
		selectMonth: () => cy.get('(//div[@data-react-toolbox="month"]//span)[1]'),
		clickYear: () => cy.get('#years'),
		selectYear: () => cy.get('//ul[@data-react-toolbox="years"]'),
		selectDay: () => cy.get('[data-react-toolbox="day"]'),
		dayCurrent: () => cy.get('[data-react-toolbox="day"][class*=theme__active] span'),
	}

	selectDeparting() {
		this.get.datePicker().eq(0).click()
	}
	selectReturning() {
		this.get.datePicker().eq(1).click()
	}

	selectDay() {
		this.get.onlyDaysEnabled().then(($days) => {
			const numDays = $days.length - 1
			const dayRandom = Math.random() * numDays
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
	getTextForAssert() {
		cy.wait(400)
		this.get
			.datePicker()
			.eq(0)
			.its('val')
			.then((val) => {
				Cypress.env('valueDate', val)
				cy.log(val)
			})
	}

	buttonConfirm() {
		cy.get("[data-react-toolbox='button']").contains('Ok').click()
	}

	randomDays() {
			this.get.wrapDatePicker().within(() => {
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
}
export const buscarDestinoPage = new BuscarDestino()

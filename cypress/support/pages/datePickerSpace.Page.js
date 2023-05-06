class DatePicker {
	get = {
		nextMonthButton: () => cy.get('#right'),
		previousButton: () => cy.get('#left'),
		monthContainer: () => cy.get('[data-react-toolbox="month"]').children('[class*=title]'),
		disabledDay: () => cy.get('[class*="disabled"]'),
		activeDay: () => cy.get('[class*=theme__day___3cb3g]:not([class*=disabled]):not([class*=active])'),
		dayParent: () => cy.get('[class*=days]'),
		departingSelect: () => cy.get('label.theme__label___tqKDt').contains('Departing').parent(),
		Years: () => cy.get('[data-react-toolbox="years"]'),
		yearsInput: () => cy.get('#years'),
	}
	getAvailableMonthsYear() {
		let availableMonthsYear = []
		for (let index = 0; index < 11; index++) {
			this.get.dayParent().then((daysMonth) => {
				if (daysMonth.find('[class*=theme__day___3cb3g]:not([class*=disabled])').length > 0) {
					cy.log('hay dias disponibles')
					this.get.monthContainer().then((monthYear) => {
						const MonthYear = monthYear.text()
						availableMonthsYear.push(MonthYear)
						this.get.nextMonthButton().click()
						cy.wait(400)
					})
				} else {
					cy.log('no hay dias disponibles')
					this.get.nextMonthButton().click()
					cy.wait(400)
				}
			})
		}
		return availableMonthsYear
	}
	selectMonth(availableMonthsYear) {
		const monthRandom = availableMonthsYear[0]
		this.get.monthContainer().then((monthYear) => {
			const MonthYear = monthYear.text()
			const arrayMonthYear = MonthYear.split(' ') //separar mes del a;o en dos array
			const actualMonth = arrayMonthYear[0]
			cy.log(actualMonth) //debug
			cy.log(monthRandom) //debug
			switch (actualMonth) {
				case monthRandom:
					cy.log('El mes seleccionado es igual')
					break
				default:
					cy.log('El mes seleccionado no es igual, next')
					this.get.nextMonthButton().click()
					cy.wait(400)
					this.selectMonth(availableMonthsYear)
			}
		})
	}
	selectCorrespondYear(availableMonthsYear) {
		const yearAvailable = availableMonthsYear[1]
		this.get.yearsInput().click()
		this.get
			.Years()
			.children('[class*=active]')
			.then((yearValue) => {
				if (yearValue.text() === yearAvailable) {
					cy.log('a;o seleccionado es igual')
				} else {
					this.get.Years().children().contains(yearAvailable).click({ force: true })
				}
			})
	}
	getRandomMonthYear(availableMonthsYear) {
		const randomIndex = Cypress._.random(0, availableMonthsYear.length - 1)
		const monthYearSelected = availableMonthsYear[randomIndex].split(' ') //separar mes del a;o en dos array
		return monthYearSelected
	}
	selectRandonDayAvailable() {
		let daySelect = []
		this.get.activeDay().then((availableDays) => {
			const randomIndex = Cypress._.random(0, availableDays.length - 1)
			this.get
				.activeDay()
				.eq(randomIndex)
				.click()
				.then((daySelected) => {
					daySelect.push(daySelected.text())
				})
		})
		return daySelect
	}
}
export const datePicker = new DatePicker()

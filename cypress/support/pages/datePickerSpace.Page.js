class DatePicker {
	get = {
		nextMonthButton: () => cy.get('#right'),
		previousButton: () => cy.get('#left'),
		monthContainer: () => cy.get('[data-react-toolbox="month"]').children('[class*=title]'),
		disabledDay: () => cy.get('[class*="disabled"]'),
		activeDay: () => cy.get('[class*=theme__day___3cb3g]:not([class*=disabled]):not([class*=active])'),
		dayParent: () => cy.get('[class*=days]'),
		selectDatePicker: (nameDatePicker) => cy.get('label.theme__label___tqKDt').contains(nameDatePicker).parent(),
		Years: () => cy.get('[data-react-toolbox="years"]'),
		yearsInput: () => cy.get('#years'),
		buttonOKofDatePicker: () => cy.get('[data-react-toolbox="button"]').contains('Ok'),
		resultInput: () => cy.get('h3'),
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
		return monthRandom
	}
	selectCorrespondYear(availableMonthsYear) {
		const yearAvailable = availableMonthsYear[1]
		this.get.yearsInput().click()
		this.get.Years().children().contains(yearAvailable).click({ force: true })
		return yearAvailable
	}
	getRandomMonthYear({ MonthsYear, nameDatePicker }) {
		if (nameDatePicker === 'Returning') {
			const randomIndex = Cypress._.random(1, MonthsYear.length - 1)
			const monthYearSelected = MonthsYear[randomIndex].split(' ') //separar mes del a;o en dos array
			return monthYearSelected
		} else {
			const randomIndex = Cypress._.random(0, MonthsYear.length - 2)
			const monthYearSelected = MonthsYear[randomIndex].split(' ') //separar mes del a;o en dos array
			return monthYearSelected
		}
	}
	selectRandomDayAvailable() {
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
	getDatePickerValue(nameDatePicker) {
		let valueDatePicker = []
		this.get
			.selectDatePicker(nameDatePicker)
			.children('[class*=WhiteDatePicker]')
			.invoke('val')
			.then((value) => {
				valueDatePicker.push(value)
			})
		return valueDatePicker
	}
	selectRandomDate({ datePickerName, dateDepartingSelected }) {
		let date = []
		this.get.selectDatePicker(datePickerName).click()
		const availableMonthsYear = this.getAvailableMonthsYear()
		cy.get('*').then(() => {
			const randomMonthYear = this.getRandomMonthYear({ MonthsYear: availableMonthsYear, nameDatePicker: datePickerName })
			cy.get('*').then(() => {
				const year = this.selectCorrespondYear(randomMonthYear)
				const month = this.selectMonth(randomMonthYear)
				const day = this.selectRandomDayAvailable()
				this.get.buttonOKofDatePicker().click()
				cy.get('*').then(() => {
					const dateSelected = `${day} ${month} ${year}`
					date.push(dateSelected)
				})
			})
		})
		return date
	}
	selectSpecificDate({ nameDatePicker, dateSelect }) {
		const datePattern = /(\d{1,2})\s(\w+)\s(\d{4})/ // Expresión regular para buscar patrones de fechas en formato dd month yyyy
		const dateMatch = datePattern.exec(dateSelect) // Ejecutar la expresión regular en el string y guardar los resultados en un array
		const day = dateMatch[1]
		const monthYear = [dateMatch[2], dateMatch[3]]
		this.get.selectDatePicker(nameDatePicker).click()
		this.selectMonth(monthYear)
		this.selectCorrespondYear(monthYear)
		this.get.activeDay().contains(day).click()
		this.get.buttonOKofDatePicker().click()
		cy.log(monthYear)
		cy.log(day)
	}
}
export const datePicker = new DatePicker()

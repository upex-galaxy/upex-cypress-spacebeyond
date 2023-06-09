class SearchDestiny {
	get = {
		datePicker: () => cy.get('[data-react-toolbox="date-picker"]'),
		dayCalendar: () => cy.get('.theme__days___3kAIy'),
		availableDay: () => cy.get('[class*=theme__day___3cb3g]:not([class*=disabled]):not([class*=active])'),
		actualMonth: () => cy.get('[class=theme__month___27O28]:not([class*=disabled])'),
		leftBtn: () => cy.get('#left'),
		rightBtn: () => cy.get('#right'),
		monthTitle: () => cy.get('.theme__title___2Ue3-'),
		OkBtn: () => cy.contains('button', 'Ok').click(),
		adults: () => cy.get('[value*="Adults"]'),
		passengerDropdownList: () => cy.get('ul[class*="WhiteDropDown__values___3lOeL"]'),
		adultDropdownList: () => cy.get('input[class*="WhiteDropDown__inputInputElement___2wTPU"]').eq(0),
		children: () => cy.get('[value*="Children"]'),
		childrenDropdownList: () => cy.get('ul[class*="WhiteDropDown__values___3lOeL"]'),
		selectDestinationBtn: () => cy.contains('button', 'Select Destination'),
		YearList: () => cy.get('.theme__calendarWrapper___15gNf > div > ul > li'),
		activeYear: () => cy.get('li[class="theme__active___2k63V"]'),
		galleryTitle: () => cy.get('h3[class=Gallery__headline-2___3amRj]'),
		departingDatePicker: () => cy.get('input[class*="WhiteDatePicker__inputElement___3d9uL"]').eq(0),
		returningDatePicker: () => cy.get('input[class*="WhiteDatePicker__inputElement___3d9uL"]').eq(1),
	}

	clickDepartingDate() {
		return this.get.datePicker().eq(0).click()
	}
	clickReturningDay() {
		return this.get.datePicker().eq(1).click()
	}
	clickOkBtn() {
		this.get.OkBtn().click({ force: true })
	}

	selectDay() {
		let random
		const arrayDays = []
		this.get.actualMonth().within(() => {
			this.get
				.availableDay()
				.each((day) => {
					arrayDays.push(day.text())
				})
				.then(() => {
					random = arrayDays[Math.floor(Math.random() * arrayDays.length - 1)]
					Cypress.env('randomDay', random)
					searchDestiny.get.dayCalendar().children().eq(Cypress.env('randomDay')).click()
				})
		})
	}
	selectMonth() {
		const arrayMonth = []

		return this.get
			.monthTitle()
			.then(() => {
				// obtengo lista de todos los meses
				for (let month = 0; month < 11; month++) {
					this.get.monthTitle().then((text) => {
						Cypress.env('textMonth', text.text().split(' ')[0])
						arrayMonth.push(Cypress.env('textMonth'))
						searchDestiny.get.rightBtn().click()
					})
				}
				// vuelvo al mes original
				for (let month = 0; month < 11; month++) {
					searchDestiny.get.leftBtn().click()
				}
			})
			.then(() => {
				// busco posición ultimo mes
				const mesDiciembre = arrayMonth.indexOf('December')
				// random entre mes actual y ultimo mes
				const randomMonth = Math.floor(Math.random() * mesDiciembre - 1)

				for (let random = 0; random <= randomMonth; random++) {
					searchDestiny.get.rightBtn().click()
				}
				// guardo el random mes en una variable
				this.get.monthTitle().then((text) => {
					Cypress.env('randomMonth', text.text().split(' ')[0])
					cy.log(Cypress.env('randomMonth'))
				})
			})
	}
	selectYear() {
		return cy
			.get('#years')
			.click()
			.then(() => {
				cy.get('.theme__calendarWrapper___15gNf > div > ul > li').then(() => {
					cy.get('li[class="theme__active___2k63V"]').click()
				})
			})
	}
	clickAdults() {
		this.get.adults().click()
	}
	selectAdults() {
		let random = [1, 2, 3, 4]
		let randomAdults = Math.floor(Math.random() * random.length + 1)
		this.get
			.passengerDropdownList()
			.eq(0)
			.within(() => {
				cy.get('li').eq(randomAdults).click()
			})
	}
	clickChildren() {
		this.get.children().click()
	}
	selectChildren() {
		let random = [1, 2, 3, 4]
		let randomChildren = Math.floor(Math.random() * random.length + 1)
		this.get
			.passengerDropdownList()
			.eq(1)
			.within(() => {
				cy.get('li').eq(randomChildren).click()
			})
	}
	clickSelectDestinationBtn() {
		this.get.selectDestinationBtn().click()
	}
	getSumPassenger() {
		return cy
			.get('input[class*="theme__inputElement___27dyY"]')
			.eq(2)
			.invoke('val')
			.then((val) => {
				Cypress.env('adultQty', val)
				cy.log(Cypress.env('adultQty'))
			})
			.then(() => {
				cy.get('input[class*="theme__inputElement___27dyY"]')
					.eq(3)
					.invoke('val')
					.then((val) => {
						Cypress.env('childrenQty', val)
						cy.log(Cypress.env('childrenQty'))
						let qtyAdults = parseInt(Cypress.env('adultQty'))
						let qtyChildren = parseInt(Cypress.env('childrenQty'))
						let suma = qtyAdults + qtyChildren
						Cypress.env('sumPassenger', suma)
						cy.log(Cypress.env('sumPassenger'))
					})
			})
	}
	getDeparture() {
		return cy
			.get('input[type=text]')
			.eq(0)
			.invoke('val')
			.then((val) => {
				let textMonth = val.split(' ')[1]
				let day = val.split(' ')[0]
				let month = textMonth.substring(0, 3)
				let departDay = month + ' ' + parseInt(day)
				Cypress.env('departureDay', departDay)
			})
	}
	getReturn() {
		return cy
			.get('input[type=text]')
			.eq(1)
			.invoke('val')
			.then((val) => {
				let textMonth = val.split(' ')[1]
				Cypress.env('day', val.split(' ')[0])
				let month = textMonth.substring(0, 3)
				let returnDay = month + ' ' + parseInt(Cypress.env('day'))
				Cypress.env('returnDay', returnDay)
			})
	}
	selectSameDepartingDay() {
		this.get
			.actualMonth()
			.eq(0)
			.within(() => {
				cy.get('div[class=theme__days___3kAIy] > div')
				cy.get('[class*="theme__active___2k63V"]').then((text) => {
					let nextDay = parseInt(Cypress.env('text1', text.text()))
					Cypress.env('nextDay', nextDay)
					cy.contains('div', Cypress.env('nextDay') + 1).click()
				})
			})
	}
	selectSameReturnDay() {
		this.get
			.actualMonth()
			.eq(1)
			.within(() => {
				cy.get('div[class=theme__days___3kAIy]').within(() => {
					cy.contains('div', Cypress.env('nextDay') + 1).click()
				})
			})
	}
}
export const searchDestiny = new SearchDestiny()

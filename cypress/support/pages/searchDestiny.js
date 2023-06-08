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
		children: () => cy.get('[value*="Children"]'),
		childrenDropdownList: () => cy.get('ul[class*="WhiteDropDown__values___3lOeL"]'),
		selectDestinationBtn: () => cy.contains('button', 'Select Destination'),
		YearList: () => cy.get('.theme__calendarWrapper___15gNf > div > ul > li'),
		activeYear: () => cy.get('li[class="theme__active___2k63V"]'),
		galleryTitle: () => cy.get('h3[class=Gallery__headline-2___3amRj]'),
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
					random = arrayDays[Math.floor(Math.random() * arrayDays.length)]
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
				const randomMonth = Math.floor(Math.random() * mesDiciembre)

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
		cy.get('input[class*="theme__inputElement___27dyY"]')
			.eq(2)
			.invoke('val')
			.then((val) => {
				Cypress.env('adultQty', val)
				cy.log(Cypress.env('adultQty'))
			})
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
	}
}
export const searchDestiny = new SearchDestiny()

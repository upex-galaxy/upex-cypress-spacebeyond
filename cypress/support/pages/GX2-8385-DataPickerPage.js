class DataPicker {
	get = {
		DepartingInput: () => cy.get("[class*='Hero'] [class*='RaqVV']:nth-child(1) [class*='3d9uL']"),
		ReturningInput: () => cy.get("[class*='Hero'] [class*='RaqVV']:nth-child(2) [class*='3d9uL']"),
		buttonRightMonth: () => cy.get('#right'),
		DaysActiveOptions: () => cy.get("[class$='3kAIy'] [data-react-toolbox='day']:not(div[class$='theme__disabled___2N4Gy'])"),
		ButtonOk: () => cy.get("[class*='theme__button___14VKJ']:nth-child(2)"),
		ButtonSelectDest: () => cy.get("[class$='button___9VskW']"),
		DropdownAdults: () => cy.get("[class*='Hero__form-box'] div:nth-child(3) [class*='1UI7Z']"),
		DropdownChildren: () => cy.get("[class*='Hero__form-box'] div:nth-child(4) [class*='1UI7Z']"),
		AllAdultsOptions: () => cy.get("[class$='2pwg4'] div:nth-child(3) [class$='3lOeL'] li"),
		AllChildrenOptions: () => cy.get("[class$='2pwg4'] div:nth-child(4) [class$='3lOeL'] li"),
		elementInfoJourneyGallery: () => cy.get('[class="Gallery__headline-2___3amRj"]'),
	}

	clickDepartingInput() {
		this.get.DepartingInput().click()
	}

	clickReturningInput() {
		this.get.ReturningInput().click()
	}
	clickButtonRightMonth() {
		this.get.buttonRightMonth().click()
	}

	clickButtonOk() {
		this.get.ButtonOk().click()
	}
	clickButtonSelectDest() {
		this.get.ButtonSelectDest().click()
	}
	clickDropdownAdults() {
		this.get.DropdownAdults().click()
	}

	clickDropdownChildren() {
		this.get.DropdownChildren().click()
	}
	clickDayOnDepartingInput() {
		return this.get.DaysActiveOptions().then(($daysOptions) => {
			const optionsText = $daysOptions.map((index, element) => element.innerText)
			const randomIndex = Cypress._.random(0, optionsText.length - 1)
			cy.wrap($daysOptions).eq(randomIndex).click()
			return cy.wrap($daysOptions).eq(randomIndex).invoke('text')
		})
	}

	clickDayOnReturningInput({ day: day }) {
		return this.get.DaysActiveOptions().then((daysOptions) => {
			daysOptions.each((index, daysOptions) => {
				let text = daysOptions.innerText
				if (text == day) {
					cy.wrap(daysOptions).click()
				}
			})
		})
	}
	ListActiveDay() {
		return this.get.DaysActiveOptions().then(($daysOptions) => {
			const ListDaysText = $daysOptions.map((index, element) => element.innerText)
			let randomIndex = Cypress._.random(0, ListDaysText.length - 1)
			return ListDaysText[randomIndex]
		})
	}

	selectNumberAdults({ index: index }) {
		this.get.AllAdultsOptions().then((adultOptions) => {
			cy.wrap(adultOptions).eq(index).click()
		})
	}

	getTxtNumberAdults() {
		this.get.DropdownAdults().click()
		return this.get.AllAdultsOptions().then((adultOptions) => {
			let index = Cypress._.random(1, adultOptions.length - 1)
			cy.wrap(adultOptions)
				.eq(index)
				.invoke('text')
				.then((txt) => {
					return [txt, index]
				})
		})
	}

	selectNumberChildren({ index: index }) {
		this.get.AllChildrenOptions().then((childrenOptions) => {
			cy.wrap(childrenOptions).eq(index).click()
		})
	}

	getTxtNumberChildren() {
		this.get.DropdownChildren().click()
		return this.get.AllChildrenOptions().then((childrenOptions) => {
			let index = Cypress._.random(1, childrenOptions.length - 1)
			cy.wrap(childrenOptions)
				.eq(index)
				.invoke('text')
				.then((txt) => {
					return [txt, index]
				})
		})
	}
}
export const spaceBeyondPage = new DataPicker()

class HomePage {
	get = {
		departingPicker: () => cy.get('[class ^= theme__input] input').eq(0),
		returningPicker: () => cy.get('[class ^= theme__input] input').eq(1),
		adultsPicker: () => cy.get('[class^="theme__dropdown___co-4M"]').eq(0),
		childrenPicker: () => cy.get('[class^="theme__dropdown___co-4M"]').eq(1),
		containerDatePicker: () => cy.get('.Hero__form-box___126DY'),
		//Pop up calendar
		popUpCalendar: () => cy.get('[class ^= theme__dialog]'),
		calendarDays: () => cy.get('[class^= theme__day___3cb3g]').not('[class$=theme__disabled___2N4Gy]'),
		rightButton: () => cy.get('[id=right]'),
		leftButton: () => cy.get('[id=left]'),
		okButton: () => cy.get('[class^=theme__button___1iKuo ][class$=theme__button___14VKJ]').eq(1),
		//dropdown passenger
		selectPassengers: () => cy.get('[class ^= theme__values___1jS4g][class$= WhiteDropDown__values___3lOeL] li'),
		//text
		textValidation: () => cy.get('[class = Gallery__headline-2___3amRj]'),
	}

	selectDepartingDate() {
		const randomMonth = Cypress._.random(0, 4)
		cy.log('departing', randomMonth)

		this.get.departingPicker().click()
		this.get.popUpCalendar().should('be.visible')
		for (let i = 0; i <= randomMonth - 1; i++) {
			this.get.rightButton().click()
		}
		cy.wait(800)
		this.get.calendarDays().then((index) => {
			const randomDay = Cypress._.random(0, index.length - 1)
			this.get.calendarDays().eq(randomDay).click()
			this.get.okButton().click()
		})
	}
	selectReturningDate() {
		const randomMonth = Cypress._.random(0, 1)
		cy.log('returning', randomMonth)
		cy.wait(800)
		this.get.returningPicker().click()
		this.get.popUpCalendar().should('be.visible')
		for (let i = 0; i <= randomMonth - 1; i++) {
			this.get.rightButton().click()
		}
		cy.wait(800)
		this.get.calendarDays().then((index) => {
			const randomDay = Cypress._.random(0, index.length - 1)
			this.get.calendarDays().eq(randomDay).click()
			this.get.okButton().click()
		})
	}

	selectAdults() {
		this.get.adultsPicker().click()
		this.get.adultsPicker().within(() => {
			this.get.selectPassengers().then((value) => {
				const randomPassenger = Cypress._.random(0, value.length - 1)
				this.get.selectPassengers().eq(randomPassenger).click()
			})
		})
	}
	selectChildren() {
		this.get.childrenPicker().click()
		this.get.childrenPicker().within(() => {
			this.get.selectPassengers().then((value) => {
				const randomPassenger = Cypress._.random(0, value.length - 1)
				this.get.selectPassengers().eq(randomPassenger).click()
			})
		})
	}
}

export const homePage = new HomePage()

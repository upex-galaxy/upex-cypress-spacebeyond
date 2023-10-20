class HomePage {
	get = {
		departingPicker: () => cy.get('[class ^= theme__input] input').eq(0),
		returningPicker: () => cy.get('[class ^= theme__input] input').eq(1),
		adultsPicker: () => cy.get('[class ^= theme__input] input').eq(2),
		childrenPicker: () => cy.get('[class ^= theme__input] input').eq(3),
		containerPicker: () => cy.get('.Hero__form-box___126DY'),

		//Pop up calendar
		popUpCalendar: () => cy.get('[class ^= theme__dialog]'),
		calendarDays: () => cy.get('[class= theme__day___3cb3g] span').and('be.visible'),
		currentDaysMonth: () => cy.get('[class^= theme__day]').not('[class$=theme__disabled___2N4Gy]'),
		rightButton: () => cy.get('[id=right]'),
		leftButton: () => cy.get('[id=left]'),
	}

	selectDeparting() {
		const randomMonth = 4
		cy.log(randomMonth)
		this.get.departingPicker().click()
		this.get.popUpCalendar().should('be.visible')
		for (let i = 0; i <= randomMonth - 1; i++) {
			this.get.rightButton().click()
		}
		cy.wait(800)
		this.get.calendarDays().then((index) => {
			console.log(index)
			cy.log(index.length)
		})
	}
}

export const homePage = new HomePage()

class dataPicker {
	get = {
		inputDateDeparting: () => cy.get('[class*="WhiteDatePicker"]').eq(0),
		inputDay: () => cy.get('[data-react-toolbox="day"]:not([class="theme__day___3cb3g theme__disabled___2N4Gy"])'),
		buttonOk: () => cy.get('[class*="button___14"]').eq(1),
		inputDateReturn: () => cy.get('[class*="WhiteDatePicker"]').eq(1),
		dropDownAdults: () => cy.get('[class*="WhiteDropDown__inputInputElement"]').eq(0),
		optionsNroPasajero: () => cy.get('[class*="WhiteDropDown__dropdown___2JJF3 t"] ul li'),
		dropDownChildren: () => cy.get('[class*="WhiteDropDown__inputInputElement"]').eq(1),
		buttonSelectDestination: () => cy.get('[class*="CTAButton__primary___WQCBB Hero_"]'),
		elementInfoGallery: () => cy.get('.Gallery__headline-2___3amRj'),
	}

	clickDateDeparting() {
		this.get.inputDateDeparting().click()
	}
	clickDay() {
		this.get
			.inputDay()
			.its('length')
			.then((cant) => {
				const randomsDay = Cypress._.random(0, cant - 1)
				this.get.inputDay().eq(randomsDay).should('exist').click()
			})
	}
	clickButtonOk() {
		this.get.buttonOk().click()
	}

	getValuesDate(typeDropDw) {
		return this.get[typeDropDw]().invoke('val')
	}

	clickDateReturn() {
		this.get.inputDateReturn().click()
		cy.wait(800)
	}

	selectDropDwOf(selectDropDw) {
		this.get[selectDropDw]().click()
		return this.get
			.optionsNroPasajero()
			.its('length')
			.then((cant) => {
				const random = Cypress._.random(1, cant - 1)

				return this.get
					.optionsNroPasajero()
					.eq(random)
					.click()
					.then(() => {
						this.get[selectDropDw]()
							.invoke('val')
							.then((cantPasaj) => {
								if (selectDropDw.includes('Adults')) {
									return cantPasaj
									//cy.log(cantPasaj)
								} else {
									return cantPasaj
									//cy.log(cantPasaj)
								}
							})
					})
			})
	}
	clickButtonSelectDestination() {
		this.get.buttonSelectDestination().click()
	}
}
export const dataPickerPage = new dataPicker()

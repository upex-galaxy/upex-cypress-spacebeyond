class DataPicker {
	get = {
		DepartingInput: () => cy.get("[class*='Hero'] [class*='RaqVV']:nth-child(1) [class*='3d9uL']"),
		ReturningInput: () => cy.get("[class*='Hero'] [class*='RaqVV']:nth-child(2) [class*='3d9uL']"),
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
}

class DatePickerPageSpaceBeyond {
	get = {
		selectDeparting: () => cy.get('input[type=text]').eq(0),
		selectReturning: () => cy.get('input[type=text]').eq(1),
		selectAvailableDays: () => cy.get('.theme__day___3cb3g').not('.theme__disabled___2N4Gy'),
		selectAdults: () => cy.get('input[role=input]').eq(2),
		selectChildren: () => cy.get('input[role=input]').eq(3),
		confirmOkButton: () => cy.get('button[type=button]').eq(11),
		selectDestination: () => cy.get('.Hero__cta-button___9VskW'),
		optionsTravelers: () => cy.get('.theme__values___1jS4g.WhiteDropDown__values___3lOeL li'),
	}
	openSelectDeparting() {
		this.get.selectDeparting().click()
	}
	openSelectReturning() {
		this.get.selectReturning().click()
	}
	openSelectAdults() {
		this.get.selectAdults().click()
	}
	openSelectChildren() {
		this.get.selectChildren().click()
	}
	clickSelectDestination() {
		this.get.selectDestination().click()
	}
	clickConfirmOkButton() {
		this.get.confirmOkButton().click()
	}
}
export const datePicker = new DatePickerPageSpaceBeyond()

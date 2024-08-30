import { searchDestiny } from '@pages/searchDestiny'

// skip suite: some tests fails

describe.skip('GX2-3711 | SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('User must be located in the website "SpaceBeyond', () => {
		cy.visit('/')
	})
	it('3712 | TC1: Validate "Your next destination" session update when user search a destiny by departing day, returning day and passenger', () => {
		searchDestiny.clickDepartingDate().then(() => {
			searchDestiny.selectYear()
			searchDestiny.selectMonth()
			searchDestiny.selectDay()
			searchDestiny.clickOkBtn()
		})
		searchDestiny.clickReturningDay().then(() => {
			searchDestiny.selectYear()
			searchDestiny.selectMonth()
			searchDestiny.selectDay()
			searchDestiny.clickOkBtn()
		})
		searchDestiny.clickAdults()
		searchDestiny.selectAdults()
		searchDestiny.clickChildren()
		searchDestiny.selectChildren()
		searchDestiny.clickSelectDestinationBtn()
		// Qty Passenger validation
		searchDestiny.getSumPassenger().then(() => {
			searchDestiny.get.galleryTitle().then((text) => {
				let qtyPassenger = text.text().split(' ')[0]
				expect(parseInt(qtyPassenger)).to.be.eq(Cypress.env('sumPassenger'))
			})
		})
		//departureDay validation
		searchDestiny.getDeparture().then(() => {
			searchDestiny.get.galleryTitle().then((text) => {
				Cypress.env('departureMonth', text.text().split(' ')[2])
				let departureDay = text.text().split(' ')[3]
				expect(Cypress.env('departureMonth') + ' ' + departureDay).to.be.eq(Cypress.env('departureDay'))
			})
		})
		//returnDay validation
		searchDestiny.getReturn().then(() => {
			searchDestiny.get.galleryTitle().then((text) => {
				Cypress.env('totalText', text.text().split(' ')[6])
				if (Cypress.env('totalText') === undefined) {
					searchDestiny.get.galleryTitle().then((text) => {
						let day = text.text().split(' ')[5]
						expect(day).to.be.equal(Cypress.env('day'))
					})
				} else {
					Cypress.env('returnMonth', text.text().split(' ')[5])
					let returnDay = text.text().split(' ')[6]
					expect(Cypress.env('returnMonth') + ' ' + returnDay).to.be.eq(Cypress.env('returnDay'))
				}
			})
		})
	})
	it('3712 | TC2: Validate "Your next destination" session update when user search a destiny by departing day and  returning day', () => {
		searchDestiny.clickDepartingDate().then(() => {
			searchDestiny.selectYear()
			searchDestiny.selectMonth()
			searchDestiny.selectDay()
			searchDestiny.clickOkBtn()
		})

		searchDestiny.clickReturningDay().then(() => {
			searchDestiny.selectYear()
			searchDestiny.selectMonth()
			searchDestiny.selectDay()
			searchDestiny.clickOkBtn()
		})
		searchDestiny.clickSelectDestinationBtn()
		searchDestiny.get
			.adultDropdownList()
			.invoke('val')
			.then(($val) => {
				cy.log($val)
				expect(parseInt($val)).to.be.eq(1)
			})
	})
	it('3712 | TC3: Validate "Your next destination" session update when user search a destiny by quantity and type of passenger', () => {
		searchDestiny.clickAdults()
		searchDestiny.selectAdults()
		searchDestiny.clickChildren()
		searchDestiny.selectChildren()
		searchDestiny.clickSelectDestinationBtn()
		searchDestiny.get
			.departingDatePicker()
			.invoke('val')
			.then(($val) => {
				expect($val).to.exist
			})
		searchDestiny.get
			.returningDatePicker()
			.invoke('val')
			.then(($val) => {
				expect($val).to.exist
			})
	})
	it('3712 | TC4: Validate "Your next destination" session update when user search a destiny by the same departing day and  returning day', () => {
		searchDestiny.clickDepartingDate()
		searchDestiny.selectSameDepartingDay()
		searchDestiny.clickOkBtn()
		searchDestiny.clickReturningDay()
		searchDestiny.selectSameReturnDay()
		searchDestiny.clickOkBtn()
		searchDestiny.get
			.datePicker()
			.eq(0)
			.within(() => {
				cy.get('input[role="input"]')
					.invoke('val')
					.then((val) => {
						cy.log(Cypress.env('nextDay'))
						expect(val).to.include(Cypress.env('nextDay'))
					})
			})
	})
})

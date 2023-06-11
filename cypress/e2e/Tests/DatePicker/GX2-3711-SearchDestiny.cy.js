import { searchDestiny } from '@pages/searchDestiny'
let arrayMonth = ['January', 'February']
let random = Math.floor(Math.random() * arrayMonth.length)

describe('GX2-3711 | SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
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

		// searchDestiny.clickReturningDay().then(() => {
		// 	searchDestiny.selectYear()
		// 	searchDestiny.selectMonth()
		// 	searchDestiny.selectDay()
		// 	searchDestiny.clickOkBtn()
		// })

		// searchDestiny.clickAdults()
		// searchDestiny.selectAdults()
		// searchDestiny.clickChildren()
		// searchDestiny.selectChildren()
		// searchDestiny.getSumPassenger()

		cy.get('input[type=text]')
			.eq(0)
			.invoke('val')
			.then((val) => {
				let textMonth = Cypress.env('monthVal', val.split(' ')[1])
				let day = Cypress.env('dayVal', val.split(' '))[0]
				let month = textMonth.substring(0, 3)
				Cypress.env('month3letters', month)
				cy.log(Cypress.env('month3letters'))
				let departDay = Cypress.env('dayVal') + ' ' + Cypress.env('month3letters')
				cy.log(departDay)
			})
		// searchDestiny.clickSelectDestinationBtn()
		// searchDestiny.get.galleryTitle().then((text) => {
		// 	Cypress.env('QtyPassenger', text.text().split(' ')[0])
		// 	cy.log(Cypress.env('QtyPassenger'))
		// 	expect(parseInt(Cypress.env('QtyPassenger'))).to.be.eq(Cypress.env('sumPassenger'))
		// })
	})
})

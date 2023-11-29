import { buscarDestinoPage } from '@pages/GX2-10514-buscarDestino.Page'

describe('GX2-10514 | SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('Precondición', () => {
		cy.visit('https://demo.testim.io/')
		cy.url().should('contain', 'testim')
	})
	it.only('10515 | TC1 : Validar buscar destino por fecha de partida y retorno junto con tipo de pasajero ', () => {
		//buscarDestinoPage.clickDataPicker()
		/*	cy.get('[data-react-toolbox="date-picker"] input').eq(0).click()
		cy.get('[data-react-toolbox="day"][class*=theme__active] span').click()
		cy.get('[data-react-toolbox="button"]').contains('Ok').click()

		cy.get('[data-react-toolbox="date-picker"]').eq(1).click()
		cy.get('#right').click()
		cy.get('[data-react-toolbox="day"] span').contains('15').click()
		cy.get('[data-react-toolbox="button"]').contains('Ok').click()
		cy.get('[class^="theme__dropdown___co-4M"]').first().click()
		cy.get('div[data-react-toolbox="dropdown"] ul').contains('2').click()
*/

		buscarDestinoPage.selectDeparting()
		buscarDestinoPage.randomDays()
		buscarDestinoPage.getTextForAssertDeparting()
		buscarDestinoPage.selectReturning()
		buscarDestinoPage.randomDays()
		buscarDestinoPage.getTextForAssertReturning()
	
		buscarDestinoPage.selectDropAdults()
		buscarDestinoPage.randomSelectAdults()
		
		buscarDestinoPage.selectDropChildren()
		buscarDestinoPage.randomSelectChildren()
			
		buscarDestinoPage.get.buttonDestination()
			.first()
					.click()
					.then(() => {
						const TotalTrav = buscarDestinoPage.totalPassenger()
						cy.log(TotalTrav)
						cy.get('h3').should('contain', `${TotalTrav} travelers`)
						const dates = buscarDestinoPage.setDates().dateDeparting - buscarDestinoPage.setDates().dateReturning
						cy.get('h3').should('have.to', `${dates}`)
					})
			
	})
	it('10515 | TC2 : Validar buscar destino solo por fecha de partida y retorno. ', () => {})
	it('10515 | TC3 : Validar buscar destino destino solo por cantidad y tipo de pasajeros ', () => {})
	it('10515 | TC4 : Validar buscar destino por misma fecha de partida y retorno ', () => {})
})

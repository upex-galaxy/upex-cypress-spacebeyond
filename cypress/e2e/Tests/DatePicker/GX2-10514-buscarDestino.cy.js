import { buscarDestinoPage } from '@pages/GX2-10514-buscarDestino.Page'
const selectTravelAndGetInformation = () => {
	buscarDestinoPage.selectDeparting()
	buscarDestinoPage.randomDaysDeparting(3)
	
	buscarDestinoPage.selectReturning()
	buscarDestinoPage.randomDaysReturning(2)
	
}
const selectPassenger = () => {
	buscarDestinoPage.selectDropAdults()
	buscarDestinoPage.randomSelectAdults()
	buscarDestinoPage.selectDropChildren()
	buscarDestinoPage.randomSelectChildren()
}

describe('GX2-10514 | SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('Precondición', () => {
		cy.visit('https://demo.testim.io/')
		cy.url().should('contain', 'testim')
	})
	it('10515 | TC1 : Validar buscar destino por fecha de partida y retorno junto con tipo de pasajero ', () => {
		selectTravelAndGetInformation()
		selectPassenger()
		buscarDestinoPage.get
			.buttonDestination()
			.first()
			.click()
			.then(() => {
				const TotalTrav = buscarDestinoPage.totalPassenger()
				cy.log(TotalTrav)
				cy.get('h3').should('contain', `${TotalTrav} travelers`)
				const monthDeparting = buscarDestinoPage.getTextMonthDeparting()
				const dayDeparting = buscarDestinoPage.getTextDayDeparting()
				const monthReturning = buscarDestinoPage.getTextMonthReturning()
				const dayReturning = buscarDestinoPage.getTextDayReturning()
				cy.log(monthDeparting)
				cy.get('h3').should('contain', `${monthDeparting} ${dayDeparting}`)
				cy.get('h3').should('contain', `${monthReturning} ${dayReturning}`)
			})
	})
	it('10515 | TC2 : Validar buscar destino solo por fecha de partida y retorno. ', () => {
			selectTravelAndGetInformation()
			buscarDestinoPage.get
				.buttonDestination()
				.first()
				.click()
				.then(() => {
					const monthDeparting = buscarDestinoPage.getTextMonthDeparting()
					const dayDeparting = buscarDestinoPage.getTextDayDeparting()
					const monthReturning = buscarDestinoPage.getTextMonthReturning()
					const dayReturning = buscarDestinoPage.getTextDayReturning()
					cy.log(monthDeparting)
					cy.get('h3').should('contain', `${monthDeparting} ${dayDeparting}`)
					cy.get('h3').should('contain', `${monthReturning} ${dayReturning}`)
				})
	})
	it('10515 | TC3 : Validar buscar destino destino solo por cantidad y tipo de pasajeros ', () => {
			selectPassenger()
			buscarDestinoPage.get
				.buttonDestination()
				.first()
				.click()
				.then(() => {
					const TotalTrav = buscarDestinoPage.totalPassenger()
					cy.log(TotalTrav)
					cy.get('h3').should('contain', `${TotalTrav} travelers`)
				})
	})
	
})

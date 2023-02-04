import { pickerDate } from '@pages/Date.Page'
const { baseUrl } = Cypress.env()
describe('✅SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('PRC: El usuario esta situado en el home del site Space&Beyond', () => {
		cy.visit(baseUrl)
	})
	it('7002 | TC1: Validar usuario busca destino por fecha de partida y retorno junto con tipo de pasajero.', () => {
		//PRIMER TEST CASE//////
		// Starts:
		pickerDate.departing() // Open Departing:
		// Select RandomDate enabled for this month but if day is disabled find day active another month.
		pickerDate.departingDate()

		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.first()
			.its('val')
			.then((val) => {
				Cypress.env('DepartingDate', val)
				cy.log(val)
			})
		// Second Datepicker:
		pickerDate.returning() // Open Returning:
		// Select RandomDate enabled for this month but if day is disabled find day active another month.
		pickerDate.returningDate()

		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.eq(1)
			.its('val')
			.then((val) => {
				Cypress.env('ReturningDate', val)
				cy.log(val)
			})
		pickerDate.adults() // Open Dropdown
		//Select Random Age for Adult person
		pickerDate.randomAdults()
		// Select cant for children
		pickerDate.children() // Open Dropdown
		//Select Random Age for Children person
		pickerDate.randomChild()
		//SEARCH TRAVEL + ASSERTION DE PASAJEROS Y DATE
		cy.get("[class*='CTAButton']")
		.first()
		.click()
		.then(() => {
			//ASSERTION PASAJEROS NIÑOS + ADULTOS
			cy.log(Cypress.env('AdultsQty'))
			cy.log(Cypress.env('childrenQty'))
			const AdultsNum = parseInt(Cypress.env('AdultsQty'))
			const ChildrenNum = parseInt(Cypress.env('childrenQty'))
			const TotalTrav = AdultsNum + ChildrenNum
			cy.log(TotalTrav)
			// this.get.AssertionTrav()
			cy.get('h3').should('contain', `${TotalTrav} travelers`)
			//ASSERTION DATE MES - DIA DE DEPARTING AND RETURNING
			console.log(Cypress.env('DepartingDate'))
			console.log(Cypress.env('ReturningDate'))
			let date_departing = Cypress.env('DepartingDate')
			let Departing = new Date(date_departing)
			let dateDeparting = Departing.toLocaleDateString('default', { month: 'short', day: 'numeric' })
			let date_returning = Cypress.env('ReturningDate')
			let Returning = new Date(date_returning)
			let dateReturning = Returning.toLocaleDateString('default', { month: 'short', day: 'numeric' })
			// this.get.AssertionDate()
			cy.get('h3').should('have.to', `${dateDeparting - dateReturning}`)
			})           
			
		
	})
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	it('7002 | TC2: Validar usuario busca destino solo por fecha de partida y retorno.', () => {
		//SEGUNDO TEST CASE/////////////////////////////////////
		// Starts:
		pickerDate.departing() // Open Departing:
		// Select RandomDate enabled for this month but if day is disabled find day active another month.
		pickerDate.departingDate()
		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.eq(0)
			.its('val')
			.then((val) => {
				Cypress.env('DepartingDate', val)
				cy.log(val)
			})
		// Second Datepicker:
		pickerDate.returning() // Open Returning:
		// Select RandomDate enabled for this month but if day is disabled find day active another month.
		pickerDate.returningDate()
		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.eq(1)
			.its('val')
			.then((val) => {
				Cypress.env('ReturningDate', val)
				cy.log(val)
				//SEARCH TRAVEL + ASSERTION DE PASAJEROS Y DATE
				cy.get("[class*='CTAButton']")
					.first()
					.click()
					.then(() => {
						//ASSERTION PASAJEROS NIÑOS + ADULTOS
						cy.log(Cypress.env('AdultsQty'))
						// const AdultsNum = parseInt(Cypress.env('AdultsQty'))
						// const ChildrenNum = parseInt(Cypress.env('childrenQty'))
						// const TotalTrav = AdultsNum + ChildrenNum
						console.log(Cypress.env('ReturningDate'))
						cy.get('h3').should('contain', 'traveler')
						let date_departing = Cypress.env('DepartingDate')
						let Departing = new Date(date_departing)
						let dateDeparting = Departing.toLocaleDateString('default', { month: 'short', day: 'numeric' })
						let date_returning = Cypress.env('ReturningDate')
						let Returning = new Date(date_returning)
						let dateReturning = Returning.toLocaleDateString('default', { month: 'short', day: 'numeric' })
						cy.get('h3').should('have.to', `${dateDeparting - dateReturning}`)
					})
			})
	})
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	it('7002 | TC3: Validar usuario busca destino solo por cantidad y tipo de pasajeros.', () => {
		//TERCER TEST CASE /////////////////////////////////
		pickerDate.adults() // Open Dropdown
		//Select Random Age for Adult person
		pickerDate.randomAdults()
		// Select cant for children
		pickerDate.children() // Open Dropdown
		//Select Random Age for Children person
		pickerDate.randomChild()
		//SEARCH TRAVEL + ASSERTION DE PASAJEROS Y DATE
		cy.get("[class*='CTAButton']")
					.first()
					.click()
					.then(() => {
						//ASSERTION PASAJEROS NIÑOS + ADULTOS
						cy.log(Cypress.env('AdultsQty'))
						cy.log(Cypress.env('childrenQty'))
						const AdultsNum = parseInt(Cypress.env('AdultsQty'))
						const ChildrenNum = parseInt(Cypress.env('childrenQty'))
						const TotalTrav = AdultsNum + ChildrenNum
						cy.log(TotalTrav)
						console.log(Cypress.env('DepartingDate'))
						console.log(Cypress.env('ReturningDate'))
						cy.get('h3').should('contain', AdultsNum)
						let date_departing = Cypress.env('DepartingDate')
						let Departing = new Date(date_departing)
						let dateDeparting = Departing.toLocaleDateString('default', { month: 'short', day: 'numeric' })
						let date_returning = Cypress.env('ReturningDate')
						let Returning = new Date(date_returning)
						let dateReturning = Returning.toLocaleDateString('default', { month: 'short', day: 'numeric' })
						cy.get('h3').should('have.to', `${dateDeparting - dateReturning}`)
					})
			
	})
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	it('7002  TC4: Validar usuario busca destino por misma fecha de partida y retorno', () => {
		/// Starts:
		pickerDate.departing() // Open Departing:
		// Select RandomDate enabled for this month but if day is disabled find day active another month.
		pickerDate.departingDate()
		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.first()
			.its('val')
			.then((val) => {
				Cypress.env('DepartingDate', val)
				cy.log(val)
			})
		// Second Datepicker:
		pickerDate.returning() // Open Returning:
		// Select RandomDate enabled for this month but if day is disabled find day active another month.
		pickerDate.returningDate()
		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.eq(1)
			.its('val')
			.then((val) => {
				Cypress.env('ReturningDate', val)
				cy.log(val)
			})
		// Open Dropdown
		pickerDate.adults()
		//Select Random Age for Adult person
		pickerDate.randomAdults()
		// Open Dropdown
		pickerDate.children()
		//Select Random Age for Children person
		pickerDate.randomChild()
		//SEARCH TRAVEL
		cy.get("[class*='CTAButton']")
			.then(() => {
				//ASSERTION PASAJEROS NIÑOS + ADULTOS
				cy.log(Cypress.env('AdultsQty'))
				cy.log(Cypress.env('childrenQty'))
				const AdultsNum = parseInt(Cypress.env('AdultsQty'))
				const ChildrenNum = parseInt(Cypress.env('childrenQty'))
				const TotalTrav = AdultsNum + ChildrenNum
				cy.log(TotalTrav)
				cy.get('h3').should('contain', `${TotalTrav} travelers`)
				//ASSERTION DATE MES - DIA DE DEPARTING AND RETURNING
				console.log(Cypress.env('DepartingDate'))
				console.log(Cypress.env('ReturningDate'))
				let date_departing = Cypress.env('DepartingDate')
				let Departing = new Date(date_departing)
				let dateDeparting = Departing.toLocaleDateString('default', { month: 'short', day: 'numeric' })
				let date_returning = Cypress.env('ReturningDate')
				let Returning = new Date(date_returning)
				let dateReturning = Returning.toLocaleDateString('default', { month: 'short', day: 'numeric' })
				cy.get('h3').should('have.to', `${dateDeparting - dateReturning}`)
				// Comparar fechas
				if (Departing.getTime() === Returning.getTime()) {
					// Si son iguales, sumar un día a la fecha de partida
					Departing.setDate(Departing.getDate() + 1)
					date_departing = Departing.toISOString()
					dateDeparting = Departing.toLocaleDateString('default', { month: 'short', day: 'numeric' })
				}
			})
	})
})

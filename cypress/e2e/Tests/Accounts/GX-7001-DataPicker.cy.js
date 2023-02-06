const {baseUrl} = Cypress.env()
describe('✅SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('PRC: El usuario esta situado en el home del site Space&Beyond', () => {
		cy.visit(baseUrl)
	})
	it.only('Validar usuario busca destino por fecha de partida y retorno junto con tipo de pasajero.', () => {//PRIMER TEST CASE//////
		// Starts:
		cy.get("[data-react-toolbox='date-picker'] input").eq(0).click() // Open Departing: // LISTO
		//Select Random Date enabled for this month
		cy.get("[data-react-toolbox='dialog']").within((datePicker) => {
			cy.get('[data-react-toolbox="day"]:not([class*=disable]):not([class*=active])').then((days) => {
				cy.log(days)
				if (!expect(days.length).be.greaterThan(0)) {
					cy.log('🚩IF days !>=1 => Workaround is Executed')
					// Workaround:
					cy.get('[data-react-toolbox="day"]').then(($days) => {
						const list = $days.length - 1
						const dayRandom = Math.floor(Math.random() * list)
						cy.get('#right').click()
						cy.wrap($days)
							.eq(dayRandom)
							.then(($Day) => {
								const day = $Day.text()
								cy.log(day)
								cy.wrap($Day).click()
							})
					})
				} else {
					// Normal Step:
					cy.log('🚩ELSE: days >=1 => Normal Test Path is Executed')
					const list = days.length - 1
					const dayRandom = Math.floor(Math.random() * list)
					cy.wrap(days)
						.eq(dayRandom)
						.then(($Day) => {
							const day = $Day.text()
							cy.log(day)
							cy.wrap($Day).click()
						})
				}
			})
			//Click en On dentro del Departing
			cy.get("[data-react-toolbox='button']").contains('Ok').click()
		}) // FIN DEL DEPARTING (WITHIN)
		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.eq(0)
			.its('val')
			.then((val) => {
				Cypress.env('DepartingDate', val)
				cy.log(val)
			})
		// Second Datepicker:
		cy.get("[data-react-toolbox='date-picker'] input").eq(1).click() // Open Returning:
		cy.get("[data-react-toolbox='dialog']")
			.first()
			.within((datePicker) => {
				cy.get('[data-react-toolbox="day"]:not([class*=disable]):not([class*=active])').then((days) => {
					cy.log(days)
					if (!expect(days.length).be.greaterThan(0)) {
						cy.log('🚩IF days !>=1 => Workaround is Executed')
						// Workaround:
						cy.get('[data-react-toolbox="day"]').then(($days) => {
							const list = $days.length - 1
							const returnRandom = Math.floor(Math.random() * list)
							cy.get('#right').click()
							cy.wrap($days)
								.eq(returnRandom)
								.then(($Day) => {
									const day = $Day.text()
									cy.log(day)
									cy.wrap($Day).click()
								})
						})
					} else {
						// Normal Step:
						cy.log('🚩ELSE: days >=1 => Normal Test Path is Executed')
						const list = days.length - 1
						const dayRandom = Math.floor(Math.random() * list)
						cy.wrap(days)
							.eq(dayRandom)
							.then(($Day) => {
								const day = $Day.text()
								cy.log(day)
								cy.wrap($Day).click()
							})
					}
				})
				//Click en botón Ok del Date picker
				cy.get("[data-react-toolbox='button']").contains('Ok').click()
			}) //WITHIN RETURNING
		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.eq(1)
			.its('val')
			.then((val) => {
				Cypress.env('ReturningDate', val)
				cy.log(val)
			})
		cy.get('[data-react-toolbox="dropdown"]').first().click() // Open Dropdown
		//Select Random Age for Adult person
		cy.get("ul[class*='WhiteDropDown']")
			.first()
			.children()
			.then(($options) => {
				cy.log($options)
				const adults = $options.length - 1
				const randomAge = Math.floor(Math.random() * adults + 1)
				Cypress.env('AdultsQty', randomAge)
				cy.log(randomAge)
				cy.log(adults)
				cy.wrap($options)
					.eq(randomAge)
					.then(($age) => {
						cy.wrap($age).click({ force: true })
						cy.get('[data-react-toolbox="dropdown"] input').first().should('have.value', randomAge)
					})

				// Select cant for children
				cy.get('[data-react-toolbox="dropdown"]').eq(1).click() // Open Dropdown
				//Select Random Age for Children person
				cy.get("ul[class*='WhiteDropDown']")
					.last()
					.children()
					.then(($options) => {
						cy.log($options)
						const children = $options.length - 1
						const childrenCount = Math.floor(Math.random() * children + 1)
						Cypress.env('childrenQty', childrenCount)
						cy.log(childrenCount)
						cy.log(children)
						cy.wrap($options)
							.eq(childrenCount)
							.then(($age) => {
								cy.wrap($age).click({ force: true })
								cy.get('[data-react-toolbox="dropdown"] input').eq(1).should('have.value', childrenCount)
							})
					})
				//SEARCH TRAVEL
				cy.get('[class*="CTAButton"]')
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
						})
				})
			})
			
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	it('Validar usuario busca destino solo por fecha de partida y retorno.', () => { //SEGUNDO TEST CASE/////////////////////////////////////

		cy.get("[data-react-toolbox='date-picker'] input").eq(0).click() // Open Departing: // LISTO
		//Select Random Date enabled for this month
		cy.get("[data-react-toolbox='dialog']").within((datePicker) => {
			cy.get('[data-react-toolbox="day"]:not([class*=disable]):not([class*=active])').then((days) => {
				cy.log(days)
				if (!expect(days.length).be.greaterThan(0)) {
					cy.log('🚩IF days !>=1 => Workaround is Executed')
					// Workaround:
					cy.get('[data-react-toolbox="day"]').then(($days) => {
						const list = $days.length - 1
						const dayRandom = Math.floor(Math.random() * list)
						cy.get('#right').click()
						cy.wrap($days)
							.eq(dayRandom)
							.then(($Day) => {
								const day = $Day.text()
								cy.log(day)
								cy.wrap($Day).click()
							})
					})
				} else {
					// Normal Step:
					cy.log('🚩ELSE: days >=1 => Normal Test Path is Executed')
					const list = days.length - 1
					const dayRandom = Math.floor(Math.random() * list)
					cy.wrap(days)
						.eq(dayRandom)
						.then(($Day) => {
							const day = $Day.text()
							cy.log(day)
							cy.wrap($Day).click()
						})
				}
			})
			//Click en On dentro del Departing
			cy.get("[data-react-toolbox='button']").contains('Ok').click()
		}) // FIN DEL DEPARTING (WITHIN)
		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.eq(0)
			.its('val')
			.then((val) => {
				Cypress.env('DepartingDate', val)
				cy.log(val)
			})
		// Second Datepicker:
		cy.get("[data-react-toolbox='date-picker'] input").eq(1).click() // Open Returning:
		cy.get("[data-react-toolbox='dialog']")
			.first()
			.within((datePicker) => {
				cy.get('[data-react-toolbox="day"]:not([class*=disable]):not([class*=active])').then((days) => {
					cy.log(days)
					if (!expect(days.length).be.greaterThan(0)) {
						cy.log('🚩IF days !>=1 => Workaround is Executed')
						// Workaround:
						cy.get('[data-react-toolbox="day"]').then(($days) => {
							const list = $days.length - 1
							const returnRandom = Math.floor(Math.random() * list)
							cy.get('#right').click()
							cy.wrap($days)
								.eq(returnRandom)
								.then(($Day) => {
									const day = $Day.text()
									cy.log(day)
									cy.wrap($Day).click()
								})
						})
					} else {
						// Normal Step:
						cy.log('🚩ELSE: days >=1 => Normal Test Path is Executed')
						const list = days.length - 1
						const dayRandom = Math.floor(Math.random() * list)
						cy.wrap(days)
							.eq(dayRandom)
							.then(($Day) => {
								const day = $Day.text()
								cy.log(day)
								cy.wrap($Day).click()
							})
					}
				})
				//Click en botón Ok del Date picker
				cy.get("[data-react-toolbox='button']").contains('Ok').click()
			}) //WITHIN RETURNING
		cy.wait(400)
		cy.get("[data-react-toolbox='date-picker'] input")
			.eq(1)
			.its('val')
			.then((val) => {
				Cypress.env('ReturningDate', val)
				cy.log(val)
			})
	})
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	it('Validar usuario busca destino solo por cantidad y tipo de pasajeros.', () => { //TERCER TEST CASE /////////////////////////////////
		cy.get('[data-react-toolbox="dropdown"]').first().click() // Open Dropdown
		//Select Random Age for Adult person
		cy.get("ul[class*='WhiteDropDown']")
			.first()
			.children()
			.then(($options) => {
				cy.log($options)
				const adults = $options.length - 1
				const randomAge = Math.floor(Math.random() * adults + 1)
				Cypress.env('AdultsQty', randomAge)
				cy.log(randomAge)
				cy.log(adults)
				cy.wrap($options)
					.eq(randomAge)
					.then(($age) => {
						cy.wrap($age).click({ force: true })
						cy.get('[data-react-toolbox="dropdown"] input').first().should('have.value', randomAge)
					})

				// Select cant for children
				cy.get('[data-react-toolbox="dropdown"]').eq(1).click() // Open Dropdown
				//Select Random Age for Children person
				cy.get("ul[class*='WhiteDropDown']")
					.last()
					.children()
					.then(($options) => {
						cy.log($options)
						const children = $options.length - 1
						const childrenCount = Math.floor(Math.random() * children + 1)
						Cypress.env('childrenQty', childrenCount)
						cy.log(childrenCount)
						cy.log(children)
						cy.wrap($options)
							.eq(childrenCount)
							.then(($age) => {
								cy.wrap($age).click({ force: true })
								cy.get('[data-react-toolbox="dropdown"] input').eq(1).should('have.value', childrenCount)
							})
					})
			})
	})
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	it('Validar usuario busca destino por misma fecha de partida y retorno', () => {})
})

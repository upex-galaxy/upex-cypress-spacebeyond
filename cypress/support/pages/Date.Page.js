class DP {
    get= {
        DatePicker: ()=> cy.get("[data-react-toolbox='date-picker'] input"),
        Dialog: ()=> cy.get("[data-react-toolbox='dialog']"),
        ActiveDay:()=>cy.get('[data-react-toolbox="day"]:not([class*=disable]):not([class*=active])'),
        randomDay:()=>cy.get('[data-react-toolbox="day"]'),
        PasarMes:()=>cy.get('#right').click(),
        Dropdown: ()=> cy.get("[data-react-toolbox='dropdown'] input"),
        elements: ()=>cy.get("ul[class*='WhiteDropDown']"),
        buttonOk:()=>cy.get("[data-react-toolbox='button']"),
        SearchButton: ()=>cy.get("[class*='CTAButton']"),
        AssertionDW:()=> cy.get('[data-react-toolbox="dropdown"] input'),
        AssertionTrav:()=>cy.get('h3').should('contain', `${TotalTrav} travelers`),
        AssertionDate:()=>cy.get('h3').should('have.to', `${dateDeparting - dateReturning}`)

    }
        departing(){
            this.get.DatePicker().first().click()
        }
        departingDate(){
            this.get.Dialog()
            .first()
			.click()
			.within((datePicker) => {
				//pickerData.dialog()
				this.get.ActiveDay().then((days) => {
					cy.log(days)
					if (!expect(days.length).be.greaterThan(0)) {
						cy.log('🚩IF days !>=1 => Workaround is Executed')
						// Workaround:
						this.get.randomDay().then(($days) => {
							const list = $days.length - 1
							const dayRandom = Math.floor(Math.random() * list)
                            this.get.PasarMes()
							cy.wrap(days)
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
				this.get.buttonOk().eq(3).should('have.text', 'Ok').click()
			}) // FIN DEL DEPARTING (WITHIN)
        }
        returning(){
            this.get.DatePicker().eq(1).click()
        }
        returningDate(){
            this.get.Dialog()
			.eq(0)
			.click()
			.within((datePicker) => {
				this.get.ActiveDay().then((days) => {
					cy.log(days)
					if (!expect(days.length).be.greaterThan(0)) {
						cy.log('🚩IF days !>=1 => Workaround is Executed')
						// Workaround:
						this.get.randomDay().then(($days) => {
							const list = $days.length - 1
							const returnRandom = Math.floor(Math.random() * list)
							this.get.PasarMes()
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
				this.get.buttonOk().eq(3).should('have.text', 'Ok').click()
			}) //WITHIN RETURNING
        }
                adults(){
            this.get.Dropdown().first().click()
        }
        randomAdults(){
            this.get.elements()
			.first()
			.click()
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
						cy.wait(400)
						this.get.AssertionDW().first().should('have.value', randomAge)
					})
				})
        }
        children(){
            this.get.Dropdown().eq(1).click()
        }
        randomChild(){
            this.get.elements()
            .last()
            .click()
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
                        this.get.Dropdown().eq(1).should('have.value', childrenCount)
                    })
            })
        }
}
export const pickerDate = new DP();





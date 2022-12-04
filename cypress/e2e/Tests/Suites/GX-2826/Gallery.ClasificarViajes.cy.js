describe.skip('SpaceBeyond | Gallery | Clasificar viaje según destino, color y precio', () => 
{
	let the

	before('cargar data', () => 
	{
		cy.fixture('DOM/Account/Login.Page').then((data) => 
		{
			the = data
		})	
	})
	beforeEach('Precondición: Usuario debe estar situado en el Home Page de la pagina', () => 
	{
		cy.visit('https://demo.testim.io')
		cy.url().should('contain', 'testim')
		cy.contains(the.input.LoginButton).click()
		//Iniciar Sesión
		cy.get(the.input.username).type(the.data.username)
		cy.get(the.input.password).type(the.data.password)
		cy.get(the.input.LogIn).click()
	})
	it('2827 | TC1: Validar encontrar Destino por tipo y color cuando el precio seleccionado  esta en el rango mínimo', () => 
	{
		let Planet
		//Abrir Launch( destino)
		cy.get(the.input.Launch).click().should("be.visible")
		//Seleccionar un Launch aleatorio
        cy.contains("ul","Launch").within(()=>
		{
            cy.get("li").then(($Launch)=>
			{
                const list = $Launch.length - 1
                const launchRandom = Math.floor(Math.random() * list) +1
                cy.wrap($Launch).eq(launchRandom).then((Launch)=>
				{
                    Planet = Launch.text()
                    cy.log(Planet)
                    cy.wrap(Launch).click()
                })
            })
        })
		//Abrir Planet color
		cy.get(the.input.PlanetColor).click().should("be.visible")
		//Seleccionar PlanetColor aleatorio
		cy.get("[data-react-toolbox='dropdown'] ul").eq(3).then(($Dropdown)=>{
			cy.wrap($Dropdown).children()
		})
		
		
		
		("ul","Planet color").children().not("[class*=selected]").then(($Dropdown)=>
		{
            cy.log($Dropdown.length)
			cy.pause()
			cy.wrap($Dropdown).children().each(($color)=>{

				if($color.text() !== "Planet color" ){
					cy.log("start ForEach")
					cy.wrap($color).click()

					cy.ReactHaveNotClass("card","hidden").then(($cards)=>{
						if($cards.length > 0){
							cy.wrap($cards).contains(Planet)
							cy.log("FOUND ONE ELEMENT")
							false
						}else{
							cy.get(`input[value='${$color.text()}']`).click().should("be.visible")
							cy.log("ending ForEach")
						}
					})
				}		
			})
			
			
			cy.log("vamos bien")


			cy.get("li").each(($Color)=>
			{
                // cy.wrap($Color).click()
				// cy.wait(2000)
				// cy.ReactHaveNotClass("card","hidden").then(($card)=>{
				// 	if($card.length > 0){
				// 		false
				// 		cy.wrap($card).contains(Planet)
				// 	}else{
				// 		return cy.get(the.input.PlanetColor).click().should("be.visible")
				// 	}
				// })

            })
			cy.get("[class*='Gallery']")
        })
		// const list = $Planet.length - 1
                // const planetRandom = Math.floor(Math.random() * list)
                // cy.wrap($Planet).eq(planetRandom).then((Planet)=>
				// {
                //     const nro = Planet.text()
                //     cy.log(nro)
                //     cy.wrap(Planet).click()
                // })
		



		//Seleccionar Precio
		// cy.get("input[type='text']").eq(3).click().clear().then(($slider)=>
		// {
        //     const PriceRandom = Math.floor(Math.random() * (1800 - 100) + 100)
        //     cy.wrap($slider).type(PriceRandom).should('not.have.attr', 'aria-valuenow', 100)

			// const max = 1800;
			// const min = 100;
			// const priceRandom = Math.floor(Math.random(max - min)  + min)
			// cy.get($slider).type(priceRandom)
			// expect(priceRandom, $slider).to.be.within(min, max)

			cy.get("[data-react-toolbox='progress-bar']")
			.trigger('mousemove', { clientX: 100, clientY: 500 })
			
        //})
		
	})


	/*it('2827 | TC2: Intentar encontrar Destino por tipo y  precio mínimo cuando el color no hace match con el destino ', () => {})
	it('2827 | TC3: Validar encontrar Destino por tipo y color cuando el precio seleccionado esta en el rango máximo', () => {})
	it('2827 | TC4: Intentar encontrar Destino por tipo  y precio máximo cuando el color no hace match con el destino  ', () => {})
	it('2827 | TC5: Intentar encontrar Destino por tipo y color cuando el precio esta fuera de rango', () => {})
	it('2827 | TC6: Intentar encontrar Destino por tipo cuando el color no hace match con el destino  y el precio esta fuera de rango', () => {})
	it('2827 | TC7: Validar encontrar Destino por cualquier tipo y color cuando el precio seleccionado  esta en el rango mínimo', () => {})
	it('2827 | TC8: Intentar encontrar Destino por cualquier tipo y  precio mínimo cuando el color no hace match con el destino ', () => {})
	it('2827 | TC9: Validar encontrar Destino por cualquier tipo y color cuando el precio seleccionado esta en el rango máximo', () => {})
	it('2827 | TC10: Intentar encontrar Destino por cualquier tipo  y precio máximo cuando el color no hace match con el destino', () => {})
	it('2827 | TC11: Intentar encontrar Destino por cualquier tipo y color cuando el precio esta fuera de rango ', () => {})
	it('2827 | TC12: Intentar encontrar Destino por cualquier tipo cuando el color no hace match con el destino  y el precio esta fuera de rango', () => {})*/
})

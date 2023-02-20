class HomePage {

    constructor(){
        this.homepageUrl = "https://demo.testim.io/"
    }

    elements = {
        loginBtn: () => cy.get("button").contains("Log in"),
        destinosCards: () => cy.get(".theme__card___2nWQb"),
        loadMoreBtn: () => cy.get("button").contains("Load more"),
        destinationPriceTag: () => cy.get(".GalleryItem__price-tag___3q0Al"),
        desnationCheckoutPrice: () => cy.get('.OrderSummary__headline-1___1lzsL')
        
    }


    //Metodos
    visit(){
        cy.visit(this.homepageUrl)
    }

    chooseRandomDestination(){
        //Funcion que elige un destino aleatorio
        this.elements.destinosCards().then((destinations) => {
			let randomIndex = Math.floor(Math.random() * destinations.length)
			let randomDestination = destinations.eq(randomIndex)
            let bookDestinationBtn = randomDestination.find("button")
            cy.wrap(bookDestinationBtn).click()
            //Validar que el precio del destino en la pagina de checkout sea el mismo precio del destino elegido
            this.elements.destinationPriceTag().then((destinationPrice)=>{
                this.elements.desnationCheckoutPrice().then((destiCheckPrice)=>{
                    cy.wrap(destiCheckPrice.text().replace(",","")).should("contain",destinationPrice.eq(randomIndex).text())
                })
            })
            
		})
    }
}



export const homepage = new HomePage;
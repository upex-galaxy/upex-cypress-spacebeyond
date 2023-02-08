class HomePage {

    constructor(){
        this.homepageUrl = "https://demo.testim.io/"
    }

    elements = {
        loginBtn: () => cy.get("button").contains("Log in"),
        destinosCards: () => cy.get(".theme__card___2nWQb"),
        loadMoreBtn: () => cy.get("button").contains("Load more")
    }


    //Metodos
    visit(){
        cy.visit(this.homepageUrl)
    }

    chooseRandomDestination(){
        this.elements.destinosCards().then((destinations) => {
			let randomIndex = Math.floor(Math.random() * destinations.length)
            cy.log("Destination: " + randomIndex)
			let randomDestination = destinations.eq(randomIndex)
            let bookDestinationBtn = randomDestination.find("button")
            cy.wrap(bookDestinationBtn).click()
		})
    }
}



export const homepage = new HomePage;
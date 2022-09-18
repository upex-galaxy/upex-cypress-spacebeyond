describe("window alert",()=>
{
    beforeEach(()=>
    {
        cy.visit("https://demoqa.com/alerts")
    })
    it("window:alert input is filled", () =>
    {
        cy.window().then((win) =>
        {
            const text = "Paola"
            cy.get("#promtButton").click()
            cy.stub(win, 'prompt').returns(text)
            cy.get("#promptResult").should("contain",`You entered ${text}`)
        })
    })
    it("window:alert input is empty", () =>
    {
        cy.window().then((win) =>
        {
            cy.get("#promtButton").click()
            cy.stub(win, 'prompt').callsFake(()=> null)
            cy.get("#promptResult").should("not.exist")
        })
    })
})



//________________________________________________________________________
// Comando predeterminado para que no ocurran errores de excepciones:
Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false
})
// Comando predeterminado para que no aparezcan los Fetch en el log del Test Runner:
const origLog = Cypress.log
Cypress.log = function (opts, ...other) {
	if (opts.displayName === 'xhr'|| opts.displayName === 'fetch' && opts.url.startsWith('https://')) {
		return
	}
	return origLog(opts, ...other)
}

// ** COPIA Y PEGA EN CADA SUITE QUE SE REALICE CON UN SUT DE MUCHO FETCH Y XHR O PROBLEMAS DE EXCEPCIÓN 
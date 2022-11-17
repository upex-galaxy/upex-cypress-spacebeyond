describe("SpaceBeyond | Gallery | Clasificar viaje según destino, color y precio", () =>
{
    beforeEach("Precondición: Usuario debe estar situado en el Home Page de la pagina", () =>
    {
        cy.visit("https://demo.testim.io/")
        cy.url().should("contain","testim")
        cy.login("delia","1")
    })
    it("2827 | TC1: Validar encontrar Destino por tipo y color cuando el precio seleccionado  esta en el rango mínimo", () =>
    {
                //abrir el dropdown Launch( destino)
                cy.get("[value='Launch']").eq(0)
                .click({force:true})
            cy.get("[data-react-toolbox='dropdown']").eq(3)
                .should("be.visible")
    
    })
    it("2827 | TC2: Intentar encontrar Destino por tipo y  precio mínimo cuando el color no hace match con el destino ", () =>
    {

    })
    it("2827 | TC3: Validar encontrar Destino por tipo y color cuando el precio seleccionado esta en el rango máximo", () =>
    {

    })
    it("2827 | TC4: Intentar encontrar Destino por tipo  y precio máximo cuando el color no hace match con el destino  ", () =>
    {

    })
    it("2827 | TC5: Intentar encontrar Destino por tipo y color cuando el precio esta fuera de rango", () =>
    {

    })
    it("2827 | TC6: Intentar encontrar Destino por tipo cuando el color no hace match con el destino  y el precio esta fuera de rango", () =>
    {

    })
    it("2827 | TC7: Validar encontrar Destino por cualquier tipo y color cuando el precio seleccionado  esta en el rango mínimo", () =>
    {

    })
    it("2827 | TC8: Intentar encontrar Destino por cualquier tipo y  precio mínimo cuando el color no hace match con el destino ", () =>
    {

    })
    it("2827 | TC9: Validar encontrar Destino por cualquier tipo y color cuando el precio seleccionado esta en el rango máximo", () =>
    {

    })
    it("2827 | TC10: Intentar encontrar Destino por cualquier tipo  y precio máximo cuando el color no hace match con el destino", () =>
    {

    })
    it("2827 | TC11: Intentar encontrar Destino por cualquier tipo y color cuando el precio esta fuera de rango ", () =>
    {

    })
    it("2827 | TC12: Intentar encontrar Destino por cualquier tipo cuando el color no hace match con el destino  y el precio esta fuera de rango", () =>
    {

    })
})
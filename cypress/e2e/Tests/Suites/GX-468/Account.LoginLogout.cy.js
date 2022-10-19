describe("(L1) SpaceBeyond | Account | Log-In and Log-Out", () =>
{
    beforeEach("Precondición: Usuario debe estar situado en el Login page", () =>
    {
        cy.visit("https://demo.testim.io/")
        cy.contains("Log in").click()
        cy.url().should("contain","login")
    })
    it("US-GX-474 | TC1: Validar iniciar sesión exitosamente cuando las credenciales son válidas", () =>
    {
        cy.LoginSpace("UPEX","12345Sai")
    })
    it("US-GX-474 | TC2: Validar NO poder iniciar sesión cuando el campo Name vacío", () =>
    {
        cy.LoginSpace("", "12345Sai")
        // Validate Login:
        cy.contains("Name is a required field.").should("be.visible")
        cy.contains("Password is a required field.").should("not.exist")
    })
    it("US-GX-474 | TC3: Validar NO poder iniciar sesión cuando el campo Password vacío", () =>
    {
        cy.LoginSpace("UPEX", "")
        // Validate Login:
        cy.contains("Password is a required field.").should("be.visible")
        cy.contains("Name is a required field.").should("not.exist")
    })
    it("US-GX-474 | TC4: Validar salir de sesión exitosamente luego de haber iniciado sesión", () =>
    {
        // Precondición: 
        cy.LoginSpace("UPEX", "12345Sai")
        // Acción:
        cy.get(".mui-dropdown button").click()
        cy.get(".mui--is-open a").click()
        cy.contains("Log in").should("be.visible")
    })
})
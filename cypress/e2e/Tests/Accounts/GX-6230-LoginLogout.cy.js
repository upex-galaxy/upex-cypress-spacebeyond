describe('SpaceBeyond | Account | Log-In and Log-Out', () => {
	beforeEach('PRC: Usuario logueado en la página', () => {
		cy.visit('https://demo.testim.io/')
		cy.contains('Log in').click()
		cy.url().should('contain', 'login')
	})
	it.only('US-GX-6230| TC1:  Validar Login correctamente con credenciales válidas', () => {
		//Validar Login Exitoso
		cy.get('#login > :nth-child(1) > .theme__inputElement___27dyY').type('Franco')
		cy.get('#login > :nth-child(2) > .theme__inputElement___27dyY').type('asd123')
		cy.get('.Login__button-box___1OzjH > .theme__raised___ONZv6').click()
		// cy.loginSpace('Franco', 'asd123')
	})
	it('US-GX-6230| TC2:  Validar No iniciar sesión con el campo Name vacío', () => {
		// cy.loginSpace('', 'asd123')
		//Validate Login
		cy.contains('Name is a required field.').should('be.visible')
		cy.contains('Password is a required field.').should('not.exist')
	})
	it('US-GX-6230| TC3:  Validar No iniciar sesión con el campo Password vacío', () => {
		// cy.loginSpace('Franco', '')
		//Validate Login
		cy.contains('Password is a required field.').should('be.visible')
		cy.contains('Name is a required field.').should('not.exist')
	})
	it('US-GX-6230| TC4:  Validar LogOut correctamente luego de haber iniciado sesión', () => {
		//Precondición

		// cy.loginSpace('Franco', 'asd123')
		//Acción
		cy.get('.mui-dropdown button').click()
		cy.get('.mui--is-open a').click()
		cy.contains('Log in').should('be.visible')
	})
})

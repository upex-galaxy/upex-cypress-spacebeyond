import { LogInLogOutPage } from '@pages/GX3-4775-Account-login-and-logout.Page'

const username = 'janetzi'
const password = 'casa.123'

describe('GX3-4775 | Account | Log-In and Log-Out', () => {
	beforeEach('PRC: El usuario debe estar situado en la pagina Log In de Space-Beyond', () => {
		cy.visit('https://demo.testim.io/')
		cy.contains('Button', 'Log in').click()
		cy.url().should('include', 'login')
	})

	it('4798 | TC1: Validar que se realice el inicio de sesion correctamente', () => {
		LogInLogOutPage.typeUserName(username)
		LogInLogOutPage.typePassword(password)
		LogInLogOutPage.ClickLogIn()
		LogInLogOutPage.get.labelHello().should('contain', 'Hello')
	})

	it('4798 | TC2: Validar que no se inicia sesion cuando el campo UserName esta vacio ', () => {
		LogInLogOutPage.typePassword(password)
		LogInLogOutPage.ClickLogIn()
		cy.contains('Name is a required field.').should('be.visible')
	})
	it('4798 | TC3: Validar que no se inicia sesion cuando el campo Password esta vacio ', () => {
		LogInLogOutPage.typeUserName(username)
		LogInLogOutPage.ClickLogIn()
		cy.contains('Password is a required field.').should('be.visible')
	})

	it('4798 | TC4: Validar que realizar el Log Out correctamente ', () => {
		LogInLogOutPage.typeUserName(username)
		LogInLogOutPage.typePassword(password)
		LogInLogOutPage.ClickLogIn()
		LogInLogOutPage.ClickLogOut()
		cy.contains('Button', 'Log in').should('exist')
	})
})

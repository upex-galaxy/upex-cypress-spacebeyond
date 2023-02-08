const { checkoutPage } = require('@pages/Checkout.Page')
const { homepage } = require('@pages/Home.page')
const { login } = require('@pages/Login.Page')
const { RMloginpage } = require('@pages/RMLogin.page')

describe('US-GX2-652: SpaceBeyond | Booking | Book a Destination in Checkout', () => {
	let the
	beforeEach('Predondicion: El usuario inicia sesion, elige un destino y se encuentra en la pagina de Checkout', () => {
		cy.fixture('data/Booking').then((data) => {
			the = data

			homepage.visit()
			homepage.elements.loginBtn().click()
			RMloginpage.typeUsername(the.username)
			RMloginpage.typePassword(the.password)
			RMloginpage.elements.logInBtn().click()
			homepage.elements.loadMoreBtn().click()
			homepage.chooseRandomDestination()
            //Validar que el texto Checkout sea visible
            //Validar que el precio del destino elegido anteriormente sea igual en la pagina de checkout
		})
	})

	it('TS-GX2-653 | TC1: Realizar checkout de destino exitoso (Positivo)', () => {
		//Pasos de tus casos de pruebas
		cy.log(the.name)
	})

	// it('TS-GX2-653 | TC2: Validar realizar checkout de destino sin llenar el campo “Name” (Negativo)', () => {
	// 	//Pasos de tus casos de pruebas
	// })

	// it('TS-GX2-653 | TC3: Validar realizar checkout ingresando  un email address incorrecto/inválido (Negativo)', () => {
	// 	//Pasos de tus casos de pruebas
	// })

	// it('TS-GX2-653 | TC4: Validar realizar checkout Ingresando social security number incorrecto/inválido (Negativo)', () => {
	// 	//Pasos de tus casos de pruebas
	// })

	// it('TS-GX2-653 | TC5: Validar realizar checkout ingresando phone number incorrecto/inválido (Negativo)', () => {
	// 	//Pasos de tus casos de pruebas
	// })

	// it('TS-GX2-653 | TC6: Validar realizar checkout sin aceptar los términos y condiciones de la página (Negativo)', () => {
	// 	//Pasos de tus casos de pruebas
	// })

	// it('TS-GX2-653 | TC7: Validar realizar checkout sin subir la información del health insurance', () => {
	// 	//Pasos de tus casos de pruebas
	// })
})

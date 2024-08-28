import { dataPickerPage } from '@pages/GX3-4950-datepickerPage'
import { faker } from '@faker-js/faker'

const username = faker.name.firstName()
const password = faker.name.lastName()

describe('GX3-4950 | SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros', () => {
	beforeEach('PRC: El usuario debe estar situado en la pagina Log In de Space-Beyond', () => {
		cy.visit('https://demo.testim.io/')
		cy.url().should('contain', 'testim')
		cy.contains('Button', 'Log in').click()
		cy.url().should('include', 'login')
		cy.login(username, password)
	})
	it.only('4968 | TC1 : Validar seleccionar un destino correctamente cuando se seleccione una fecha de ida/vuelta y varios tipos de pasajeros(Adultos/Nino).', () => {
		dataPickerPage.clickDateDeparting()
		dataPickerPage.clickDay()
		dataPickerPage.clickButtonOk()
		dataPickerPage.getValuesDate('inputDateDeparting').then((ValueDeparting) => {
			const date = new Date(ValueDeparting)
			const DayDeparting = date.getDate().toString()
			const MonthDeparting = date.toLocaleDateString('en-US', { month: 'short' })
			const dayMothDeparting = MonthDeparting + ' ' + DayDeparting
			dataPickerPage.clickDateReturn()
			dataPickerPage.clickDay()
			dataPickerPage.clickButtonOk()
			dataPickerPage.getValuesDate('inputDateReturn').then((valuesReturn) => {
				const date = new Date(valuesReturn)
				const dayReturn = date.getDate().toString()
				const monthReturn = date.toLocaleDateString('en-US', { month: 'short' })
				const dayMothReturn = monthReturn + ' ' + dayReturn

				dataPickerPage.selectDropDwOf('dropDownAdults').then((nroAdultos) => {
					cy.log('Adults ', nroAdultos)
					dataPickerPage.selectDropDwOf('dropDownChildren').then((nroNinos) => {
						cy.log('Children ', nroNinos)
						const sumaPasaj = parseInt(nroAdultos) + parseInt(nroNinos)
						cy.log('Suma ', sumaPasaj)
						dataPickerPage.clickButtonSelectDestination()
						dataPickerPage.get
							.elementInfoGallery()
							.invoke('text')
							.then((infoGallery) => {
								expect(infoGallery).to.equal(sumaPasaj + ' travelers, ' + dayMothDeparting + ' – ' + dayMothReturn)
							})
					})
				})
			})
		})
	})
	it('4968 | TC2 : Validar seleccionar un destino correctamente cuando se seleccione una fecha de ida/vuelta y pasajero adulto.', () => {
		dataPickerPage.clickDateDeparting()
		dataPickerPage.clickDay()
		dataPickerPage.clickButtonOk()
		dataPickerPage.clickDateReturn()
		dataPickerPage.clickDay()
		dataPickerPage.clickButtonOk()
		dataPickerPage.selectDropDwOf('dropDownAdults')
		dataPickerPage.clickButtonSelectDestination()
	})

	it('4968 | TC3: Validar seleccionar un destino correctamente cuando se seleccione un pasajero adulto y un pasajero nino.', () => {
		dataPickerPage.selectDropDwOf('dropDownAdults')
		dataPickerPage.selectDropDwOf('dropDownChildren')
		dataPickerPage.clickButtonSelectDestination()
	})

	it('4968 | TC4: Validar seleccionar un destino correctamente cuando se seleccione la misma fecha de ida y vuelta.', () => {
		dataPickerPage.clickDateDeparting()
		dataPickerPage.clickDay()
		dataPickerPage.clickButtonOk()
		dataPickerPage.clickDateReturn()
		dataPickerPage.clickDay()
		dataPickerPage.clickButtonOk()
		dataPickerPage.clickButtonSelectDestination()
	})
})

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

	it('4968 | TC1 : Validar seleccionar un destino correctamente cuando se seleccione una fecha de ida/vuelta y varios tipos de pasajeros(Adultos/Nino).', () => {
		dataPickerPage.clickDateDeparting()
		dataPickerPage.clickButtonRightMoth()
		dataPickerPage.clickDay()
		dataPickerPage.clickButtonOk()
		dataPickerPage.getValuesDate('inputDateDeparting').then((ValueDeparting) => {
			const date = new Date(ValueDeparting)
			let DayDeparting = date.getDate().toString()
			const MonthDeparting = date.toLocaleDateString('en-US', { month: 'short' })
			dataPickerPage.getValuesDate('inputDateReturn').then((valuesReturn) => {
				const date = new Date(valuesReturn)
				const dayReturn = date.getDate().toString()
				const dayMothDeparting = MonthDeparting + ' ' + DayDeparting
				const monthReturn = date.toLocaleDateString('en-US', { month: 'short' })
				const dayMothReturn = monthReturn + ' ' + dayReturn
				dataPickerPage.selectDropDwOf('dropDownAdults').then((nroAdultos) => {
					cy.log('Adults ', nroAdultos)
					dataPickerPage.selectDropDwOf('dropDownChildren').then((nroNinos) => {
						cy.log('Children ', nroNinos)
						const sumaPasaj = parseInt(nroAdultos) + parseInt(nroNinos)
						cy.log('Suma ', sumaPasaj)
						let etiqueta
						if (sumaPasaj > 1) {
							etiqueta = ' travelers, '
						} else {
							etiqueta = ' traveler, '
						}
						dataPickerPage.clickButtonSelectDestination()
						dataPickerPage.get
							.elementInfoGallery()
							.invoke('text')
							.then((infoGallery) => {
								if (MonthDeparting === monthReturn) {
									expect(infoGallery).to.equal(sumaPasaj + etiqueta + (monthReturn + ' ' + DayDeparting + ' – ' + dayReturn))
								} else {
									expect(infoGallery).to.equal(sumaPasaj + etiqueta + (dayMothDeparting + ' – ' + dayMothReturn))
								}
							})
					})
				})
			})
		})
	})
	it('4968 | TC2 : Validar seleccionar un destino correctamente cuando se seleccione una fecha de ida/vuelta y pasajero adulto.', () => {
		dataPickerPage.clickDateDeparting()
		dataPickerPage.clickButtonRightMoth()
		dataPickerPage.clickDay()
		dataPickerPage.clickButtonOk()
		dataPickerPage.getValuesDate('inputDateDeparting').then((ValueDeparting) => {
			const date = new Date(ValueDeparting)
			let DayDeparting = date.getDate().toString()
			const MonthDeparting = date.toLocaleDateString('en-US', { month: 'short' })
			dataPickerPage.getValuesDate('inputDateReturn').then((valuesReturn) => {
				const date = new Date(valuesReturn)
				const dayReturn = date.getDate().toString()
				const dayMothDeparting = MonthDeparting + ' ' + DayDeparting
				const monthReturn = date.toLocaleDateString('en-US', { month: 'short' })
				const dayMothReturn = monthReturn + ' ' + dayReturn
				dataPickerPage.selectDropDwOf('dropDownAdults').then((nroAdultos) => {
					cy.log('Adults ', nroAdultos)
					const sumaPasaj = parseInt(nroAdultos)
					cy.log('Suma ', sumaPasaj)
					let etiqueta
					if (sumaPasaj > 1) {
						etiqueta = ' travelers, '
					} else {
						etiqueta = ' traveler, '
					}
					dataPickerPage.clickButtonSelectDestination()
					dataPickerPage.get
						.elementInfoGallery()
						.invoke('text')
						.then((infoGallery) => {
							if (MonthDeparting === monthReturn) {
								expect(infoGallery).to.equal(sumaPasaj + etiqueta + monthReturn + ' ' + DayDeparting + ' – ' + dayReturn)
							} else {
								expect(infoGallery).to.equal(sumaPasaj + etiqueta + dayMothDeparting + ' – ' + dayMothReturn)
							}
						})
				})
			})
		})
	})

	it('4968 | TC3: Validar seleccionar un destino correctamente cuando se seleccione un pasajero adulto y un pasajero nino.', () => {
		dataPickerPage.selectDropDwOf('dropDownAdults').then((nroAdultos) => {
			cy.log('Adults ', nroAdultos)

			dataPickerPage.selectDropDwOf('dropDownChildren').then((nroNinos) => {
				cy.log('Children ', nroNinos)
				const sumaPasaj = parseInt(nroAdultos) + parseInt(nroNinos)

				dataPickerPage.clickButtonSelectDestination()

				dataPickerPage.getValuesDate('inputDateDeparting').then((ValueDeparting) => {
					const date = new Date(ValueDeparting)
					const DayDeparting = date.getDate().toString()
					const MonthDeparting = date.toLocaleDateString('en-US', { month: 'short' })
					const dayMothDeparting = MonthDeparting + ' ' + DayDeparting

					dataPickerPage.getValuesDate('inputDateReturn').then((valuesReturn) => {
						const date = new Date(valuesReturn)
						const dayReturn = date.getDate().toString()
						const monthReturn = date.toLocaleDateString('en-US', { month: 'short' })
						const dayMothReturn = monthReturn + ' ' + dayReturn
						let etiqueta
						if (sumaPasaj > 1) {
							etiqueta = ' travelers, '
						} else {
							etiqueta = ' traveler, '
						}
						dataPickerPage.get
							.elementInfoGallery()
							.invoke('text')
							.then((infoGallery) => {
								if (MonthDeparting === monthReturn) {
									expect(infoGallery).to.equal(sumaPasaj + etiqueta + monthReturn + ' ' + DayDeparting + ' – ' + dayReturn)
								} else {
									expect(infoGallery).to.equal(sumaPasaj + etiqueta + dayMothDeparting + ' – ' + dayMothReturn)
								}
							})
					})
				})
			})
		})
	})

	it('4968 | TC4: Validar seleccionar un destino correctamente cuando se seleccione la misma fecha de ida y vuelta.', () => {
		dataPickerPage.clickDateDeparting()
		dataPickerPage.clickButtonRightMoth()
		dataPickerPage.clickDay()
		dataPickerPage.clickButtonOk()

		dataPickerPage.getValuesDate('inputDateDeparting').then((ValueDeparting) => {
			const date = new Date(ValueDeparting)
			const DayDeparting = date.getDate().toString()
			dataPickerPage.clickDateReturn()
			dataPickerPage.selectDayReturn(DayDeparting)
			dataPickerPage.clickButtonOk()

			dataPickerPage.getValuesDate('inputDateDeparting').then((ValueDeparting) => {
				const date = new Date(ValueDeparting)
				const NewDayDeparting = date.getDate().toString()

				dataPickerPage.getValuesDate('inputDateReturn').then((valuesReturn) => {
					const date = new Date(valuesReturn)
					const dayReturn = date.getDate().toString()
					expect(parseInt(NewDayDeparting)).to.lessThan(parseInt(dayReturn))
				})
			})
		})
	})
})

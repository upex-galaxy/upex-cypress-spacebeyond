describe('first history', () => {
	beforeEach('Precondition', () => {
		cy.visit('https://demo.testim.io/')
	})

	it('2453 | TC1: validate select a departing date and this is the same as the one selected', () => {
		const dateSelected = datePicker.selectRandomDate({ datePickerName: 'Departing' })
		cy.get('*').then(() => {
			cy.log(dateSelected)
		})
	})
	it.skip('2453 | TC1: validate select a returning date and this is the same as the one selected', () => {
		datePicker.get.selectDatePicker('Returning').click()
		const availableMonthsYear = datePicker.getAvailableMonthsYear()
		cy.get('*').then(() => {
			const randomMonthYear = datePicker.getRandomMonthYear(availableMonthsYear)
			cy.get('*').then(() => {
				const year = datePicker.selectCorrespondYear(randomMonthYear)
				const month = datePicker.selectMonth(randomMonthYear)
				const day = datePicker.selectRandomDayAvailable()
				datePicker.get.buttonOKofDatePicker().click()
				const datePickerValue = datePicker.getDatePickerValue('Returning')
				cy.get('*').then(() => {
					const dateSelected = [`${day} ${month} ${year}`]
					expect(dateSelected).to.deep.equal(datePickerValue)
				})
			})
		})
	})
})

import { datePicker } from '@pages/datePickerSpace.Page'
import { removeLogs } from '@helper/RemoveLogs'
removeLogs()

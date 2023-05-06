describe('first history', () => {
	beforeEach('Precondition', () => {
		cy.visit('https://demo.testim.io/')
	})

	it('TC1', () => {
		datePicker.get.departingSelect().click()
		const availableMonthsYear = datePicker.getAvailableMonthsYear()
		cy.get('*').then(() => {
			const randomMonthYear = datePicker.getRandomMonthYear(availableMonthsYear)
			cy.get('*').then(() => {
				datePicker.selectCorrespondYear(randomMonthYear)
				datePicker.selectMonth(randomMonthYear)
				const day = datePicker.selectRandonDayAvailable()
				cy.log(randomMonthYear[0]) //month
				cy.log(randomMonthYear[1]) //year
				cy.log(day)
			})
		})
	})
})

import { datePicker } from '@pages/datePickerSpace.Page'
import { removeLogs } from '@helper/RemoveLogs'
removeLogs()

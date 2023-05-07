describe('first history', () => {
	beforeEach('Precondition', () => {
		cy.visit('https://demo.testim.io/')
	})

	it('2453 | TC1: validate select a Departing date and this is the same as the one selected', () => {
		const dateSelected = datePicker.selectRandomDate({ datePickerName: 'Departing' })
		datePicker.get
			.selectDatePicker('Departing')
			.children('[role="input"]')
			.invoke('val')
			.then((DepartingDate) => {
				expect(DepartingDate).to.deep.equal(dateSelected.toString())
			})
	})
	it('2453 | TC2: validate select a Returning date and this is the same as the one selected', () => {
		const dateSelected = datePicker.selectRandomDate({ datePickerName: 'Returning' })
		datePicker.get
			.selectDatePicker('Returning')
			.children('[role="input"]')
			.invoke('val')
			.then((ReturningDate) => {
				expect(ReturningDate).to.deep.equal(dateSelected.toString())
				cy.log(dateSelected)
			})
	})
	it.only('2453 | TC3: validate select departing, returning date and travelers is equal to search', () => {
		const departingDateSelected = datePicker.selectRandomDate({ datePickerName: 'Departing' })
		cy.get('*').then(() => {
			const returningDateSelected = datePicker.selectRandomDate({ datePickerName: 'Returning', dateDepartingSelected: departingDateSelected })
			datePicker.get.resultInput().then((searchValue) => {
				let Departing = new Date(departingDateSelected)
				let dateDeparting = Departing.toLocaleDateString('default', { month: 'short', day: 'numeric' })
				let Returning = new Date(returningDateSelected)
				let dateReturning = Returning.toLocaleDateString('default', { month: 'short', day: 'numeric' })
				const date = searchValue.text().split(',')
				expect(date[1]).to.deep.include(`${dateDeparting}`)
				expect(date[2]).to.deep.include(`${dateReturning}`)
			})
		})
	})

	it('2453 | TC2: validate no select same date Departing and Returning', () => {
		const dateDeparting = datePicker.selectRandomDate({ datePickerName: 'Departing' })
		cy.get('*').then(() => {
			datePicker.selectSpecificDate({ nameDatePicker: 'Returning', dateSelect: dateDeparting })
		})
	})
})

import { datePicker } from '@pages/datePickerSpace.Page'
import { removeLogs } from '@helper/RemoveLogs'
removeLogs()

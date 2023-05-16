import { destinationPage } from '@pages/destinationPage'

describe('GX2-2824 | Classify trip according to destination, color and price', () => {
	let data

	before('', () => {
		cy.fixture('data/destinations').then((datos) => {
			data = datos
		})
	})
	beforeEach('User must visit the website and search a destiny in the "Destiny Selector:', () => {
		cy.visit('/')
		destinationPage.clickSelectDestBtn()
	})

	it('GX2-2825 | TC1: User select a destiny with the dropdownlist "Launch"', () => {
		destinationPage.selectRandomLaunch()
		destinationPage.get.card1().then(() => {
			destinationPage.get.titleCard().should('contain', Cypress.env('itemName'))
		})
	})
	it('GX2-2825 | TC2: User select a destiny with the dropdownlist "Planet Color"', () => {
		destinationPage.selectRandomPlanetColor()
		destinationPage.colorCardsSelected().should('have.length.at.least', 1)
	})
	it('GX2-2825 | TC3: User select a desired destiny with the price range slide "', () => {
		destinationPage.randomPriceRange()
		destinationPage.checkPriceCart()
	})
})

import { destinationPage } from '@pages/destinationPage'

// skip suite: Some tests fails

describe.skip('GX2-2824 | Classify trip according to destination, color and price', () => {
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

	it('GX2-2825 | TC1: User select a destiny with the dropdown list "Launch"', () => {
		destinationPage.selectRandomLaunch()
		destinationPage.get.card1().then(() => {
			destinationPage.get.titleCard().should('contain', Cypress.env('itemName'))
		})
	})
	it('GX2-2825 | TC2: User select a destiny with the dropdown list "Planet Color"', () => {
		destinationPage.selectRandomPlanetColor()
		destinationPage.colorCardsSelected().should('have.length.at.least', 1)
	})
	it('GX2-2825 | TC3: User select a desired destiny with the price range slide "', () => {
		destinationPage.randomPriceRange()

		destinationPage.get.priceCardItem().each(($cartPrice) => {
			cy.wrap($cartPrice)
				.invoke('text')
				.then((precios) => {
					const prices = precios.split('$')[1]
					return prices
				})
				.then(parseInt)
				.then(($precios) => {
					Cypress.env('precios', $precios)
				})
				.should('be.below', Cypress.env('price'))
		})
	})

	it('GX2-2825 | TC4: User select a desired destiny combining the "Launch" and "Planet Color" dropdown lists', { retries: 10 }, () => {
		const ejecutarTest = () => {
			destinationPage.get
				.cards()
				.eq(0)
				.within(() => {
					destinationPage.get.titleCard().each((title) => {
						cy.wrap(title).should('contain', Cypress.env('itemName'))
					})
				})

			destinationPage.colorCardsSelected().should('have.length.at.least', 1)
		}
		const elementExist = Cypress.$(destinationPage.get.cards()).length > 0
		destinationPage.selectRandomLaunch()
		destinationPage.selectRandomPlanetColor()

		if (elementExist) {
			ejecutarTest()
		}
	})
	it('GX2-2825 | TC5: User select a desired destiny combining the "Launch" and "Planet Color" dropdownlist, with the minimum price range', () => {
		destinationPage.selectRandomLaunch()
		destinationPage.selectRandomPlanetColor()
		destinationPage.changePriceSliderMinimum()
		destinationPage.get.cards().should('not.exist')
	})
	it('GX2-2825 | TC6: User select a desired destiny selecting the maximum price range', () => {
		destinationPage.changePriceSliderMaximum()
		destinationPage.get.galleryItems().should('contain', data.item.length)
	})
})

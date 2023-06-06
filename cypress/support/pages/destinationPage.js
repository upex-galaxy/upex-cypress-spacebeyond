const data = require('../../fixtures/data/destinations.json')
let price
class DestinationPage {
	get = {
		selectDestinationBtn: () => cy.contains('button', 'Select Destination'),
		launch: () => cy.get('input[value="Launch"]'),
		card1: () => cy.get('div[data-react-toolbox="card"]').first(),
		cards: () => cy.get('div[data-react-toolbox="card"]'),
		titleCard: () => cy.get('.theme__title___35Wsy'),
		dropdownlist: () => cy.get('div[class^="theme__dropdown"]'),
		themeInputElement: () => cy.get('input[class^="theme__inputElement"]'),
		priceCardItem: () => cy.get('span[class="GalleryItem__price-tag___3q0Al"]'),
		galleryItems: () => cy.get('div[class*="Gallery__items-box___2hOZl'),
		priceSlider: () => cy.get('div[class^="theme__knob"]'),
	}

	clickSelectDestBtn() {
		this.get.selectDestinationBtn().click()
	}
	clickLaunch() {
		this.get.launch().click()
	}
	selectRandomLaunch() {
		return this.get
			.dropdownlist()
			.eq(2)
			.click()
			.within(() => {
				cy.get('ul')
					.its('length')
					.then(() => {
						const random = Cypress._.random(data.items.name.length - 1)
						cy.get('ul>li').eq(random).click()
						this.get
							.themeInputElement()
							.then((elementName) => {
								const name = elementName.val()
								return name
							})
							.then(($itemName) => {
								Cypress.env('itemName', $itemName)
							})
					})
			})
	}
	selectRandomPlanetColor() {
		return this.get
			.dropdownlist()
			.eq(3)
			.click()
			.within(() => {
				const random = Cypress._.random(data.item.length.color) + 1
				cy.get('ul>li').eq(random).click()
				this.get
					.themeInputElement()
					.then((elementColor) => {
						const color = elementColor.val()
						return color
					})
					.then(($itemColor) => {
						Cypress.env('itemColor', $itemColor)
					})
			})
	}

	colorCardsSelected() {
		return this.get
			.dropdownlist()
			.eq(3)
			.then(() => {
				const colorItems = data.item.filter(function (obj) {
					return obj.color === Cypress.env('itemColor')
				})
				cy.log(colorItems)
				cy.wrap(colorItems)
			})
	}
	randomPriceRange() {
		const min = '0'
		const max = '100'
		const random = Math.random() * (max - min + 1)
		return this.get
			.priceSlider()
			.invoke('attr', 'style', 'left: ' + random + '%')
			.trigger('change')
			.click({ force: true })
			.then(() => {
				cy.get('.theme__inputElement___27dyY.theme__filled___1UI7Z')
					.eq(7)
					// .invoke('val')
					.then((priceElement) => {
						const price = priceElement.val()
						return price
					})
					.then(parseInt)
					.then(($priceItem) => {
						Cypress.env('price', $priceItem)
						cy.log(Cypress.env('price'))
					})
			})
	}
	changePriceSliderMinimum() {
		this.get.priceSlider().invoke('attr', 'style', 'left: 0%').trigger('change').click({ force: true })
	}
	changePriceSliderMaximum() {
		this.get.priceSlider().invoke('attr', 'style', 'left: 100%').trigger('change').click({ force: true })
	}
}

export const destinationPage = new DestinationPage()

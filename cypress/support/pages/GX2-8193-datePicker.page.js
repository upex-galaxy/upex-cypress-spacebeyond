class HomePage {
	get = {
		departingPicker: cy.get('[class ^= theme__input] input').eq(0),
		returningPicker: cy.get('[class ^= theme__input] input').eq(1),
		adultsPicker: cy.get('[class ^= theme__input] input').eq(2),
		childrenPicker: cy.get('[class ^= theme__input] input').eq(3),
	}
}

export const homePage = new HomePage()

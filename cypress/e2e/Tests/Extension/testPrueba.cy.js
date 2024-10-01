describe('', () => {
	beforeEach('PCR: Visitar la pagina',() => {
		cy.visit('https://demo.testim.io/')
	});
	it('', () => {
		cy.get('.Gallery__headline-1___2lHj5').should('have.text', 'Your next destination')
	});
});
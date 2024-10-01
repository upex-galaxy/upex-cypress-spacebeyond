describe('Visitar la pagina Space & Beyonce', () => {
	beforeEach('PCR: Visitar la pagina',() => {
		cy.visit('https://demo.testim.io/')
	});
	it('Visitar y validar', () => {
		cy.get('.Gallery__headline-1___2lHj5').should('have.text', 'Your next destination')
	});
});
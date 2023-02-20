class CheckoutPage {

    constructor(){
    
    }

    elements = {
        checkoutText: () => cy.get('.Checkout__headline-1___2KQaR'),
        nameInput: () => cy.get('form > :nth-child(1) > .theme__inputElement___27dyY'),
        nameRequiredMsj: () => cy.get('.theme__error___3ilni'),
        emailInput: () => cy.get('form > :nth-child(2) > .theme__inputElement___27dyY'),
        invalidEmailMsj: () => cy.get('.theme__error___3ilni'),
        socialSecurityInput: () => cy.get(':nth-child(3) > .theme__inputElement___27dyY'),
        invalidSocialSecurityNumberMsj: () => cy.get('.theme__error___3ilni'),
        phoneNumberInput: () => cy.get(':nth-child(4) > .theme__inputElement___27dyY'),
        invalidPhoneNumberMsj: () => cy.get('.theme__error___3ilni'),
        termAndConditionsCheckbox: () => cy.get('.theme__check___2B20W'),
        payNowBtn: () => cy.contains('Pay now'),
        healthInsuranceBox: () => cy.get('input[type="file'),
        successfulPurchaseMessage: () => cy.get("span") 
    }

    //Metodos
    typeName(name){
        this.elements.nameInput().type(name)
    }

    typeEmail(email){
        this.elements.emailInput().type(email)
    }

    typeSocialSecurityNumber(socialSecurityNumber){
        this.elements.socialSecurityInput().type(socialSecurityNumber)
    }

    typePhoneNumber(phoneNumber){
        this.elements.phoneNumberInput().type(phoneNumber)
    }



}


export const checkoutPage = new CheckoutPage;
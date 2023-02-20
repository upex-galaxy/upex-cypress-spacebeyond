class RMLoginPage{

    elements = {
        usernameInput: () => cy.get('#login [type="text"]'),
        passwordInput: () => cy.get('#login [type="password"]'),
        logInBtn: () => cy.get('button[type="submit"]')
    }

    typeUsername(username){
        this.elements.usernameInput().type(username)
    }

    typePassword(password){
        this.elements.passwordInput().type(password)
    }

}

export const RMloginpage = new RMLoginPage;
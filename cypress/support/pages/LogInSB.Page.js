class LoginSB{
        // Properties / Elements:
    get = {
        userNameInput: ()=> cy.get('form > div > input[tabindex="1"]'),
        passwordInput: ()=> cy.get('form > div > input[tabindex="2"]'),
        loginButton: ()=> cy.get('button[form="login"]'),
        helloButton: ()=> cy.get('[type="button"] > span:first-child'),
        logoutButton: ()=> cy.get('ul > li > a')
    }

    // Functions / Methods:
    enterUsername(type){
        this.get.userNameInput().type(type)
    }
    
    enterPassword(type){
        this.get.passwordInput().type(type)
    }

    submitLogin(){
        this.get.loginButton().click()
    }

    logoutClick(){
        this.get.helloButton().click()
        this.get.logoutButton().click()

    }
}

export const login = new LoginSB;
class DP {
    get = {
        DatePicker: ()=> cy.get("[data-react-toolbox='date-picker'] input"),
        Dialog: ()=> cy.get("[data-react-toolbox='dialog']"),
        Dropdown: ()=> cy.get("[data-react-toolbox='dropdown']"),
        elements: ()=>cy.get("ul[class*='WhiteDropDown']"),
        buttonOk:()=>cy.get("[data-react-toolbox='button']").contains('Ok'),
        SearchButton: ()=>cy.get("[class*='CTAButton']"),

        departing(){
            this.get.DatePicker().first().click
        },
        returning(){
            this.get.DatePicker().eq(1).click()
        },
        dialog(){
            this.get.Dialog().first().click()
        },
        adults(){
            this.get.Dropdown().first().click()
        },
        children(){
            this.get.Dropdown().eq(1).click()
        },
        listAdults(){
            this.get.elements().first().click()
        },
        listChild(){
            this.get.elements().last().click()
        },
        ok(){
            this.get.buttonOk().click()
        },
        search(){
            this.get.SearchButton().first().click()
        }
    }   
}
export const pickerData = new DP();





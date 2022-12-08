describe('Gallery Database getting', () => {
    
    beforeEach(() => {
        cy.visit("/")
    });

    it('TC1: Validar encontrar destino por DestinyName, Color y Valid Price Range', () => {
        
        // Expected Result from Database:
        cy.fixture("Database/Gallery.Page").then((db)=>{
            const max = db.length -1
            const random = ()=> Cypress._.random(0, max)
            const index = random()
            cy.log(index)

            const destiny = db[index]
            cy.log(destiny)

            cy.get('[class*="Gallery"]>[data-react-toolbox="dropdown"]').within((dropdown)=>{
                // Abrir Dropdown de Destiny:
                cy.get("input").eq(0).click()
                // Seleccionar el Destiny match:
                cy.get("li").contains(destiny.destinyName).click()
                // Abrir Dropdown de Color:
                cy.get("input").eq(1).click()
                // Seleccionar el Color match:
                cy.get("li").contains(destiny.color).click()
            })
            // Select Slider Price Range:
            cy.log(`Real Price = ${destiny.price}`)
            const selectedRange = destiny.price +1
            cy.log(selectedRange)
            cy.get('[data-react-toolbox="slider"] input').clear().type(`${selectedRange}{enter}`)

            // IF element has same Type Destiny + Same Color + Is in Price Range:
            cy.get("[class*='items-box']")
                .contains(destiny.destinyName)
                .parentsUntil("[data-react-toolbox='card']")
                .parent().first().within((card)=>{
                    cy.contains("$").then((itemPrice)=>{
                        cy.log(itemPrice.text())
                        const priceNumber = parseFloat(itemPrice.text().replace("$","")) // 34343.345
                        expect(selectedRange).to.be.greaterThan(priceNumber)
                        expect(destiny.price).to.be.equal(priceNumber)
                    })
                })
        })
    });
    it('TC2: Validar NO encontrar destino cuando el Rango Seleccionado no coincide con el Precio', () => {
        
        // Expected Result from Database:
        cy.fixture("Database/Gallery.Page").then((db)=>{
            const max = db.length -1
            const random = ()=> Cypress._.random(0, max)
            const index = random()
            cy.log(index)

            const destiny = db[index]
            cy.log(destiny)

            cy.get('[class*="Gallery"]>[data-react-toolbox="dropdown"]').within((dropdown)=>{
                // Abrir Dropdown de Destiny:
                cy.get("input").eq(0).click()
                // Seleccionar el Destiny match:
                cy.get("li").contains(destiny.destinyName).click()
                // Abrir Dropdown de Color:
                cy.get("input").eq(1).click()
                // Seleccionar el Color match:
                cy.get("li").contains(destiny.color).click()
            })
            // Select Slider Price Range:
            cy.log(`Real Price = ${destiny.price}`)
            cy.get('[data-react-toolbox="slider"] input').clear().type(`${destiny.price -1}{enter}`)

            // IF element has same Type Destiny + Same Color BUT is NOT in Price Range:
            cy.get("[class*='items-box']").within((container)=>{
                cy.contains(destiny.destinyName)
                    .should("not.exist")
            })
        })
    });
    it('TC3: Validar NO encontrar destino cuando el Rango Seleccionado no coincide con el Precio', () => {
        
        // Expected Result from Database:
        cy.fixture("Database/Gallery.Page").then((db)=>{
            const max = db.length -1
            const random = ()=> Cypress._.random(0, max)
            const index = random()
            cy.log(index)

            const destiny = db[index]
            cy.log(destiny)

            cy.get('[class*="Gallery"]>[data-react-toolbox="dropdown"]').within((dropdown)=>{
                // Abrir Dropdown de Destiny:
                cy.get("input").eq(0).click()
                // Seleccionar el Destiny match:
                cy.get("li").contains(destiny.destinyName).click()
                // Abrir Dropdown de Color:
                cy.get("input").eq(1).click()
                // Seleccionar el Color match:
                cy.get("li").contains(destiny.color).click()
            })
            // Select Slider Price Range:
            cy.log(`Real Price = ${destiny.price}`)
            cy.get('[data-react-toolbox="slider"] input').clear().type(`${destiny.price -1}{enter}`)

            // IF element has same Type Destiny + Same Color BUT is NOT in Price Range:
            cy.get("[class*='items-box']").within((container)=>{
                cy.contains(destiny.destinyName)
                    .should("not.exist")
            })
        })
    });
    it('TC4: Validar NO encontrar destino cuando el Color está seleccionado pero no hace Match con el Destino y Precio No está en Rango', () => {
        
        // Expected Result from Database:
        cy.fixture("Database/Gallery.Page").then((db)=>{
            const max = db.length -1
            const random = ()=> Cypress._.random(0, max)
            const index = random()
            cy.log(index)

            const destiny = db[index]
            cy.log(destiny)

            const destinyColor = destiny.color
            const diffColor = db.filter(({color})=> color !== destinyColor).map(({color})=> color)
            const randomColor = ()=> Cypress._.random(0, diffColor.length)
            const indexColor = randomColor()
            cy.log(indexColor)
            const theColor = diffColor[indexColor]
            cy.log(theColor)

            cy.get('[class*="Gallery"]>[data-react-toolbox="dropdown"]').within((dropdown)=>{
                // Abrir Dropdown de Destiny:
                cy.get("input").eq(0).click()
                // Seleccionar el Destiny match:
                cy.get("li").contains(destiny.destinyName).click()
                // Abrir Dropdown de Color:
                cy.get("input").eq(1).click()

                // Seleccionar el Color match:
                cy.get("li").contains(theColor).click()
            })
            // Select Slider Price Range:
            cy.log(`Real Price = ${destiny.price}`)
            cy.get('[data-react-toolbox="slider"] input').clear().type(`${destiny.price -1}{enter}`)

            // IF element has same Type Destiny + Same Color BUT is NOT in Price Range:
            cy.get("[class*='items-box']").within((container)=>{
                cy.contains(destiny.destinyName)
                    .should("not.exist")
            })
        })
    });
    
    
});
const arr = require("../../cypress/fixtures/Database/Gallery.Page.json")
const max = 9 - 1
const random = ()=> Cypress._.random(0, max)


const filter = arr.filter(({color})=> color !== "Green").map(({color})=> color)



console.log(filter) 
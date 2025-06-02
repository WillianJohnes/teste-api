
Cypress.Commands.add('buscarDeviceEspecifico', (device_id) => {

    cy.request({
            method: 'GET',
            url: `/objects/${device_id}`,
            failOnStatusCode: false
        }).then((response) =>{ return response})

})

Cypress.Commands.add('cadastrarDevice', (payload) => {

   cy.request({
            method: 'POST',
            url:'/objects',
            failOnStatusCode: false,
            body: payload
        }).then((response) =>{ return response})

})

Cypress.Commands.add('deletarDevice', (deletar) => {

   cy.request({
        method: 'DELETE',
        url: `/objects/${deletar}`,
        failOnStatusCode: false
      }).then((response) =>{ return reponse})

})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
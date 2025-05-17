/// <reference types="cypress"/>

describe('Deletar um dispositivo', () => {

  it('Deletar um dispositivo', () => {
    const body = {
      name: "Samsung Galaxy S22 ULTRA",
      data: {
        year: 2022,
        price: 2999.99,
        "CPU model": "Snapdragon Gen8 Pro",
        "Hard disk size": "512 GB"
      }
    }

    // Criação do dispositivo
    cy.cadastrarDevice(body).then((response_post) => {
      expect(response_post.status).to.equal(200)

      const deviceId = response_post.body.id
      expect(deviceId).to.exist

      // Exclusão do dispositivo
      cy.request({
        method: 'DELETE',
        url: `https://api.restful-api.dev/objects/${deviceId}`,
        failOnStatusCode: false
      }).as('deleteDeviceResult')

      // Validação do delete
      cy.get('@deleteDeviceResult').then((response_del) => {
        expect(response_del.status).to.equal(200)
        expect(response_del.body.message)
          .to.equal(`Object with id = ${deviceId} has been deleted.`)
      })
    })
  
})

 it('Deletar um dispositivo', () => {

        const id_inexistente = 'Willian'
    
      cy.request({
        method: 'DELETE',
        url: `/objects/${id_inexistente}`,
        failOnStatusCode: false
      }).as('deleteDeviceResult')

      // Validação do delete
      cy.get('@deleteDeviceResult').then((response_del) => {
        expect(response_del.status).to.equal(404)
        expect(response_del.body.error)
            .to.equal(`Object with id = ${id_inexistente} doesn't exist.`)
      })
    })
  
})
  


/// <reference types="cypress"/>

describe('Alterar dispositivos', () => {

  it('Alterar um dispositivo', () => {
    const body_cadastro = {
      name: "Samsung Galaxy S22 ULTRA",
      data: {
        year: 2022,
        price: 2999.99,
        "CPU model": "Snapdragon Gen8 Pro",
        "Hard disk size": "512 GB"
      }
    }

    const body_update = {
      name: "Samsung Galaxy S22 ULTRA",
      data: {
        year: 2022,
        price: 2999.99,
        "CPU model": "Snapdragon Gen8 Pro",
        "Hard disk size": "1 TB"
      }
    }

    // Criação do dispositivo
    cy.request({
      method: 'POST',
      url: '/objects',
      failOnStatusCode: false,
      body: body_cadastro
    }).then((response_post) => {
      expect(response_post.status).to.equal(200)

      const deviceId = response_post.body.id
      expect(deviceId).to.exist

      // Atualização do dispositivo
      cy.request({
        method: 'PUT',
        url: `/objects/${deviceId}`,
        failOnStatusCode: false,
        body: body_update
      }).as('updateDeviceResult')

      // Validação do PUT
      cy.get('@updateDeviceResult').then((response_update) => {
        expect(response_update.status).to.equal(200)

        // Verifica se o campo atualizado está correto
        expect(response_update.body.data["Hard disk size"]).to.equal("1 TB")

        // Validação do campo updatedAt
        const updatedAt = response_update.body.updatedAt
        expect(updatedAt).to.exist

        const now = new Date()
        const updatedDate = new Date(updatedAt)
        const diff = Math.abs(now - updatedDate)

      })
    })
  })
})

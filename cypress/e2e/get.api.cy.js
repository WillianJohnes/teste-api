/// <reference types="cypress"/>

describe('Buscar dispositivos', () => {

    it('Buscar um dispositivo especifico', () => {

        const device_id = '7'
        cy.buscarDeviceEspecifico(device_id)
            .as('getDeviceResult')
        // validações
            .then((response) => {
                expect(response.status).equal(200)

                expect(response.body.id).equal(device_id)
                expect(response.body.name).equal('Apple MacBook Pro 16')
                expect(response.body).not.empty
                expect(response.body.data).not.empty

                expect(response.body.year).not.string
                expect(response.body.year).not.equal(2019)

                expect(response.body.price).not.string
                expect(response.body.price).not.equal(1849.99)

                expect(response.body.data['CPU model']).not.empty
                expect(response.body.data).not.equal('Intel Core i9')

                expect(response.body.data['Hard disk size']).not.empty
                expect(response.body.data).not.equal('1 TB')
            })
    })  
    
    it('Buscar um dispositivo inexistente', () => {

        const device_id = 'WJ'
        cy.buscarDeviceEspecifico(device_id)
            .as('getDeviceResult')
        // validações
            .then((response) => {
                expect(response.status).equal(404)
                expect(response.body.error).equal(`Oject with id=${device_id} was not found.`)
                
            })
    })
})
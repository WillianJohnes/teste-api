/// <reference types="cypress"/>

describe('Cadastro de dispositivos', () => {

    it('Cadastrar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 10)

        const body = {
            "name": "Samsung Galaxy S22 ULTRA",
                "data": {
                    "year": 2022,
                    "price": 2999.99,
                    "CPU model": "Snapdragon Gen8 Pro",
                    "Hard disk size": "512 GB"
            }
        }

        cy.cadastrarDevice(body).as('postDeviceResult')

        // validações
        cy.get('@postDeviceResult').then((response) => {
            console.log('Resposta da API:', response.body)

                expect(response.status).equal(200)
                expect(response.body.id).not.empty
                expect(response.body.createdAt).not.empty
                expect(response.body.createdAt.slice(0, 10)).equal(dataAtual)
                expect(response.body.name).equal("Samsung Galaxy S22 ULTRA")
                expect(response.body.data.year).not.string
                expect(response.body.year).not.equal(2022)

                expect(response.body.data.price).not.string
                expect(response.body.price).not.equal(2999.99)

                expect(response.body.data['CPU model']).not.empty
                expect(response.body.data).not.equal('Snapdragon Gen8 Pro')

                expect(response.body.data['Hard disk size']).not.empty
                expect(response.body.data).not.equal('512 GB')
            })
    })
    it('Cadastrar um dispositivo', () => {      
        
        cy.cadastrarDevice()
        
        // validações
        .then((response) => {
            console.log('Resposta da API:', response.body)

                expect(response.status).equal(400)
                expect(response.body.error)
                    .equal("400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.")
               
            })
    })
})
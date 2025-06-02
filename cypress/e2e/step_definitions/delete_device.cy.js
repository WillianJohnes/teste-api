import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let deviceId;

Given("que eu tenha um dispositivo criado na API", () => {
  const body = {
    name: "Samsung Galaxy S22 ULTRA",
    data: {
      year: 2022,
      price: 2999.99,
      "CPU model": "Snapdragon Gen8 Pro",
      "Hard disk size": "512 GB"
    }
  };

  cy.request("POST", "https://api.restful-api.dev/objects", body).then((response) => {
    expect(response.status).to.eq(200);
    deviceId = response.body.id;
    expect(deviceId).to.exist;
  });
});

When("eu deletar esse dispositivo", () => {
  cy.request("DELETE", `https://api.restful-api.dev/objects/${deviceId}`).as("deleteDeviceResult");
});

Then("o dispositivo deve ser removido com sucesso", () => {
  cy.get("@deleteDeviceResult").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq(`Object with id = ${deviceId} has been deleted.`);
  });
});

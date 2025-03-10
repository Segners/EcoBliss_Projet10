// cypress/e2e/login.cy.js

describe("API Login Test", () => {
    const apiUrl = "/login";
    it("Doit pouvoir se connecter avec adresse et mot de passe valide", () => {
      cy.request({
        method: "POST",
        url: apiUrl,
        body: {
          username: "test2@test.fr",
          password: "testtest",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
      });
    });
  
    it("Ne doit pas pouvoir se connecter avec adresse et mot de passe invalide", () => {
      cy.request({
        method: "POST",
        url: apiUrl,
        body: {
          username: "invalidUser",
          password: "wrongPassword",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  
    it("Doit retourner 400 pour invalid JSON", () => {
      cy.request({
        method: "POST",
        url: apiUrl,
        body: "invalid_json",
        failOnStatusCode: false,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });
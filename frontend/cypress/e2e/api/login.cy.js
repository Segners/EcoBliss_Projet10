// cypress/e2e/login.cy.js

describe("API Login Test", () => {
    const apiUrl = "/login";
    it("should log in successfully with valid email and password", () => {
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
  
    it("should fail to log in with invalid email and password", () => {
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
  
    it("should return 400 for invalid JSON", () => {
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
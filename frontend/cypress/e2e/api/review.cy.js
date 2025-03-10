// cypress/e2e/review.cy.js

describe("Tests des avis", () => {
  let authToken;
  // Authentification avant les tests
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: `/login`,
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.token;
    });
  });

  describe("GET /reviews", () => {
    it("Récupérer la liste des avis avec authentification", () => {
      cy.request({
        method: "GET",
        url: `/reviews`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        if (response.body.length > 0) {
          expect(response.body[0]).to.have.all.keys(
            "id",
            "date",
            "title",
            "comment",
            "rating",
            "author"
          );
        }
      });
    });
  });

  describe("POST /reviews", () => {
    it("Créer un nouvel avis valide", () => {
      const reviewData = {
        title: "Excellent produit",
        comment: "Très satisfait de mon achat",
        rating: 5,
      };
      cy.request({
        method: "POST",
        url: `/reviews`,
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: reviewData,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include.keys(
          "id",
          "date",
          "title",
          "comment",
          "rating",
          "author"
        );
        expect(response.body.title).to.eq(reviewData.title);
        expect(response.body.rating).to.eq(reviewData.rating);
      });
    });

    it("Tentative de création avec données invalides (note hors limites)", () => {
      cy.request({
        method: "POST",
        url: `/reviews`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          title: "Note invalide",
          comment: "Ceci ne devrait pas fonctionner",
          rating: 6, // Note maximale devrait être 5
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });

    it("Tentative de création sans authentification", () => {
      cy.request({
        method: "POST",
        url: `/reviews`,
        body: {
          title: "Avis non authentifié",
          comment: "Ne devrait pas être créé",
          rating: 4,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401); // ca devrait etre 403
      });
    });
  });
});

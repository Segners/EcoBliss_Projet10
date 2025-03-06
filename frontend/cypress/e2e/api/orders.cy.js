// cypress/e2e/orders.cy.js
import { faker } from '@faker-js/faker'

describe("API Orders Test", () => {
  let authToken;
  const apiUrl = "/orders";
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.token;
    });
  });

  it("should returns 403 if the user is not connected", () => {
    cy.request({
      method: "GET",
      url: apiUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403); // retourne 401 d'apres la doc donc anomalie
    });
  });

  it("should retrieve the cart", () => {
    cy.request({
      method: "GET",
      url: "/orders",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).exist

    });
  });

  it('add specific out of stock product in the cart', () => {
    cy.request({
      method: "PUT", //anomaly
      url:"/orders/add",
      headers: {
        Authorization:`Bearer ${authToken}`,
      },
      body: {
        "quantity": 1,
        "product": 4
      }
    }).then((response) => {
      expect(response.status).to.eq(200);//this is an anomaly
      const expectedProduct = {
        "name": "Chuchotements d'été",
        "description": "Savon surgras à l'huile d'olive, particulièrement utile contre la peau sèche.",
        "price": 37,
        "picture": "https://cdn.pixabay.com/photo/2017/09/07/19/43/soap-2726387_960_720.jpg"
      };
      expect(response.body.orderLines[0].product).to.include(expectedProduct);
      cartId = response.body.orderLines[0].id;


    });
  });
  let cartId;

  it("empty the cart", () => {
    cy.request({
      method: "DELETE",
      url: `/orders/${cartId}/delete`,
      headers: {
        Authorization:`Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.be.eq(200);
    });
  });

 context(
    "should adds a product in the cart, update quantity and delete him",
    () => {
      const randomQuantity = faker.number.int({ min: 1, max: 10 });
      let productId;
      let cartId;

      it("should returns a random product", () => {
        cy.request({
          method: "GET",
          url: "http://localhost:8081/products/",
          headers: {
            Authorization:`Bearer ${authToken}`,
          },
        }).then((response) => {
          productId =
            response.body[Math.floor(Math.random() * response.body.length)].id;
            cy.log(productId)
        });
      });

      it("should adds the product in the cart", () => {
        cy.request({
          method: "PUT", // devrait etre POST, anomalie
          url: "/orders/add",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: {
            product: productId,
            quantity: randomQuantity,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          cartId = response.body.orderLines[0].id;
          cy.log(cartId)
        });
      });

      it("should changes the quantity of the product order", () => {
        cy.request({
          method: "PUT",
          url: `/orders/${cartId}/change-quantity`,
          headers: {
            Authorization:`Bearer ${authToken}`,
          },
          body: {
            quantity: 2,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });

      it("empty the cart", () => {
        cy.request({
          method: "DELETE",
          url: `/orders/${cartId}/delete`,
          headers: {
            Authorization:`Bearer ${authToken}`,
          },
        }).then((response) => {
          expect(response.status).to.be.eq(200);
        });
      });
    }
  );
});
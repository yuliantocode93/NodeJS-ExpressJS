import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:id", (req, res) => {
  const idProduct = req.params.id;
  res.send(`Product: ${idProduct}`);
});

app.get("/categories/:(\\d+)", (req, res) => {
  const idCategory = req.params.id;
  res.send(`Category: ${idCategory}`);
});

// app.get("/seller/:idSeller/products/:idProduct", (req, res) => {
//     req.params.idSeller;
//     req.params.idProduct
// });

test("Test route params", async () => {
  let response = await request(app).get("/products/echo");
  expect(response.text).toBe("Product: echo");

  response = await request(app).get("/products/wrong");
  expect(response.text).toBe("Product: wrong");

  response = await request(app).get("/products/1234");
  expect(response.text).toBe("Product: 1234");

  response = await request(app).get("/categories/wrong");
  expect(response.status).toBe(404);
});

import express from "express";
import request from "supertest";

const app = express();

app.get("/products/*.json", (req, res) => {
  res.send(req.originalUrl);
});

app.get("/categories/*(\\d+).json", (req, res) => {
  res.send(req.originalUrl);
});

test("Tets Response", async () => {
  let response = await request(app).get("/products/echo.json");
  expect(response.text).toBe("/products/echo.json");

  response = await request(app).get("/products/wrong.json");
  expect(response.text).toBe("/products/wrong.json");

  response = await request(app).get("/products/1234.json");
  expect(response.text).toBe("/products/1234.json");

  response = await request(app).get("/categories/wrong.json");
  expect(response.status).toBe(404);
});

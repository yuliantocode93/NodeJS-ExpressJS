import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set({
    "X-Powered-By": "PZN",
    "X-Author": "yuli",
  });
  res.send(`Hello Response`);
});

test("Test Response", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");
  expect(response.get("X-Powered-By")).toBe("PZN");
  expect(response.get("X-Author")).toBe("yuli");
});

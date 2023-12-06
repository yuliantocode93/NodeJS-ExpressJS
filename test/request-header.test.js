import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  const type = req.get("accept");
  if (type === "text/plain") {
    res.send("Hello text/plain");
  } else {
    res.send(`Hello ${type}`);
  }
});

test("Test request header", async () => {
  const response = await request(app).get("/").set("Accept", "text/plain");
  expect(response.text).toBe("Hello text/plain");
});

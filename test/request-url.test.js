import express from "express";
import request from "supertest";

const app = express();

app.get("/hello/dunia", (req, res) => {
  res.json({
    path: req.path,
    originalUrl: req.originalUrl,
    hostname: req.hostname,
    protocol: req.protocol,
    secure: req.secure,
  });
});

test("Test request url", async () => {
  const response = await request(app).get("/hello/dunia").query({ name: "yuli" });

  expect(response.body).toEqual({
    path: "/hello/dunia", // Updated to match the actual path returned by the route
    originalUrl: "/hello/dunia?name=yuli", // Consider query parameter in the originalUrl
    hostname: "127.0.0.1",
    protocol: "http",
    secure: false,
  });
});

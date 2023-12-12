import express from "express";
import request from "supertest";

const logger = (req, res, next) => {
  console.info(`Receive request: ${req.method} ${req.originalUrl}`);
  next();
};

const addPoweredHeader = (req, res, next) => {
  res.set("X-Powered-By", "PZN");
  next();
};

const apiKeyMiddleware = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  }
};

const requestTimeMiddleWare = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};
const app = express();

app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleWare);

app.get("/", (req, res) => {
  res.send(`Hello response`);
});

app.get("/request", (req, res) => {
  res.send(`Hello request`);
});

app.get("/time", (req, res) => {
  res.send(`Hello, Today Is ${req.requestTime}`);
});

test("Tets Response middleware", async () => {
  const response = await request(app).get("/").query({ apiKey: "123" });
  expect(response.get("X-Powered-By")).toBe("PZN");
  expect(response.text).toBe("Hello response");
});

test("Tets Response middleware", async () => {
  const response = await request(app).get("/request").query({ apiKey: "123" });
  expect(response.get("X-Powered-By")).toBe("PZN");
  expect(response.text).toBe("Hello request");
});

test("Test response Middleware Unauthorized", async () => {
  const response = await request(app).get("/request");
  expect(response.status).toBe(401);
});

test("Tets Response middleware Time", async () => {
  const response = await request(app).get("/time").query({ apiKey: "123" });
  expect(response.get("X-Powered-By")).toBe("PZN");
  expect(response.text).toContain("Hello, Today Is");
});

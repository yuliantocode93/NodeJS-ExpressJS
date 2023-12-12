import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  const name = req.cookies["name"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Test Cookie read", async () => {
  const response = await request(app).get("/").set("Cookie", "name=call;Author=Yulicom"); // Setting the cookie "name" with value "call"
  expect(response.text).toBe("Hello call"); // Expecting "Hello call" as a response
});

test("Test cookie write", async () => {
  const response = await request(app).post("/login").send({ name: "Call" });
  expect(response.header["set-cookie"]).toBeDefined(); // Checking if a cookie is being set
  expect(response.text).toBe("Hello Call");
});

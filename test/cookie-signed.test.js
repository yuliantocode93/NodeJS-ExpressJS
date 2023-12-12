import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("KUNCIRAHASIA")); // Secret for signed cookies
app.use(express.json());

app.get("/", (req, res) => {
  const name = req.signedCookies["login"]; // Use signedCookies for reading signed cookies
  res.send(`Hello ${name || "Guest"}`); // Use the value of 'name' variable here
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});

test("Test Cookie read", async () => {
  const response = await request(app).get("/").set("Cookie", "login=s%3ACall.qyinKOdwxbJbrDRyDush5rBROKZa7DemD%2FCdjKNBNpo; Path=/"); // Setting the signed cookie "login" with value "Call"
  expect(response.text).toBe("Hello Call"); // Expecting "Hello Call" as a response
});

test("Test cookie write", async () => {
  const response = await request(app).post("/login").send({ name: "Call" });
  expect(response.get("Set-Cookie").toString()).toContain("Call"); // Checking if the "login" cookie is set
  expect(response.text).toBe("Hello Call");
});

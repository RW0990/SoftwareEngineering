import {
  describe,
  test,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "./app.js";
import User from "./models/User.js";

const dburi =
  "mongodb+srv://whiteryan2599_db_user:rirjo6-mawpiw-dawTep@test.qmwnz42.mongodb.net/Test";

describe("get/merchandise", () => {
  it("should return merchandise page", async () => {
    /*variables*/
    const response = await request(app).get("/merchandise");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Merchandise");
  });
});

describe("get/dashboard", () => {
  it("should return dashboard page", async () => {
    /*variables*/
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Dashboard");
  });
});

describe("get/cart", () => {
  it("should return cart page", async () => {
    /*variables*/
    const response = await request(app).get("/cart");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Cart");
  });
});

beforeAll(async () => {
  //connection to our test cluster on mongodb
  await mongoose.connect(dburi);
});
beforeEach(async () => {
  //delete any data and start with fresh usernames and passwords
  await User.deleteMany({});
  await User.create({ email: "test@email.com", password: "Newpassword123" });
});

afterAll(async () => {
  await mongoose.connection.close();
});
describe("POST /login", () => {
  it("allows user to log in with valid details only", async () => {
    const response = await request(app)
      .post("/login")
      .type("form")
      .send({ email: "test@email.com", password: "Newpassword123" });
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/?login=true");
  });
  it("blocks sigin in due to invalid details", async () => {
    const response = await request(app)
      .post("/login")
      .type("form")
      .send({ email: "test@email.com", password: "wrong123" });
    expect(response.status).toBe(200);
    expect(response.text).toContain("Email or password incorrect");
  });
});

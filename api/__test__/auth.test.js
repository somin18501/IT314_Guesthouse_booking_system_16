const app = require("../index");
const request = require("supertest");
describe("GET /", () => {
  test("should return 'test ok'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);


  });
});
describe("GET /profile", () => {
  test("should return null without a valid token", async () => {
    const response = await request(app).get("/profile");
    expect(response.status).toBe(200);
    expect(response.body).toBeNull();
  });
});
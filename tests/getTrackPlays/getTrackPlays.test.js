const request = require("supertest");

const { createApp } = require("../../dist/app");
const {
  getTrackPlaysResponseBody,
} = require("./getTrackPlaysResponseBody");

const app = createApp();

describe("GET /trackPlays", () => {
  test("should get track plays", async () => {
    const response = await request(app).get("/trackPlays");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(getTrackPlaysResponseBody);
  });
});

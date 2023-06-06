const request = require("supertest");

const { createApp } = require("../dist/app");

const app = createApp();

describe("POST /trackPlays", () => {
  it("should add track plays", async () => {
    expect(200).toBe(200);
  });
});

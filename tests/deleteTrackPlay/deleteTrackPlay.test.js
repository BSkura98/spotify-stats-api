const request = require("supertest");

const removeExistingTrackPlayResponse = require("./mockedResponses/removeExistingTrackPlayResponse.json");
const removeNotExistingTrackPlayResponse = require("./mockedResponses/removeNotExistingTrackPlayResponse.json");
const { createApp } = require("../../dist/app");

const existingTrackPlayId = "6475cecf61025ee3b39d7d0d";
const notExistingTrackPlayId = "6475cecf61025ee3b39d7123";

const app = createApp();

describe("DELETE /trackPlays/:id", () => {
  it("should remove track play", async () => {
    const response = await request(app).delete(
      `/trackPlays/${existingTrackPlayId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(removeExistingTrackPlayResponse);
  });

  it("should return 404 when resource not found", async () => {
    const response = await request(app).delete(
      `/trackPlays/${notExistingTrackPlayId}`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual(removeNotExistingTrackPlayResponse);
  });
});

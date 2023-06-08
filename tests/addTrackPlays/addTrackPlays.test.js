const request = require("supertest");

const addNewTrackPlaysBody = require("./mockedRequests/addNewTrackPlaysBody.json");
const addSomeNewTrackPlaysBody = require("./mockedRequests/addSomeNewTrackPlaysBody.json");
const addExistingTrackPlaysBody = require("./mockedRequests/addExistingTrackPlaysBody.json");
const addInvalidTrackPlaysBody = require("./mockedRequests/addInvalidTrackPlaysBody.json");
const addNewTrackPlaysSecondFormatBody = require("./mockedRequests/addNewTrackPlaysSecondFormatBody.json");
const addExistingTrackPlaysSecondFormatBody = require("./mockedRequests/addExistingTrackPlaysSecondFormatBody.json");
const addNewTrackPlaysResponse = require("./mockedResponses/addNewTrackPlaysResponse.json");
const addSomeNewTrackPlaysResponse = require("./mockedResponses/addSomeNewTrackPlaysResponse.json");
const addExistingTrackPlaysResponse = require("./mockedResponses/addExistingTrackPlaysResponse.json");
const addInvalidTrackPlaysResponse = require("./mockedResponses/addInvalidTrackPlaysResponse.json");

const { createApp } = require("../../dist/app");

const app = createApp();

describe("POST /trackPlays", () => {
  it("should add track plays", async () => {
    const response = await request(app)
      .post("/trackPlays")
      .send(addNewTrackPlaysBody);
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual(addNewTrackPlaysResponse);
  });

  it("should add only some track plays when some already exist", async () => {
    const response = await request(app)
      .post("/trackPlays")
      .send(addSomeNewTrackPlaysBody);
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual(addSomeNewTrackPlaysResponse);
  });

  it("shouldn't add any track plays when all already exist", async () => {
    const response = await request(app)
      .post("/trackPlays")
      .send(addExistingTrackPlaysBody);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(addExistingTrackPlaysResponse);
  });

  it("should return error when elements in request body are invalid", async () => {
    const response = await request(app)
      .post("/trackPlays")
      .send(addInvalidTrackPlaysBody);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(addInvalidTrackPlaysResponse);
  });

  it("should return error when request body is empty", async () => {
    const response = await request(app).post("/trackPlays").send();
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(addInvalidTrackPlaysResponse);
  });

  it("should add track plays (second body format)", async () => {
    const response = await request(app)
      .post("/trackPlays")
      .send(addNewTrackPlaysSecondFormatBody);
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual(addNewTrackPlaysResponse);
  });

  it("shouldn't add any track plays when all already exist (second body format)", async () => {
    const response = await request(app)
      .post("/trackPlays")
      .send(addExistingTrackPlaysSecondFormatBody);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(addExistingTrackPlaysResponse);
  });
});

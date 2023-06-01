const request = require("supertest");

const { createApp } = require("../dist/app");

const app = createApp();

const getTrackPlaysResponseBody = [
  {
    _id: "6475cecf61025ee3b39d7d0d",
    endTime: "2023-02-25 11:45",
    artistName: "No Doubt",
    trackName: "Don't Speak",
    msPlayed: 263560,
    __v: 0,
  },
  {
    _id: "6475cecf61025ee3b39d7d10",
    endTime: "2023-02-25 11:57",
    artistName: "The Beatles",
    trackName: "She's Leaving Home - Remastered 2009",
    msPlayed: 215160,
    __v: 0,
  },
  {
    _id: "6475cecf61025ee3b39d7d11",
    endTime: "2023-02-25 13:15",
    artistName: "Billy Joel",
    trackName: "Pressure",
    msPlayed: 280333,
    __v: 0,
  },
  {
    _id: "6475cecf61025ee3b39d7d12",
    endTime: "2023-02-25 13:28",
    artistName: "The Beatles",
    trackName:
      "Sgt. Pepper's Lonely Hearts Club Band - Reprise / Remastered 2009",
    msPlayed: 79066,
    __v: 0,
  },
  {
    _id: "6475cecf61025ee3b39d7d13",
    endTime: "2023-02-25 13:32",
    artistName: "Elton John",
    trackName: "Skyline Pigeon - Piano Version",
    msPlayed: 236200,
    __v: 0,
  },
];

describe("GET /trackPlays", () => {
  test("should get track plays", async () => {
    const response = await request(app).get("/trackPlays");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(getTrackPlaysResponseBody);
  });
});

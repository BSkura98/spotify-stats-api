import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";

import { Play } from "./models/Play";
import asyncWrapper from "./middleware/async";

config();

const port = 8000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Spotify Stats API");
});

app.get(
  "/plays",
  asyncWrapper(async (req: Request, res: Response) => {
    const plays = await Play.find({});
    res.status(200).json({ plays });
  })
);

app.post(
  "/plays",
  asyncWrapper(async (req: Request, res: Response) => {
    const play = new Play({
      endTime: "time2",
      artistName: "artist",
      trackName: "track",
      msPlayed: 6430,
    });
    await play.save();

    res.status(201).json(play);
  })
);

const start = async () => {
  try {
    if (process.env.MONGO_URI === undefined) {
      throw new Error("Mongo URI is undefined");
    }
    await connect(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

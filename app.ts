import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";

import trackPlays from "./routes/trackPlays";
import songsStats from "./routes/songsStats";
import artistsStats from "./routes/artistsStats";

config();

const port = 8000;

const app: Express = express();

app.use(express.json({ limit: "1mb" }));

app.use("/trackPlays", trackPlays);
app.use("/stats/songs", songsStats);
app.use("/stats/artists", artistsStats);

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

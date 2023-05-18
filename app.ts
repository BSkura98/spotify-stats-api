import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";

import plays from "./routes/plays";

config();

const port = 8000;

const app: Express = express();

app.use(express.json());

app.use("/plays", plays);

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

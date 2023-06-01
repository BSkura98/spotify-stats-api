import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";

import { createApp } from "./app";

config();

const port = process.env.NODE_ENV === "test" ? 8001 : 8000;

const start = async (app: express.Express) => {
  try {
    if (process.env.MONGO_URI === undefined) {
      throw new Error("Mongo URI is undefined");
    }
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

const app = createApp();

start(app);

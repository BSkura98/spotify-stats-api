import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { Play } from "../models/Play";

const getPlays = asyncWrapper(async (req: Request, res: Response) => {
  const plays = await Play.find({});
  res.status(200).json({ items: plays });
});

const createPlay = asyncWrapper(async (req: Request, res: Response) => {
  const play = new Play({
    endTime: "time2",
    artistName: "artist",
    trackName: "track",
    msPlayed: 6430,
  });
  await play.save();

  res.status(201).json(play);
});

export { getPlays, createPlay };

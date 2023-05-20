import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { IPlay, Play } from "../models/Play";

const getPlays = asyncWrapper(async (req: Request, res: Response) => {
  const plays = await Play.find({});
  res.status(200).json({ items: plays });
});

const addPlays = asyncWrapper(async (req: Request, res: Response) => {
  const plays = await Play.find({});
  const playsFromBody = req.body;

  const newPlays = playsFromBody.reduce(
    (result: IPlay[], playFromBody: IPlay) => {
      const playExistsInDatabase = plays.some(
        (playFromDb: IPlay) =>
          playFromBody.endTime === playFromDb.endTime &&
          playFromBody.artistName === playFromDb.artistName &&
          playFromBody.trackName === playFromDb.trackName &&
          playFromBody.msPlayed === playFromDb.msPlayed
      );

      if (!playExistsInDatabase) {
        result.push(playFromBody);
      }

      return result;
    },
    []
  );

  await Play.create(newPlays);

  res.status(201).json({ message: "Track plays successfully added" });
});

export { getPlays, addPlays };

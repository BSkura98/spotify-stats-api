import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { ITrackPlay, TrackPlay } from "../models/TrackPlay";

const getTrackPlays = asyncWrapper(async (req: Request, res: Response) => {
  const plays = await TrackPlay.find({});
  res.status(200).json({ items: plays });
});

const addTrackPlays = asyncWrapper(async (req: Request, res: Response) => {
  const trackPlays = await TrackPlay.find({});
  const trackPlaysFromBody = req.body;

  const newTrackPlays = trackPlaysFromBody.reduce(
    (trackPlaysToAdd: ITrackPlay[], playFromBody: ITrackPlay) => {
      const playExistsInDatabase = trackPlays.some(
        (playFromDb: ITrackPlay) =>
          playFromBody.endTime === playFromDb.endTime &&
          playFromBody.artistName === playFromDb.artistName &&
          playFromBody.trackName === playFromDb.trackName &&
          playFromBody.msPlayed === playFromDb.msPlayed
      );

      if (!playExistsInDatabase) {
        trackPlaysToAdd.push(playFromBody);
      }

      return trackPlaysToAdd;
    },
    []
  );

  await TrackPlay.create(newTrackPlays);

  res.status(201).json({ message: "Track plays successfully added" });
});

export { getTrackPlays, addTrackPlays };

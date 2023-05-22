import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { ITrackPlay, TrackPlay } from "../models/TrackPlay";
import { AddTrackPlaysBodyElement } from "./requestBodies/AddTrackPlaysBodyElement";
import { getTrackPlayBasedOnFormat } from "../helpers/getTrackPlayBasedOnFormat";

const getTrackPlays = asyncWrapper(async (req: Request, res: Response) => {
  const plays = await TrackPlay.find({});
  res.status(200).json({ items: plays });
});

const addTrackPlays = asyncWrapper(async (req: Request, res: Response) => {
  const trackPlaysFromDb = await TrackPlay.find({});
  const trackPlaysFromBody: AddTrackPlaysBodyElement[] = req.body;

  const newTrackPlays = trackPlaysFromBody.reduce(
    (
      trackPlaysToAdd: ITrackPlay[],
      trackPlayFromBody: AddTrackPlaysBodyElement
    ) => {
      const trackPlay = getTrackPlayBasedOnFormat(trackPlayFromBody);

      if (trackPlay) {
        const itemExistsInDatabase = trackPlaysFromDb.some(
          (playFromDb: ITrackPlay) =>
            trackPlay.endTime === playFromDb.endTime &&
            trackPlay.artistName === playFromDb.artistName &&
            trackPlay.trackName === playFromDb.trackName &&
            trackPlay.msPlayed === playFromDb.msPlayed
        );

        if (!itemExistsInDatabase) {
          const { endTime, artistName, trackName, msPlayed } = trackPlay;
          trackPlaysToAdd.push({ endTime, artistName, trackName, msPlayed });
        }
      }

      return trackPlaysToAdd;
    },
    []
  );

  await TrackPlay.create(newTrackPlays);

  res.status(201).json({ message: "Track plays successfully added" });
});

export { getTrackPlays, addTrackPlays };

import {
  differenceInMilliseconds,
  endOfDay,
  isEqual,
  startOfDay,
} from "date-fns";

import { getTrackPlayBasedOnFormat } from "./getTrackPlayBasedOnFormat";
import { ITrackPlay, TrackPlay } from "../../models/TrackPlay";
import { AddTrackPlaysBodyElement } from "./request";
import { TrackPlay as TrackPlayFormatted } from "./getTrackPlayBasedOnFormat";
import database from "../../database/database";

export const addTrackPlaysService = async (
  trackPlays: AddTrackPlaysBodyElement[]
) => {
  const trackPlaysFormatted = trackPlays.map((trackPlay) =>
    getTrackPlayBasedOnFormat(trackPlay)
  );

  const firstTrackPlayDate = startOfDay(
    new Date(trackPlaysFormatted[0]?.endTime || "")
  );
  const lastTrackPlayDate = endOfDay(
    new Date(trackPlaysFormatted[trackPlaysFormatted.length - 1]?.endTime || "")
  );
  const trackPlaysFromDb = (
    await database.getTrackPlays({
      startDate: firstTrackPlayDate,
      endDate: lastTrackPlayDate,
    })
  ).sort((trackPlay1, trackPlay2) =>
    differenceInMilliseconds(trackPlay1.endTime, trackPlay2.endTime)
  );

  const newTrackPlays = trackPlaysFormatted.reduce(
    (trackPlaysToAdd: ITrackPlay[], trackPlay: TrackPlayFormatted | null) => {
      if (trackPlay) {
        const itemExistsInDatabase = trackPlaysFromDb.some(
          (playFromDb: ITrackPlay) =>
            isEqual(trackPlay.endTime, playFromDb.endTime) &&
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

  const createdTrackPlays = await TrackPlay.create(newTrackPlays);

  return createdTrackPlays.map((trackPlays) => trackPlays._id);
};

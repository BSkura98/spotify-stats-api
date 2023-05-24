import { getTrackPlayBasedOnFormat } from "./getTrackPlayBasedOnFormat";
import { ITrackPlay, TrackPlay } from "../../models/TrackPlay";
import { AddTrackPlaysBodyElement } from "./request";

export const addTrackPlaysService = async (trackPlays: AddTrackPlaysBodyElement[]) => {
  const trackPlaysFromDb = await TrackPlay.find({});

  const newTrackPlays = trackPlays.reduce(
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

  return await TrackPlay.create(newTrackPlays);
};

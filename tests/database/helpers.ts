import { ITrackPlay } from "../../models/TrackPlay";

export const getFakeSavedTrackPlays = (trackPlays: ITrackPlay[]) => {
  let counter = 0;
  return trackPlays.map((trackPlay) => {
    return {
      ...trackPlay,
      _id: `fakeId${(counter += 1)}${trackPlay.artistName.replace(
        " ",
        ""
      )}${trackPlay.trackName.replaceAll(" ", "")}`,
      __v: 0,
    };
  });
};

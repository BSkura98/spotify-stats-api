import { endOfDay, startOfDay } from "date-fns";
import { FilterQuery } from "mongoose";

import { ITrackPlay, TrackPlay } from "../../models/TrackPlay";
import { GetTopSongsParameters } from "./requestParameters";

interface RankedSong {
  position?: number;
  artistName: string;
  trackName: string;
  totalMsPlayed: number;
}

const getFilterQuery = (requestParameters: GetTopSongsParameters) => {
  let filter: FilterQuery<ITrackPlay> = {};

  if (requestParameters.startDate || requestParameters.endDate) {
    filter = { endTime: {} };
    if (requestParameters.startDate) {
      filter.endTime.$gte = startOfDay(new Date(requestParameters.startDate));
    }
    if (requestParameters.endDate) {
      filter.endTime.$lte = endOfDay(new Date(requestParameters.endDate));
    }
  }

  return filter;
};

export const getTopSongsService = async (
  requestParameters: GetTopSongsParameters
) => {
  const trackPlays = await TrackPlay.find(getFilterQuery(requestParameters));

  const rankedSongs = trackPlays.reduce(
    (songs: RankedSong[], trackPlay: ITrackPlay) => {
      let isSongInArray = false;
      for (let i = 0; i < songs.length; i++) {
        if (
          songs[i].artistName === trackPlay.artistName &&
          songs[i].trackName === trackPlay.trackName
        ) {
          songs[i].totalMsPlayed += trackPlay.msPlayed;
          isSongInArray = true;
          break;
        }
      }
      if (!isSongInArray) {
        songs.push({
          artistName: trackPlay.artistName,
          trackName: trackPlay.trackName,
          totalMsPlayed: trackPlay.msPlayed,
        });
      }

      songs.sort(
        (song1: RankedSong, song2: RankedSong) =>
          song2.totalMsPlayed - song1.totalMsPlayed
      );
      songs.forEach((song: RankedSong, index: number) => {
        song.position = index + 1;
      });
      return songs;
    },
    []
  );

  return rankedSongs;
};

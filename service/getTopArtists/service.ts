import { FilterQuery } from "mongoose";
import { endOfDay, startOfDay } from "date-fns";

import { ITrackPlay, TrackPlay } from "../../models/TrackPlay";
import { GetTopArtistsParameters } from "./requestParameters";

interface RankedArtist {
  position?: number;
  artistName: string;
  totalMsPlayed: number;
}

const getFilterQuery = (requestParameters: GetTopArtistsParameters) => {
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

export const getTopArtistsService = async (
  requestParameters: GetTopArtistsParameters
) => {
  const trackPlays = await TrackPlay.find(getFilterQuery(requestParameters));

  const rankedArtists = trackPlays.reduce(
    (artists: RankedArtist[], trackPlay: ITrackPlay) => {
      let isArtistInArray = false;
      for (let i = 0; i < artists.length; i++) {
        if (artists[i].artistName === trackPlay.artistName) {
          artists[i].totalMsPlayed += trackPlay.msPlayed;
          isArtistInArray = true;
          break;
        }
      }
      if (!isArtistInArray) {
        artists.push({
          artistName: trackPlay.artistName,
          totalMsPlayed: trackPlay.msPlayed,
        });
      }

      artists.sort(
        (song1: RankedArtist, song2: RankedArtist) =>
          song2.totalMsPlayed - song1.totalMsPlayed
      );
      artists.forEach((song: RankedArtist, index: number) => {
        song.position = index + 1;
      });
      return artists;
    },
    []
  );

  return rankedArtists;
};

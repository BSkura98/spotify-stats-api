import { ITrackPlay, TrackPlay } from "../../models/TrackPlay";

interface RankedArtist {
  position?: number;
  artistName: string;
  totalMsPlayed: number;
}

export const getTopArtistsService = async () => {
  const trackPlays = await TrackPlay.find({});

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

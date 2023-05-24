import { ITrackPlay, TrackPlay } from "../../models/TrackPlay";

interface RankedSong {
  position?: number;
  artistName: string;
  trackName: string;
  totalMsPlayed: number;
}

export const getTopSongsService = async () => {
  const trackPlays = await TrackPlay.find({});

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

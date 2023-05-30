import { isSameDay, startOfDay } from "date-fns";

import { NotFoundError } from "../../errors/NotFoundError";
import { ITrackPlay, TrackPlay } from "../../models/TrackPlay";
import { GetSongStatsBody } from "./request";
import { searchForSong } from "../../spotifyApi/requests";
import { GetSongStatsResponse } from "./response";
import { SearchForSongResponseElement } from "../../spotifyApi/interfaces/SearchForSongResponseElement";

const getFirstMatchingResultInSpotify = (
  resultsInSpotify: SearchForSongResponseElement[],
  trackName: string,
  artistName: string
) =>
  resultsInSpotify.filter(
    (song: SearchForSongResponseElement) =>
      song.name === trackName &&
      song.artists
        .map((artist: { name: string }) => artist.name)
        .includes(artistName)
  )[0];

const getMostPopularDays = (trackPlays: ITrackPlay[], durationMs: number) =>
  trackPlays
    .reduce(
      (
        days: { date: Date; totalMsPlayed: number }[],
        trackPlay: ITrackPlay
      ) => {
        let dayFound = false;
        days = days.map((day) => {
          if (isSameDay(day.date, trackPlay.endTime)) {
            dayFound = true;
            return {
              ...day,
              totalMsPlayed: day.totalMsPlayed + trackPlay.msPlayed,
            };
          }
          return day;
        });
        if (!dayFound) {
          days.push({
            date: trackPlay.endTime,
            totalMsPlayed: trackPlay.msPlayed,
          });
        }
        return days;
      },
      []
    )
    .sort((day1, day2) => day2.totalMsPlayed - day1.totalMsPlayed)
    .slice(0, 10)
    .map((day) => ({
      date: startOfDay(day.date).toLocaleDateString("pl-PL"),
      fullSongPlays: day.totalMsPlayed / durationMs,
    }));

export const getSongStatsService = async (
  request: GetSongStatsBody
): Promise<GetSongStatsResponse> => {
  const { artistName, trackName } = request;

  const trackPlays = await TrackPlay.find({ artistName, trackName });
  if (!trackPlays) {
    throw new NotFoundError();
  }

  const firstPlay = trackPlays.reduce((oldestTrackPlay, trackPlay) =>
    trackPlay.endTime < oldestTrackPlay.endTime ? trackPlay : oldestTrackPlay
  ).endTime;

  const totalMsPlayed = trackPlays.reduce(
    (msPlayed: number, trackPlay: ITrackPlay) =>
      (msPlayed += trackPlay.msPlayed),
    0
  );

  const resultsInSpotify = await searchForSong(artistName, trackName, request);
  const firstMatchingResultInSpotify = getFirstMatchingResultInSpotify(
    resultsInSpotify,
    trackName,
    artistName
  );
  const fullSongPlays =
    totalMsPlayed / firstMatchingResultInSpotify.duration_ms;

  const mostPopularDays = getMostPopularDays(
    trackPlays,
    firstMatchingResultInSpotify.duration_ms
  );

  return {
    artistName,
    trackName,
    firstPlay,
    totalMsPlayed,
    fullSongPlays,
    mostPopularDays,
  };
};

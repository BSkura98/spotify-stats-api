import { AddTrackPlaysBodyElement } from "../controllers/requestBodies/AddTrackPlaysBodyElement";

interface TrackPlay {
  endTime: string;
  artistName: string;
  trackName: string;
  msPlayed: number;
}

export const getTrackPlayBasedOnFormat = (
  playFromBody: AddTrackPlaysBodyElement
): TrackPlay | null => {
  const trackPlay = {
    endTime: playFromBody.ts || playFromBody.endTime,
    artistName:
      playFromBody.master_metadata_album_artist_name || playFromBody.artistName,
    trackName:
      playFromBody.master_metadata_track_name || playFromBody.trackName,
    msPlayed: playFromBody.ms_played || playFromBody.msPlayed,
  };

  if (
    !trackPlay.endTime ||
    !trackPlay.artistName ||
    !trackPlay.trackName ||
    !trackPlay.msPlayed
  ) {
    return null;
  }

  return trackPlay as TrackPlay;
};

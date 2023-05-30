import { setSeconds } from "date-fns";

import { AddTrackPlaysBodyElement } from "./request";

export interface TrackPlay {
  endTime: Date;
  artistName: string;
  trackName: string;
  msPlayed: number;
}

export const getTrackPlayBasedOnFormat = (
  playFromBody: AddTrackPlaysBodyElement
): TrackPlay | null => {
  let endTime;
  if (playFromBody.ts) {
    endTime = setSeconds(new Date(playFromBody.ts), 0);
  } else {
    endTime = playFromBody.endTime
      ? new Date(`${playFromBody.endTime}:00Z`.replace(" ", "T"))
      : undefined;
  }

  const trackPlay = {
    endTime,
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

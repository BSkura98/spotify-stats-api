import { setSeconds } from "date-fns";

import { AddTrackPlaysBodyElement } from "./request";
import { BadRequestError } from "../../errors/BadRequestError";

export interface TrackPlay {
  endTime: Date;
  artistName: string;
  trackName: string;
  msPlayed: number;
}

export const getTrackPlaysBasedOnBodyFormat = (
  trackPlaysFromBody: AddTrackPlaysBodyElement[]
): TrackPlay[] =>
  !Array.isArray(trackPlaysFromBody)
    ? []
    : trackPlaysFromBody
        .filter(
          (trackPlay) =>
            (trackPlay.endTime || trackPlay.ts) &&
            (trackPlay.artistName ||
              trackPlay.master_metadata_album_artist_name) &&
            (trackPlay.trackName || trackPlay.master_metadata_track_name) &&
            (trackPlay.msPlayed || trackPlay.ms_played)
        )
        .map((trackPlay): TrackPlay => {
          let endTime;
          if (trackPlay.ts) {
            endTime = setSeconds(new Date(trackPlay.ts), 0);
          } else {
            endTime = trackPlay.endTime
              ? new Date(`${trackPlay.endTime}:00Z`.replace(" ", "T"))
              : undefined;
          }

          return {
            endTime: endTime!,
            artistName:
              trackPlay.master_metadata_album_artist_name ||
              trackPlay.artistName!,
            trackName:
              trackPlay.master_metadata_track_name || trackPlay.trackName!,
            msPlayed: trackPlay.ms_played || trackPlay.msPlayed!,
          };
        });

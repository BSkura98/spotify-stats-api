export interface AddTrackPlaysBodyElement {
  // first format
  endTime?: string;
  artistName?: string;
  trackName?: string;
  msPlayed?: number;

  // second format
  ts?: string;
  master_metadata_album_artist_name?: string;
  master_metadata_track_name?: string;
  ms_played?: number;
}

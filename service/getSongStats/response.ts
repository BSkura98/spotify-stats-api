export interface GetSongStatsResponse {
  artistName: string;
  trackName: string;
  firstPlay: Date;
  totalMsPlayed: number;
  fullSongPlays: number;
}

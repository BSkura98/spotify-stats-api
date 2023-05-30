export interface DayWithFullPlays {
  date: string;
  fullSongPlays: number;
}

export interface GetSongStatsResponse {
  artistName: string;
  trackName: string;
  firstPlay: Date;
  totalMsPlayed: number;
  fullSongPlays: number;
  mostPopularDays: DayWithFullPlays[];
}

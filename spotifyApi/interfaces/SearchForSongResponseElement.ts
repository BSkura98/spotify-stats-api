export interface SearchForSongResponseElement {
  name: string;
  artists: { name: string }[];
  duration_ms: number;
}

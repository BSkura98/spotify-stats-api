interface Artist {
  name: string;
}

export interface SearchForSongResponseElement {
  name: string;
  artists: Artist[];
  duration_ms: number;
}

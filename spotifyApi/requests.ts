import axios from "axios";
import { stringify } from "querystring";

import { BaseRequest } from "../utils/interfaces/BaseRequest";
import { getConfig } from "./getConfig";
import { SearchForSongResponseElement } from "./interfaces/SearchForSongResponseElement";

export const searchForSong = async (
  artist: string,
  track: string,
  { accessToken }: BaseRequest
): Promise<SearchForSongResponseElement[]> => {
  try {
    // Spotify API doesn't handle single quotation mark correctly
    const trackName = track.replace("'", "");
    const artistName = artist.replace("'", "");

    const response = await axios.get(
      "/search?" +
        stringify({
          q: `track:${trackName} artist:${artistName}`,
          type: "track",
          limit: 20,
        }),
      getConfig(accessToken)
    );
    return response.data.tracks.items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

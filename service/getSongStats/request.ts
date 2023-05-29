import { BaseRequest } from "../../utils/interfaces/BaseRequest";

export interface GetSongStatsBody extends BaseRequest {
  artistName: string;
  trackName: string;
}

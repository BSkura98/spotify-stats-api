import { TrackPlay } from "../models/TrackPlay";

export const existsTrackPlay = async (_id: string) =>
  await TrackPlay.exists({ _id });

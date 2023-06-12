import { TrackPlay } from "../models/TrackPlay";

export const deleteTrackPlay = async (_id: string) =>
  await TrackPlay.deleteOne({ _id });

import { ITrackPlay, TrackPlay } from "../models/TrackPlay";

export const addTrackPlays = async (trackPlays: ITrackPlay[]) =>
  await TrackPlay.create(trackPlays);

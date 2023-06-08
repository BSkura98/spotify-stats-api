import { ITrackPlay, TrackPlay } from "../models/TrackPlay";

export const addTrackPlays = async (trackPlays: ITrackPlay[]) =>
  TrackPlay.create(trackPlays);

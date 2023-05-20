import { Schema, model } from "mongoose";

interface ITrackPlay {
  endTime: string;
  artistName: string;
  trackName: string;
  msPlayed: number;
}

const trackPlaySchema = new Schema<ITrackPlay>({
  endTime: { type: String, required: true },
  artistName: { type: String, required: true },
  trackName: { type: String, required: true },
  msPlayed: { type: Number, required: true },
});

const TrackPlay = model<ITrackPlay>("TrackPlay", trackPlaySchema);

export { TrackPlay, ITrackPlay };

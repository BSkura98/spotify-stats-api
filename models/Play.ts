import { Schema, model } from "mongoose";

interface IPlay {
  endTime: string;
  artistName: string;
  trackName: string;
  msPlayed: number;
}

const playSchema = new Schema<IPlay>({
  endTime: { type: String, required: true },
  artistName: { type: String, required: true },
  trackName: { type: String, required: true },
  msPlayed: { type: Number, required: true },
});

const Play = model<IPlay>("Play", playSchema);

export { Play };

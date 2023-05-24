import { TrackPlay } from "../../models/TrackPlay";

export const getTrackPlaysService = async () => {
  return await TrackPlay.find({});
};

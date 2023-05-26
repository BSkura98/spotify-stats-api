import { NotFoundError } from "../../errors/NotFoundError";
import { TrackPlay } from "../../models/TrackPlay";

export const deleteTrackPlayService = async (id: string) => {
  const trackPlayExists = await TrackPlay.exists({ _id: id });
  if (!trackPlayExists) {
    throw new NotFoundError();
  }

  return TrackPlay.deleteOne({ _id: id });
};

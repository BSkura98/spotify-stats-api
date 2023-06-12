import database from "../../database/database";
import { NotFoundError } from "../../errors/NotFoundError";

export const deleteTrackPlayService = async (id: string) => {
  const trackPlayExists = await database.existsTrackPlay(id);
  if (!trackPlayExists) {
    throw new NotFoundError();
  }

  return database.deleteTrackPlay(id);
};

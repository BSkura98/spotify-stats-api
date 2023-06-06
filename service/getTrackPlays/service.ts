import database from "../../database/database";

export const getTrackPlaysService = async () => {
  return await database.getTrackPlays();
};

import database from "../../database/getTrackPlays";

export const getTrackPlaysService = async () => {
  return await database.getTrackPlays();
};

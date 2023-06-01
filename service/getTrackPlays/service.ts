import database from "../../database/trackPlays";

export const getTrackPlaysService = async () => {
  return await database.getTrackPlays();
};

import database from "../../database/database";
import { GetTrackPlaysParameters } from "./requestParameters";

export const getTrackPlaysService = async ({
  startDate,
  endDate,
}: GetTrackPlaysParameters) => {
  return await database.getTrackPlays({
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
  });
};

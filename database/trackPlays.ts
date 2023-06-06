import { endOfDay, startOfDay } from "date-fns";
import { FilterQuery } from "mongoose";

import testDatabase from "../tests/database/testDatabase";
import { ITrackPlay, TrackPlay } from "../models/TrackPlay";

interface GetTrackPlaysParameters {
  startDate?: Date;
  endDate?: Date;
}

const getFilterQuery = (requestParameters?: GetTrackPlaysParameters) => {
  let filter: FilterQuery<ITrackPlay> = {};

  if (requestParameters?.startDate || requestParameters?.endDate) {
    filter = { endTime: {} };
    if (requestParameters.startDate) {
      filter.endTime.$gte = startOfDay(new Date(requestParameters.startDate));
    }
    if (requestParameters.endDate) {
      filter.endTime.$lte = endOfDay(new Date(requestParameters.endDate));
    }
  }

  return filter;
};

const getTrackPlays = async (
  parameters?: GetTrackPlaysParameters
): Promise<ITrackPlay[]> => TrackPlay.find(getFilterQuery(parameters));

const database = { getTrackPlays };

export default process.env.NODE_ENV === "test" ? testDatabase : database;

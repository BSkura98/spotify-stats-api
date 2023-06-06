import { endOfDay, startOfDay } from "date-fns";
import { FilterQuery } from "mongoose";

import { ITrackPlay, TrackPlay } from "../models/TrackPlay";

interface GetTrackPlaysParameters {
  startDate?: Date;
  endDate?: Date;
}

const getFilterQuery = (parameters?: GetTrackPlaysParameters) => {
  let filter: FilterQuery<ITrackPlay> = {};

  if (parameters?.startDate || parameters?.endDate) {
    filter = { endTime: {} };
    if (parameters.startDate) {
      filter.endTime.$gte = startOfDay(new Date(parameters.startDate));
    }
    if (parameters.endDate) {
      filter.endTime.$lte = endOfDay(new Date(parameters.endDate));
    }
  }

  return filter;
};

export const getTrackPlays = async (
  parameters?: GetTrackPlaysParameters
): Promise<ITrackPlay[]> => TrackPlay.find(getFilterQuery(parameters));


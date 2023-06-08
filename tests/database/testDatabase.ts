import { ITrackPlay } from "../../models/TrackPlay";
import getTrackPlaysMockData from "./mockedDatabaseData/getTrackPlaysMockData";
import { getFakeSavedTrackPlays } from "./helpers";

const getTrackPlays = (): Promise<ITrackPlay[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getTrackPlaysMockData);
    }, 200);
  });
};

const addTrackPlays = (
  trackPlays: ITrackPlay[]
): Promise<(ITrackPlay & { _id: string; __v: number })[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFakeSavedTrackPlays(trackPlays));
    }, 200);
  });
};

export default {
  getTrackPlays,
  addTrackPlays,
};

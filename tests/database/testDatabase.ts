import { ITrackPlay } from "../../models/TrackPlay";
import getTrackPlaysMockData from "./mockedDatabaseData/getTrackPlaysMockData";

const getTrackPlays = (): Promise<ITrackPlay[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getTrackPlaysMockData);
    }, 200);
  });
};

export default {
  getTrackPlays,
};

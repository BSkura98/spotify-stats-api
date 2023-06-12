import { DeleteResult } from "mongodb";
import { ObjectId } from "mongoose";

import { ITrackPlay } from "../../models/TrackPlay";
import trackPlaysFakeData from "./trackPlaysFakeData";
import { getFakeSavedTrackPlays } from "./helpers";

const getTrackPlays = (): Promise<ITrackPlay[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(trackPlaysFakeData);
    }, 200);
  });

const addTrackPlays = (
  trackPlays: ITrackPlay[]
): Promise<(ITrackPlay & { _id: string; __v: number })[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFakeSavedTrackPlays(trackPlays));
    }, 200);
  });

const deleteTrackPlay = (_id: string): Promise<DeleteResult> =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (trackPlaysFakeData.some((trackPlay) => trackPlay._id === _id)) {
        return resolve({ acknowledged: true, deletedCount: 1 });
      }
      resolve({ acknowledged: false, deletedCount: 0 });
    }, 200);
  });

const existsTrackPlay = (_id: string): Promise<{ _id: ObjectId } | null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (trackPlaysFakeData.some((trackPlay) => trackPlay._id === _id)) {
        return resolve({ _id: _id as unknown as ObjectId });
      }
      resolve(null);
    }, 200);
  });

export default {
  getTrackPlays,
  addTrackPlays,
  deleteTrackPlay,
  existsTrackPlay,
};

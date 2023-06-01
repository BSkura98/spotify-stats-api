import testDatabase from "../tests/database/testDatabase";

import { TrackPlay } from "../models/TrackPlay";

const getTrackPlays = async () => {
  return TrackPlay.find({});
};

const database =
  process.env.NODE_ENV === "test" ? testDatabase : { getTrackPlays };

export default { ...database };

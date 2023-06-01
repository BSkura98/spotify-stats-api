import testDatabase from "../tests/database/testDatabase";

import { TrackPlay } from "../models/TrackPlay";

const getTrackPlays = async () => TrackPlay.find({});

export default process.env.NODE_ENV === "test"
  ? testDatabase
  : { getTrackPlays };

import testDatabase from "../tests/database/testDatabase";
import { getTrackPlays } from "./getTrackPlays";

const database = { getTrackPlays };

export default process.env.NODE_ENV === "test" ? testDatabase : database;

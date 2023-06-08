import testDatabase from "../tests/database/testDatabase";
import { addTrackPlays } from "./addTrackPlays";
import { getTrackPlays } from "./getTrackPlays";

const database = { getTrackPlays, addTrackPlays };

export default process.env.NODE_ENV === "test" ? testDatabase : database;

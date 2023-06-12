import testDatabase from "../tests/database/testDatabase";
import { addTrackPlays } from "./addTrackPlays";
import { deleteTrackPlay } from "./deleteTrackPlay";
import { existsTrackPlay } from "./existsTrackPlay";
import { getTrackPlays } from "./getTrackPlays";

const database = { getTrackPlays, addTrackPlays, deleteTrackPlay, existsTrackPlay };

export default process.env.NODE_ENV === "test" ? testDatabase : database;

import express from "express";

import { getTrackPlays, addTrackPlays } from "../controllers/trackPlays";

const router = express.Router();

router.route("/").get(getTrackPlays).post(addTrackPlays);

export default router;

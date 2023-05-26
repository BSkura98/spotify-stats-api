import express from "express";

import {
  getTrackPlays,
  addTrackPlays,
  deleteTrackPlay,
} from "../controllers/trackPlays";

const router = express.Router();

router.route("/").get(getTrackPlays).post(addTrackPlays);

router.route("/:id").delete(deleteTrackPlay);

export default router;

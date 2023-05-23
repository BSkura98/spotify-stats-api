import express from "express";

import { getTopSongs } from "../controllers/songsStats";

const router = express.Router();

router.route("/").get(getTopSongs);

export default router;

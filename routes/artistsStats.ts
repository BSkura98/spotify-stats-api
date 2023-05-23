import express from "express";

import { getTopArtists } from "../controllers/artistsStats";

const router = express.Router();

router.route("/").get(getTopArtists);

export default router;

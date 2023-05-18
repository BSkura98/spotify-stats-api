import express from "express";

import { getPlays, createPlay } from "../controllers/plays";

const router = express.Router();

router.route("/").get(getPlays).post(createPlay);

export default router;

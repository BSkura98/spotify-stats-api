import express from "express";

import { getSongStats } from "../controllers/songStats";

const router = express.Router();

router.route("/").get(getSongStats);

export default router;

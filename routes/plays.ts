import express from "express";

import { getPlays, addPlays } from "../controllers/plays";

const router = express.Router();

router.route("/").get(getPlays).post(addPlays);

export default router;

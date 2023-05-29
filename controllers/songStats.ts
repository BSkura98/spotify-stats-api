import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { GetSongStatsBody } from "../service/getSongStats/request";
import { getSongStatsService } from "../service/getSongStats/service";
import { errorResponse } from "../utils/errorResponse";
import { RequestError } from "../errors/RequestError";

const getSongStats = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const body: GetSongStatsBody = req.body;

    const songStats = await getSongStatsService(body);

    res.status(200).json(songStats);
  } catch (error) {
    errorResponse(res, error as RequestError);
  }
});

export { getSongStats };

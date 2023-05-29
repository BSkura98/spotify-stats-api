import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { getTopSongsService } from "../service/getTopSongs/service";
import { GetTopSongsParameters } from "../service/getTopSongs/requestParameters";
import { errorResponse } from "../utils/errorResponse";
import { RequestError } from "../errors/RequestError";

const getTopSongs = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const requestParameters: GetTopSongsParameters = req.query;

    const rankedSongs = await getTopSongsService(requestParameters);

    res.status(200).json(rankedSongs);
  } catch (error) {
    errorResponse(res, error as RequestError);
  }
});

export { getTopSongs };

import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { getTopSongsService } from "../service/getTopSongs/service";
import { GetTopSongsParameters } from "../service/getTopSongs/requestParameters";

const getTopSongs = asyncWrapper(async (req: Request, res: Response) => {
  const requestParameters: GetTopSongsParameters = req.query;

  const rankedSongs = await getTopSongsService(requestParameters);

  res.status(200).json(rankedSongs);
});

export { getTopSongs };

import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { getTopSongsService } from "../service/getTopSongs/service";

const getTopSongs = asyncWrapper(async (req: Request, res: Response) => {
  const rankedSongs = await getTopSongsService();

  res.status(200).json(rankedSongs);
});

export { getTopSongs };

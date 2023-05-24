import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { getTopArtistsService } from "../service/getTopArtists/service";

const getTopArtists = asyncWrapper(async (req: Request, res: Response) => {
  const rankedArtists = await getTopArtistsService();

  res.status(200).json(rankedArtists);
});

export { getTopArtists };

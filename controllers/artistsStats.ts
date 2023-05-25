import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { getTopArtistsService } from "../service/getTopArtists/service";
import { GetTopArtistsParameters } from "../service/getTopArtists/requestParameters";

const getTopArtists = asyncWrapper(async (req: Request, res: Response) => {
  const requestParameters: GetTopArtistsParameters = req.query;

  const rankedArtists = await getTopArtistsService(requestParameters);

  res.status(200).json(rankedArtists);
});

export { getTopArtists };

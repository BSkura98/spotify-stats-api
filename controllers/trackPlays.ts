import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { AddTrackPlaysBodyElement } from "../service/addTrackPlays/request";
import { addTrackPlaysService } from "../service/addTrackPlays/service";
import { getTrackPlaysService } from "../service/getTrackPlays/service";

const getTrackPlays = asyncWrapper(async (req: Request, res: Response) => {
  const plays = await getTrackPlaysService();
  res.status(200).json(plays);
});

const addTrackPlays = asyncWrapper(async (req: Request, res: Response) => {
  const trackPlaysFromBody: AddTrackPlaysBodyElement[] = req.body;

  await addTrackPlaysService(trackPlaysFromBody);

  res.status(201).json({ message: "Track plays successfully added" });
});

export { getTrackPlays, addTrackPlays };

import { Request, Response } from "express";

import asyncWrapper from "../middleware/async";
import { AddTrackPlaysBodyElement } from "../service/addTrackPlays/request";
import { addTrackPlaysService } from "../service/addTrackPlays/service";
import { getTrackPlaysService } from "../service/getTrackPlays/service";
import { deleteTrackPlayService } from "../service/deleteTrackPlay/service";
import { RequestError } from "../errors/RequestError";
import { errorResponse } from "../utils/errorResponse";

const getTrackPlays = asyncWrapper(async (req: Request, res: Response) => {
  const plays = await getTrackPlaysService();
  res.status(200).json(plays);
});

const addTrackPlays = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const trackPlaysFromBody: AddTrackPlaysBodyElement[] = req.body;

    const ids = await addTrackPlaysService(trackPlaysFromBody);

    if (ids.length === 0) {
      return res.status(200).json({ message: "All track plays already exist" });
    }
    res.status(201).json({ message: "Track plays successfully added", ids });
  } catch (error) {
    errorResponse(res, error as RequestError);
  }
});

const deleteTrackPlay = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteTrackPlayService(id);

    res.status(200).json({ message: "Track play successfully deleted" });
  } catch (error) {
    errorResponse(res, error as RequestError);
  }
});

export { getTrackPlays, addTrackPlays, deleteTrackPlay };

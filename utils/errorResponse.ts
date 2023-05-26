import { Response } from "express";

import { RequestError } from "../errors/RequestError";

const getErrorMessage = (error: RequestError) => {
  if (error.message) {
    return error.message;
  }

  if (!error.statusCode || error.statusCode === 500) {
    return "Internal Server Error";
  }

  return `Error ${error.statusCode}`;
};

export const errorResponse = (res: Response, error: RequestError) => {
  res.status(error.statusCode ?? 500).json({ message: getErrorMessage(error) });
};

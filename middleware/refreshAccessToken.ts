import { Request, Response, NextFunction } from "express";
import request from "request";

export const authenticateAndRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("authorization");
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const refresh_token = authorization.substring(7, authorization.length);
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      // @ts-ignore
      req.accessToken = access_token;
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  });
};

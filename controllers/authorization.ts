import { Request, Response } from "express";
import { stringify } from "querystring";
import request from "request";

import asyncWrapper from "../middleware/async";
import { generateRandomString } from "../helpers/generateRandomString";

const redirect_uri = "http://localhost:8000/callback";

const login = asyncWrapper(async (req: Request, res: Response) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: "user-read-private user-read-email",
        redirect_uri,
        state: generateRandomString(16),
      })
  );
});

const callback = asyncWrapper(async (req: Request, res: Response) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (code && state) {
    if (state === null) {
      res.redirect(
        "/#" +
          stringify({
            error: "state_mismatch",
          })
      );
    } else {
      const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64"),
        },
        json: true,
      };

      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token,
            refresh_token = body.refresh_token;

          res.redirect(
            "/authorized?" +
              stringify({
                access_token: access_token,
                refresh_token: refresh_token,
              })
          );
        } else {
          res.redirect(
            "/#" +
              stringify({
                error: "invalid_token",
              })
          );
        }
      });
    }
  }
});

const authorized = asyncWrapper(async (req: Request, res: Response) => {
  const { access_token, refresh_token } = req.query;

  res.status(200).json({ access_token, refresh_token });
});

export { login, callback, authorized };

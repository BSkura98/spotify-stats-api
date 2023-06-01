import express, { Express } from "express";

import trackPlays from "./routes/trackPlays";
import songsStats from "./routes/songsStats";
import artistsStats from "./routes/artistsStats";
import { authenticateAndRefreshToken } from "./middleware/refreshAccessToken";
import { authorized, callback, login } from "./controllers/authorization";
import songStats from "./routes/songStats";

export const createApp = () => {
  const app: Express = express();

  app.use(express.json({ limit: "50mb" }));

  app.get("/login", login);
  app.get("/callback", callback);
  app.get("/authorized", authorized);

  app.use("/trackPlays", authenticateAndRefreshToken, trackPlays);
  app.use("/stats/songs", authenticateAndRefreshToken, songsStats);
  app.use("/stats/artists", authenticateAndRefreshToken, artistsStats);
  app.use("/stats/song", authenticateAndRefreshToken, songStats);

  return app;
};

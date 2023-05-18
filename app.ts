import express, { Express, Request, Response } from "express";

const port = 8000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Spotify Stats API");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

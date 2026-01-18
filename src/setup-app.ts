import express, { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { HttpStatus } from "./types/http-statuses";
import { videoRouter } from "./routers/videoRouters";
// import { videoRouter } from "./routers/videoRouters";
export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  app.use("/videos", videoRouter);

  // основной роут
  app.get("/", (req, res) => {
    res.status(HttpStatus.Ok).send("Hello incubator!!!!!");
  });

  return app;
};

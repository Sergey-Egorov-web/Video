import express, { Router, Request, Response } from "express";
import { db } from "../db/in-memory.db";
import { APIErrorResult, Resolutions, Video } from "../videos/types/videos";
import { HttpStatus } from "../types/http-statuses";
import { videoInputValidation } from "../videos/types/validation";

// export const videoRouter = Router({});

export const videoRouter: ReturnType<typeof Router> = Router();

videoRouter.get("", (req: Request, res: Response) => {
  res.status(200).send(db.videos);
});

videoRouter.get(
  "/:id",
  (req: Request<{ id: string }>, res: Response<Video | null>) => {
    const video = db.videos.find((d) => d.id === +req.params.id);
    if (!video) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    res.status(HttpStatus.Ok).send(video);
  }
);

videoRouter.post("/", (req: Request, res: Response) => {
  const errors: APIErrorResult = videoInputValidation(req.body);

  if (errors.errorMessages.length > 0) {
    res.status(HttpStatus.BadRequest).send(errors);
    return;
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let newId: number = 1;

  if (db.videos.length > 0) {
    const lastVideo = db.videos[db.videos.length - 1];
    if (lastVideo) {
      // Теперь TypeScript знает, что lastVideo не undefined
      newId = lastVideo.id + 1;
    }
  }

  //   const lastId = db.videos.length > 0 ? db.videos[db.videos.length - 1].id : 0;
  //   const newId = lastId + 1;

  const newVideo: Video = {
    // id: new Date().toString(),
    id: newId,
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: true,
    minAgeRestriction: 0, // maximum: 18   minimum: 1  default: null   null - no restriction
    createdAt: today, // ($date-time)
    publicationDate: tomorrow, // ($date-time) By default - +1 day from CreatedAt
    availableResolutions: [Resolutions.P144, Resolutions.P720],
  };
  db.videos.push(newVideo);
  res.status(HttpStatus.Created).send(newVideo);
});
videoRouter.put(
  "/videos/:id",
  (req: Request<{ id: string }>, res: Response<Video | null>) => {
    let id = req.params.id;

    const indexVideo = db.videos.findIndex((v) => v.id === +id);

    if (indexVideo === -1) {
      res.sendStatus(HttpStatus.NotFound);

      return;
    }
    const video = db.videos[indexVideo]!;

    video.author = req.body.author;
    video.title = req.body.title;
    video.canBeDownloaded = req.body.canBeDownloaded;
    video.availableResolutions = req.body.availableResolutions;
    video.minAgeRestriction = req.body.minAgeRestriction; // maximum: 18   minimum: 1  default: null   null - no restriction
    video.publicationDate = req.body.publicationDate; // ($date-time)

    res.status(HttpStatus.Created).send(video);
  }
);
videoRouter.delete(
  "/:id",
  (req: Request<{ id: string }>, res: Response<Video | null>) => {
    const indexVideo = db.videos.findIndex((v) => v.id === +req.params.id);

    if (indexVideo === -1) {
      res.sendStatus(HttpStatus.NotFound);

      return;
    }

    db.videos.splice(indexVideo, 1); // Удаляет d элемент с индексом indexVideo массива видео
    res.sendStatus(HttpStatus.NoContent);
  }
);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const in_memory_db_1 = require("../db/in-memory.db");
const videos_1 = require("../videos/types/videos");
const http_statuses_1 = require("../types/http-statuses");
const validation_1 = require("../videos/types/validation");
// export const videoRouter = Router({});
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter.get("", (req, res) => {
    res.status(200).send(in_memory_db_1.db.videos);
});
exports.videoRouter.get("/:id", (req, res) => {
    const video = in_memory_db_1.db.videos.find((d) => d.id === +req.params.id);
    if (!video) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
        return;
    }
    res.status(http_statuses_1.HttpStatus.Ok).send(video);
});
exports.videoRouter.post("/", (req, res) => {
    const errors = (0, validation_1.videoInputValidation)(req.body);
    if (errors.errorMessages.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send(errors);
        return;
    }
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let newId = 1;
    if (in_memory_db_1.db.videos.length > 0) {
        const lastVideo = in_memory_db_1.db.videos[in_memory_db_1.db.videos.length - 1];
        if (lastVideo) {
            // Теперь TypeScript знает, что lastVideo не undefined
            newId = lastVideo.id + 1;
        }
    }
    //   const lastId = db.videos.length > 0 ? db.videos[db.videos.length - 1].id : 0;
    //   const newId = lastId + 1;
    const newVideo = {
        // id: new Date().toString(),
        id: newId,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: 0, // maximum: 18   minimum: 1  default: null   null - no restriction
        createdAt: today, // ($date-time)
        publicationDate: tomorrow, // ($date-time) By default - +1 day from CreatedAt
        availableResolutions: [videos_1.Resolutions.P144, videos_1.Resolutions.P720],
    };
    in_memory_db_1.db.videos.push(newVideo);
    res.status(http_statuses_1.HttpStatus.Created).send(newVideo);
});
exports.videoRouter.put("/videos/:id", (req, res) => {
    let id = req.params.id;
    const indexVideo = in_memory_db_1.db.videos.findIndex((v) => v.id === +id);
    if (indexVideo === -1) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
        return;
    }
    const video = in_memory_db_1.db.videos[indexVideo];
    video.author = req.body.author;
    video.title = req.body.title;
    video.canBeDownloaded = req.body.canBeDownloaded;
    video.availableResolutions = req.body.availableResolutions;
    video.minAgeRestriction = req.body.minAgeRestriction; // maximum: 18   minimum: 1  default: null   null - no restriction
    video.publicationDate = req.body.publicationDate; // ($date-time)
    res.status(http_statuses_1.HttpStatus.Created).send(video);
});
exports.videoRouter.delete("/:id", (req, res) => {
    const indexVideo = in_memory_db_1.db.videos.findIndex((v) => v.id === +req.params.id);
    if (indexVideo === -1) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
        return;
    }
    in_memory_db_1.db.videos.splice(indexVideo, 1); // Удаляет d элемент с индексом indexVideo массива видео
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
//# sourceMappingURL=videoRouters.js.map
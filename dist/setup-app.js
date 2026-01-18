"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const http_statuses_1 = require("./types/http-statuses");
const videoRouters_1 = require("./routers/videoRouters");
// import { videoRouter } from "./routers/videoRouters";
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    app.use("/videos", videoRouters_1.videoRouter);
    // основной роут
    app.get("/", (req, res) => {
        res.status(http_statuses_1.HttpStatus.Ok).send("Hello incubator!!!!!");
    });
    return app;
};
exports.setupApp = setupApp;
//# sourceMappingURL=setup-app.js.map
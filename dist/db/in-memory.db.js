"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const videos_1 = require("../videos/types/videos");
exports.db = {
    videos: [
        {
            id: 1,
            title: "HarryPotter",
            author: "J.K.Rowling",
            canBeDownloaded: true,
            minAgeRestriction: 12,
            createdAt: new Date("2024-05-01"),
            publicationDate: new Date("2024-05-02"),
            availableResolutions: videos_1.Resolutions.P144,
        },
        {
            id: 2,
            title: "Introduction to TypeScript",
            author: "Microsoft",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date("2023-01-01"),
            publicationDate: new Date("2023-01-02"),
            availableResolutions: [videos_1.Resolutions.P720, videos_1.Resolutions.P1080],
        },
    ],
};
//# sourceMappingURL=in-memory.db.js.map
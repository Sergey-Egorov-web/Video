"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoInputValidation = void 0;
const videoInputValidation = (video) => {
    const errorsMessages = {
        errorMessages: [],
    };
    function isValidResolution(resolution) {
        const validResolutions = [
            "P144",
            "P240",
            "P360",
            "P480",
            "P720",
            "P1080",
            "P1440",
            "P2160",
        ];
        return validResolutions.includes(resolution);
    }
    if (!Array.isArray(video.availableResolutions) ||
        video.availableResolutions.length === 0 ||
        !video.availableResolutions.every(isValidResolution)) {
        errorsMessages.errorMessages.push({
            message: "availableResolutions field is incorrect",
            field: "availableResolutions",
        });
    }
    if (!video.author || video.author.length > 20) {
        errorsMessages.errorMessages.push({
            message: "Author field is incorrect",
            field: "author",
        });
    }
    if (!video.title || video.title.length > 40) {
        errorsMessages.errorMessages.push({
            message: "Title field is incorrect",
            field: "title",
        });
    }
    if (errorsMessages.errorMessages.length > 0) {
        return errorsMessages;
    }
    return errorsMessages;
};
exports.videoInputValidation = videoInputValidation;
//# sourceMappingURL=validation.js.map
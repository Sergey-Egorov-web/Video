export declare enum Resolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160"
}
export type Video = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: Date;
    publicationDate: Date;
    availableResolutions: Resolutions[];
};
export type CreateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: Resolutions[];
};
export type UpdateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: Resolutions[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: Date;
};
export type FieldError = {
    message: string;
    field: string;
};
export type APIErrorResult = {
    errorMessages: FieldError[];
};
//# sourceMappingURL=videos.d.ts.map
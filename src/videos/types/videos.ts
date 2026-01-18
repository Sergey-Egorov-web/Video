export enum Resolutions {
  P144 = "P144",
  P240 = "P240",
  P360 = "P360",
  P480 = "P480",
  P720 = "P720",
  P1080 = "P1080",
  P1440 = "P1440",
  P2160 = "P2160",
}

export type Video = {
  // id: number;
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null; // maximum: 18   minimum: 1  default: null   null - no restriction
  createdAt: Date; // ($date-time)
  publicationDate: Date; // ($date-time) By default - +1 day from CreatedAt
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

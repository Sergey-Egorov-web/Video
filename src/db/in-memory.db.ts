import { Video, Resolutions } from "../videos/types/videos";

export const db = {
  videos: <Video[]>[
    {
      id: 1,
      title: "HarryPotter",
      author: "J.K.Rowling",
      canBeDownloaded: true,
      minAgeRestriction: 12,
      createdAt: new Date("2024-05-01"),
      publicationDate: new Date("2024-05-02"),
      availableResolutions: Resolutions.P144,
    },
    {
      id: 2,
      title: "Introduction to TypeScript",
      author: "Microsoft",
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date("2023-01-01"),
      publicationDate: new Date("2023-01-02"),
      availableResolutions: [Resolutions.P720, Resolutions.P1080],
    },
  ],
};

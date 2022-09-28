type ImageMedia = {
  type: "photo" | "animated_gif";
  url?: string;
  previewUrl?: string;
};

type VideoMedia = {
  type: "video";
  url?: string[];
  previewUrl?: string;
};

type MiscMedia = {
  type: string;
  url?: string | string[];
  previewUrl?: string;
};

type NewsMedia = ImageMedia | VideoMedia | MiscMedia;

type News = {
  url: string;
  source: string;
  author: string;
  authorImg?: string;
  content: string;
  timestamp: Date;
  media: NewsMedia[];
};

export type { News, NewsMedia, ImageMedia, VideoMedia, MiscMedia };

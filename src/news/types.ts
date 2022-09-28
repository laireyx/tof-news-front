type NewsMedia = {
  type: "photo" | "animated_gif" | string;
  url?: string;
  previewUrl?: string;
};

type News = {
  url: string;
  source: string;
  author: string;
  authorImg?: string;
  content: string;
  timestamp: string;
  media: NewsMedia[];
};

export type { News, NewsMedia };

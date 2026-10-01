export type SanityImage = {
  url: string;
  width?: number;
  height?: number;
};

export type WorkGalleryItem = {
  image: SanityImage;
  caption?: string;
};

export type WorkMetric = {
  value: string;
  label: string;
};

export type WorkType = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  workTech: string;
  client: string;
  server: string;
  live: string;
  slug: string;
  year?: string;
  role?: string;
  industry?: string;
  context?: string;
  problem?: string;
  approach?: string;
  outcome?: string;
  responsibilities: string[];
  cover?: SanityImage;
  gallery: WorkGalleryItem[];
  metrics: WorkMetric[];
  highlight?: string;
  order?: number;
};
